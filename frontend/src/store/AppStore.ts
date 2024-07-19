import { makeAutoObservable } from "mobx"
import { LANGUAGES } from "../types/Languages"
import { PAGES_ENUM } from "../types/Pages"

class AppStore {
  language: LANGUAGES = LANGUAGES.RUSSIAN
  page: PAGES_ENUM = PAGES_ENUM.LETS_LEARN
  languageOfApp: LANGUAGES = LANGUAGES.ENGLISH

  constructor() {
    makeAutoObservable(this)
  }

  setLanguage = (language: LANGUAGES) => {
    this.language = language
  }

  setPage = (page: PAGES_ENUM) => {
    this.page = page
  }

  setLanguageOfApp = (language: LANGUAGES) => {
    this.languageOfApp = language
  }
}

const appStore = new AppStore()

export default appStore
