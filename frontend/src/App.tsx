import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import authStore from "./store/AuthStore"
import AppRouter from "./components/AppRouter"

// TODO: login errors

export const App = () => {
  const { isAuth, checkAuth, isLoading } = authStore

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuth()
    }
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="App">{AppRouter(isAuth)}</div>
    </>
  )
}

export default observer(App)
