import { observer } from "mobx-react-lite"
import "./Navbar.css"
import authStore from "../store/AuthStore"
import { NavLink } from "react-router-dom"
import appStore from "../store/AppStore"
import { LANGUAGES } from "../types/Languages"
import translation, { TRANSLATION_KEY } from "../assets/Translation"

export const Navbar = observer(() => {
  const { logout } = authStore

  const { setLanguage, language, languageOfApp } = appStore

  const logoutHandle = () => {
    logout()
  }

  // TODO: save current language page
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
          {translation.translate(TRANSLATION_KEY.START_LEARNING, languageOfApp)}
        </NavLink>
        <NavLink to="/words" className={`py-4 px-1 ml-1 hover:bg-gray-100`}>
          {translation.translate(TRANSLATION_KEY.TRAIN_WORDS, languageOfApp)}
        </NavLink>
      </div>

      <div className="flex">
        <select
          name="word-select"
          className="text-black  mr-2 px-2"
          value={language}
          onChange={(e) => {
            if (e.target.value === LANGUAGES.RUSSIAN) {
              setLanguage(LANGUAGES.RUSSIAN)
            } else if (e.target.value === LANGUAGES.ENGLISH) {
              setLanguage(LANGUAGES.ENGLISH)
            } else {
              throw new Error("Invalid language")
            }
          }}
        >
          <option value="russian">Русский 🇷🇺</option>
          <option value="english">English 🇺🇸</option>
        </select>
        <NavLink to="/profile" className="py-4 mr-2 hover:bg-gray-100 px-3">
          {translation.translate(TRANSLATION_KEY.PROFILE, languageOfApp)}
        </NavLink>
        <button
          onClick={logoutHandle}
          className="py-4 px-3 mr-1 hover:bg-gray-100"
        >
          {translation.translate(TRANSLATION_KEY.EXIT, languageOfApp)}
        </button>
      </div>
    </nav>
  )
})
