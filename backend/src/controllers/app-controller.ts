export enum LANGUAGES {
  ENGLISH = "english",
  RUSSIAN = "russian",
}

export type LessonProps = {
  params: Record<"language", LANGUAGES> & Record<"currentLesson", number>
  body: {
    languageOfApp: LANGUAGES
  }
}

const testLessonNamesDataBase = {
  [LANGUAGES.ENGLISH]: [
    {
      [LANGUAGES.RUSSIAN]: {
        name: "Знакомство с английским: приветствия и базовые фразы",
        description: `Цели урока:
        Познакомить учеников с основными английскими приветствиями.
        Научить их представляться и задавать вопросы о собеседнике.
        Изучить базовые фразы для повседневного общения.`,
      },
      [LANGUAGES.ENGLISH]: {
        name: "",
        description: "",
      },
    },
    {
      [LANGUAGES.RUSSIAN]: {
        name: "",
        description: ``,
      },
      [LANGUAGES.ENGLISH]: {
        name: "",
        description: "",
      },
    },
  ],
  [LANGUAGES.RUSSIAN]: [
    {
      [LANGUAGES.RUSSIAN]: {
        name: "",
        description: "",
      },
      [LANGUAGES.ENGLISH]: {
        name: "",
        description: "",
      },
    },
  ],
}

class AppContoller {
  fetchLesson = ({ params, body }: LessonProps) => {
    const lesson =
      testLessonNamesDataBase[params.language][params.currentLesson - 1][
        body.languageOfApp
      ]

    return { ...lesson, outOf: testLessonNamesDataBase[params.language].length }
  }
}

const appController = new AppContoller()
export default appController
