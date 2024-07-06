import jwt from "jsonwebtoken"
import prisma from "../db"
import UserDto from "../dtos/user-dto"

interface TokenInterface {
  email: string
  id: number
  isActivated: boolean
}

class TokenService {
  generateTokens(payload: UserDto) {
    const { email, id, isActivated } = payload

    const accessToken = jwt.sign(
      { email, id, isActivated },
      process.env.JWT_ACCESS_SECRET!,
      {
        expiresIn: "30m",
      }
    )

    const refreshToken = jwt.sign(
      { email, id, isActivated },
      process.env.JWT_REFRESH_SECRET!,
      {
        expiresIn: "30d",
      }
    )

    return { accessToken, refreshToken }
  }

  async saveToken(userId: number, refreshToken: string) {
    const existingToken = await prisma.token.findUnique({
      where: { userId },
    })

    if (existingToken) {
      return await prisma.token.update({
        where: { userId },
        data: { refreshToken },
      })
    }
    return await prisma.token.create({
      data: {
        user: { connect: { id: userId } },
        refreshToken,
      },
    })
  }

  async removeToken(refreshToken: string) {
    const tokenData = await prisma.token.delete({
      where: { refreshToken },
    })
    return tokenData
  }

  validateAccessToken(accessToken: string) {
    const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!)
    return userData as TokenInterface
  }

  validateRefreshToken(refreshToken: string) {
    const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!)
    return userData as TokenInterface
  }

  async findToken(refreshToken: string) {
    const tokenData = await prisma.token.findFirst({ where: { refreshToken } })

    return tokenData
  }
}

const tokenService = new TokenService()
export default tokenService
