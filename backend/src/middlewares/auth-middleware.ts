import tokenService from "../service/token-service"

export const authMiddleware = ({ bearer }: { bearer: string | undefined }) => {
  if (!bearer) {
    throw new Error("Not Authenticated")
  }
  tokenService.validateAccessToken(bearer)
}
