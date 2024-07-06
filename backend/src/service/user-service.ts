import prisma from "../db"
import { v4 } from "uuid"
import mailService from "./mail-service"
import tokenService from "./token-service"
import UserDto from "../dtos/user-dto"

// TODO: const salt: number = process.env.SALT || 10

class UserService {
  async registration(email: string, password: string) {
    const candidate = await prisma.user.findFirst({
      where: {
        email,
        password,
      },
    })

    if (candidate) {
      throw new Error("User already exists")
    }

    const hashPassword = await Bun.password.hash(password)
    const activationLink = v4()

    const user = await prisma.user.create({
      data: { email, password: hashPassword, activationLink },
    })

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    )

    const userDto = new UserDto(user)

    const tokens = tokenService.generateTokens(userDto)

    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto,
    }
  }

  async activate(activationLink: string) {
    const user = await prisma.user.findFirst({
      where: {
        activationLink,
      },
    })

    if (!user) {
      throw new Error("User not found")
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { isActivated: true },
    })
  }

  async login(email: string, password: string) {
    const candidate = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (!candidate) {
      throw new Error("User not found")
    }

    const isPassEqual = await Bun.password.verify(password, candidate.password)

    const hashPassword = await Bun.password.hash(password)

    if (!isPassEqual) {
      throw new Error("Invalid password")
    }

    const userDto = new UserDto(candidate)
    const tokens = tokenService.generateTokens(userDto)
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto,
    }
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken)

    return token
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new Error("Refresh token not found")
    }

    const userData = tokenService.validateRefreshToken(refreshToken)

    const tokenFromDb = await tokenService.findToken(refreshToken)

    if (!userData || !tokenFromDb) {
      throw new Error("Invalid refresh token")
    }

    const user = await prisma.user.findFirst({ where: { id: userData.id } })

    if (!user) {
      throw new Error("User not found")
    }

    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens(userDto)
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto,
    }
  }
}

const userService = new UserService()
export default userService
