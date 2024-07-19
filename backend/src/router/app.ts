import { Elysia, t } from "elysia"
import { bearer } from "@elysiajs/bearer"
import { authMiddleware } from "../middlewares/auth-middleware"
import appController from "../controllers/app-controller"

const lessonSchema = {
  body: t.Object({ languageOfApp: t.String() }),
  beforeHandle: authMiddleware,
}

export const appRouter = new Elysia()
  .use(bearer())
  .post(
    "/learn/:language/:currentLesson",
    appController.fetchLesson,
    lessonSchema
  )
