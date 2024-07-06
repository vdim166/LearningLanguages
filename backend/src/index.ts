import { Elysia } from "elysia"
import { cors } from "@elysiajs/cors"
import dotenv from "dotenv"
import { router } from "./router"

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
  .group("/api", (app) => app.use(router))

app.listen(PORT, () => {
  console.log(`🦊 Elysia is running at port ${PORT}`)
})
