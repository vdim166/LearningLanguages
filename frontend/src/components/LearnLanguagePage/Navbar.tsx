import { observer } from "mobx-react-lite"
import translation, { TRANSLATION_KEY } from "../../assets/Translation"
import appStore from "../../store/AppStore"
import { useEffect, useState } from "react"
import { LANGUAGES } from "../../types/Languages"

type NavbarProps = {
  // currentLesson: number
  outOf: number
  // language: LANGUAGES
}

type RadioButtonProps = {
  onClick: () => void
  isDisabled: boolean
  sign: string
}

const RadioButton = ({ onClick, isDisabled, sign }: RadioButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`text-white ${
        isDisabled ? "bg-gray-800 " : "bg-blue-500"
      } px-5 py-3 rounded`}
      disabled={isDisabled}
    >
      {!isDisabled && sign}
    </button>
  )
}

export const Navbar = observer(({ outOf }: NavbarProps) => {
  const { setCurrentLesson, currentLesson, language } = appStore
  const [prevButtonIsDisabled, setPrevButtonIsDisabled] = useState(
    currentLesson[language] === 1
  )
  const [nextButtonIsDisabled, setNextButtonIsDisabled] = useState(
    currentLesson[language] === outOf
  )

  useEffect(() => {
    setPrevButtonIsDisabled(currentLesson[language] === 1)
    setNextButtonIsDisabled(currentLesson[language] === outOf)
  }, [currentLesson[language]])

  const { languageOfApp } = appStore
  const handlePrev = () => {
    setCurrentLesson(language, currentLesson[language] - 1)
  }

  const handleNext = () => {
    setCurrentLesson(language, currentLesson[language] + 1)
  }
  return (
    <div className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <RadioButton
          isDisabled={prevButtonIsDisabled}
          onClick={handlePrev}
          sign="<"
        />
        <h1 className="text-white text-xl">
          {translation.translate(TRANSLATION_KEY.LESSON, languageOfApp)}
          {` ${currentLesson[language]}/${outOf}`}
        </h1>

        <RadioButton
          isDisabled={nextButtonIsDisabled}
          onClick={handleNext}
          sign=">"
        />
      </div>
    </div>
  )
})
