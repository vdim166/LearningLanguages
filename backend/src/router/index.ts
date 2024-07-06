import { Elysia, t } from "elysia"
import userController from "../controllers/user-controller"
import prisma from "../db"
import { bearer } from "@elysiajs/bearer"
import { authMiddleware } from "../middlewares/auth-middleware"

const userSchema = {
  body: t.Object({ email: t.String(), password: t.String() }),
}
const refreshSchema = {
  cookie: t.Cookie({
    refreshToken: t.String(),
  }),
}

export const router = new Elysia()

  .post("/registration", userController.registration, userSchema)
  .post("/login", userController.login, userSchema)
  .post("/logout", userController.logout, refreshSchema)
  .get("/activate/:link", userController.activate)
  .get("/refresh", userController.refresh, refreshSchema)

  .use(bearer())
  .get("/users", userController.getUsers, {
    beforeHandle: authMiddleware,
  })

  // TODO:dev only
  .get("/delete", async () => {
    await prisma.token.deleteMany()
    await prisma.user.deleteMany()
    return "deleted"
  })
  .get("/tokens", async () => {
    return await prisma.token.findMany()
  })
