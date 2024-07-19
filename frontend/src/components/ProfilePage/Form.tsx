import React, { useState } from "react"
import { LANGUAGES } from "../../types/Languages"
import { observer } from "mobx-react-lite"
import appStore from "../../store/AppStore"
import authStore from "../../store/AuthStore"
import translation, { TRANSLATION_KEY } from "../../assets/Translation"

export const Form = observer(() => {
  const { languageOfApp, setLanguageOfApp } = appStore

  const { user } = authStore

  const [settings, setSettings] = useState({
    email: "user@example.com",
    notifications: true,
  })

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Saved:", { settings })
    alert("Настройки сохранены")
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700">
          {translation.translate(TRANSLATION_KEY.LANGUAGE, languageOfApp)}
        </label>
        <select
          value={languageOfApp}
          name="language-select"
          className="text-black w-full mr-2 px-2 p-2 "
          onChange={(e) => {
            if (e.target.value === LANGUAGES.ENGLISH) {
              setLanguageOfApp(LANGUAGES.ENGLISH)
            } else if (e.target.value === LANGUAGES.RUSSIAN) {
              setLanguageOfApp(LANGUAGES.RUSSIAN)
            }
          }}
        >
          <option value="russian">Русский</option>
          <option value="english">English</option>
        </select>
      </div>
      <hr className="mb-3" />
      <div className="mb-4">
        <label className="block text-gray-700">Email:</label>
        <input
          type="email"
          name="email"
          value={settings.email}
          onChange={handleSettingsChange}
          className="w-full border rounded p-2"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        {translation.translate(TRANSLATION_KEY.SAVE, languageOfApp)}
      </button>
    </form>
  )
})
