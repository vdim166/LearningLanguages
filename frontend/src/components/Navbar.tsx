import { observer } from "mobx-react-lite"
import "./Navbar.css"
import authStore from "../store/AuthStore"
import { NavLink } from "react-router-dom"

export const Navbar = observer(() => {
  const { logout } = authStore

  const logoutHandle = () => {
    logout()
  }

  return (
    <nav className="w-full flex justify-between items-center bg-white text-black border border-b-black">
      <div className="flex">
        <img
          src="https://d35aaqx5ub95lt.cloudfront.net/vendor/70a4be81077a8037698067f583816ff9.svg"
          alt="Logo"
          className="ml-2"
          width={"100px"}
        />
        <NavLink to="/" className={`py-4 px-1 ml-1 hover:bg-gray-100 `}>
          Начать учиться
        </NavLink>
        <NavLink to="/words" className={`py-4 px-1 ml-1 hover:bg-gray-100`}>
          Тренировать слова
        </NavLink>
      </div>

      <div className="flex  ">
        <select name="word-select" className="text-black  mr-2 px-2">
          <option value="word1">Слово 1</option>
          <option value="word2">Слово 2</option>
        </select>
        <NavLink to="/profile" className="py-4 px-1 mr-2 hover:bg-gray-100">
          Профиль
        </NavLink>
        <button
          onClick={logoutHandle}
          className="py-4 px-1 mr-1 hover:bg-gray-100"
        >
          Выход
        </button>
      </div>
    </nav>
  )
})
