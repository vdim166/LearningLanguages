import { makeAutoObservable } from "mobx"
import { LANGUAGES } from "../types/Languages"
import { PAGES_ENUM } from "../types/Pages"

class AppStore {
  language: LANGUAGES = LANGUAGES.ENGLISH
  page: PAGES_ENUM = PAGES_ENUM.LETS_LEARN
  languageOfApp: LANGUAGES = LANGUAGES.RUSSIAN

  currentLesson = {
    [LANGUAGES.ENGLISH]: 1,
    [LANGUAGES.RUSSIAN]: 1,
  }

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
  setCurrentLesson = (language: LANGUAGES, lesson: number) => {
    this.currentLesson[language] = lesson
  }
}

const appStore = new AppStore()

export default appStore
