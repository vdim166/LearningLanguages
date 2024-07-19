import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import authStore from "./store/AuthStore"
import AppRouter from "./components/AppRouter"
import { Loading } from "./components/Loading"

// TODO: login errors

export const App = () => {
  const { isAuth, checkAuth, isLoading } = authStore

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuth()
    }
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <div className="App">{AppRouter(isAuth)}</div>
    </>
  )
}

export default observer(App)
