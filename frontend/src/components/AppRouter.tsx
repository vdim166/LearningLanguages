import { Navigate, Route, Routes } from "react-router-dom"
import { MainPage } from "./MainPage"
import { LoginPage } from "./LoginPage"
import { Layout } from "./Layout"
import { TrainWordsPage } from "./TrainWordsPage"
import { ProfilePage } from "./ProfilePage"

const AppRouter = (isAuth: boolean) => {
  return isAuth ? (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="words" element={<TrainWordsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRouter
