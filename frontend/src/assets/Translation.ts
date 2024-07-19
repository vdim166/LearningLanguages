import { LANGUAGES } from "../types/Languages"

export enum TRANSLATION_KEY {
  CONFIRM_NAME_SAVE = "confirmNameSave",
  LANGUAGE = "language",
  SAVE = "save",
  START_LEARNING = "startLearning",
  TRAIN_WORDS = "trainWords",
  PROFILE = "profile",
  EXIT = "exit",
  LESSON = "lesson",
  START_LESSON = "startLesson",
}

const list = {
  [TRANSLATION_KEY.CONFIRM_NAME_SAVE]: {
    english: "Confirm",
    russian: "Принять",
  },
  [TRANSLATION_KEY.LANGUAGE]: {
    english: "Language of the app",
    russian: "Язык приложения",
  },
  [TRANSLATION_KEY.SAVE]: {
    english: "Save",
    russian: "Сохранить",
  },
  [TRANSLATION_KEY.START_LEARNING]: {
    english: "Start learning",
    russian: "Начать изучение",
  },
  [TRANSLATION_KEY.TRAIN_WORDS]: {
    english: "Train words",
    russian: "Тренировать слова",
  },
  [TRANSLATION_KEY.PROFILE]: {
    english: "Profile",
    russian: "Профиль",
  },
  [TRANSLATION_KEY.EXIT]: {
    english: "Exit",
    russian: "Выход",
  },
  [TRANSLATION_KEY.LESSON]: {
    english: "Lesson",
    russian: "Урок",
  },
  [TRANSLATION_KEY.START_LESSON]: {
    english: "Start lesson",
    russian: "Начать урок",
  },
}

class Translation {
  translate(key: TRANSLATION_KEY, language: LANGUAGES) {
    return list[key][language]
  }
}

const translation = new Translation()
export default translation
