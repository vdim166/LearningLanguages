import { Elysia } from "elysia"
import { cors } from "@elysiajs/cors"
import dotenv from "dotenv"
import { userRouter } from "./router/user"
import { appRouter } from "./router/app"

// TODO:error handling

dotenv.config()

const PORT = process.env.PORT || 5000

const app = new Elysia()
  .use(
    cors({
      credentials: true,
      allowedHeaders: ["Authorization", "Content-Type"],
      origin: (request) => true,
    })
  )
  .onError(({ code, error }) => {
    return new Response(error.message.toString())
  })
  .group("/api", (app) => app.use(userRouter))
  .group("/api", (app) => app.use(appRouter))

app.listen(PORT, () => {
  console.log(`🦊 Elysia is running at port ${PORT}`)
})
