import { makeAutoObservable } from "mobx"
import { IUser } from "../models/IUser"
import AuthService from "../services/AuthService"
import axios, { AxiosError } from "axios"
import { AuthResponse } from "../models/response/AuthResponse"
import { API_URL } from "../http"

class AuthStore {
  isAuth = false
  token = false
  user = {} as IUser
  isLoading = true

  constructor() {
    makeAutoObservable(this)
  }

  setAuth = (status: boolean) => {
    this.isAuth = status
  }

  setUser = (user: IUser) => {
    this.user = user
  }
  setIsLoading = (isLoading: boolean) => {
    this.isLoading = isLoading
  }

  login = async (email: string, password: string) => {
    try {
      const response = await AuthService.login(email, password)
      localStorage.setItem("token", response.data.accessToken)

      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (error) {
      console.log((error as AxiosError).response?.data)
    }
  }

  registration = async (email: string, password: string) => {
    try {
      const response = await AuthService.registration(email, password)
      localStorage.setItem("token", response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (error) {
      console.log((error as AxiosError).response?.data)
    }
  }

  logout = async () => {
    try {
      await AuthService.logout()
      localStorage.removeItem("token")
      this.setAuth(false)
      this.setUser({} as IUser)
    } catch (error) {
      console.log((error as AxiosError).response?.data)
    }
  }
  checkAuth = async () => {
    this.setIsLoading(true)

    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      })

      console.log("chechAuth", response)

      localStorage.setItem("token", response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (error) {
      console.log((error as AxiosError).response?.data)
    } finally {
      this.setIsLoading(false)
    }
  }
}

const authStore = new AuthStore()

export default authStore
