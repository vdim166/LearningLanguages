import prisma from "../db"
import userService from "../service/user-service"
import {
  ActivateProps,
  LoginProps,
  LogoutProps,
  RefreshProps,
  RegistrationProps,
} from "./types"
import isemail from "isemail"

class UserController {
  async registration({ body, cookie }: RegistrationProps) {
    if (!isemail.validate(body.email)) throw new Error("Invalid email")
    if (body.password.length < 5)
      throw new Error("Password length should be minimum 5 characters")

    const userData = await userService.registration(body.email, body.password)

    cookie.refreshToken.value = userData.refreshToken
    cookie.refreshToken.maxAge = 60 * 60 * 24 * 7
    cookie.refreshToken.httpOnly = true

    return userData
  }

  async login({ body, cookie }: LoginProps) {
    const { email, password } = body

    const userData = await userService.login(email, password)

    cookie.refreshToken.value = userData.refreshToken
    cookie.refreshToken.maxAge = 60 * 60 * 24 * 7
    cookie.refreshToken.httpOnly = true

    return userData
  }

  async logout({ cookie }: LogoutProps) {
    await userService.logout(cookie.refreshToken.value)
    cookie.refreshToken.remove()

    return {
      status: "Logout success",
    }
  }

  async activate({ params, redirect }: ActivateProps) {
    await userService.activate(params.link)
    return redirect(process.env.CLIENT_URL!)
  }
  async refresh({ cookie }: RefreshProps) {
    const userData = await userService.refresh(cookie.refreshToken.value)
    cookie.refreshToken.value = userData.refreshToken
    cookie.refreshToken.maxAge = 60 * 60 * 24 * 7
    cookie.refreshToken.httpOnly = true

    return userData
  }

  async getUsers() {
    return await prisma.user.findMany()
  }
}

const userController = new UserController()
export default userController
