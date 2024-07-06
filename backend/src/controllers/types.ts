import { Cookie } from "elysia"

export type RegistrationProps = {
  body: {
    email: string
    password: string
  }
  cookie: Record<string, Cookie<any>>
}

export type ActivateProps = {
  params: Record<"link", string>
  redirect: (url: string, status?: 301 | 302 | 303 | 307 | 308) => Response
}

export type LoginProps = {
  body: {
    email: string
    password: string
  }
  cookie: Record<string, Cookie<any>>
}

export type LogoutProps = {
  cookie: Record<string, Cookie<any>>
}

export type RefreshProps = {
  cookie: Record<string, Cookie<any>>
}
