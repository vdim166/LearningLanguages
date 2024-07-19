import { observer } from "mobx-react-lite"
import appStore from "../../store/AppStore"
import { Card } from "./Card"
import { Navbar } from "./Navbar"
import { useEffect, useState } from "react"
import $api from "../../http"
import { LessonResponse } from "../../models/lesson/LessonResponse"
import { Loading } from "../Loading"

export const LearnLanguagePage = observer(() => {
  const { language, currentLesson, languageOfApp } = appStore

  const [lessonName, setLessonName] = useState("")
  const [lessonDescription, setLessonDescription] = useState("")
  const [outOf, setOutOf] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setIsLoading(true)
        const { data } = await $api.post<LessonResponse>(
          `/learn/${language}/${currentLesson[language]}`,
          {
            languageOfApp,
          }
        )

        setLessonName(data.name)
        setLessonDescription(data.description)
        setOutOf(data.outOf)
      } catch (error) {
        console.log("error", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLesson()
  }, [language, languageOfApp, currentLesson, currentLesson[language]])

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar outOf={outOf} />
        <div className="flex-grow flex items-center justify-center ">
          <Card
            lessonName={lessonName}
            description={lessonDescription}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  )
})
