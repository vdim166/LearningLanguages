import { observer } from "mobx-react-lite"
import translation, { TRANSLATION_KEY } from "../../assets/Translation"
import { Loading } from "../Loading"
import appStore from "../../store/AppStore"

type CardProps = {
  lessonName: string
  description: string
  isLoading: boolean
}

export const Card = observer(
  ({ lessonName, description, isLoading }: CardProps) => {
    const { languageOfApp } = appStore

    if (isLoading) {
      return <Loading />
    }

    return (
      <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl mx-auto relative">
        <h2 className="text-2xl font-bold mb-4">{lessonName}</h2>
        <p className="text-gray-700 mb-8">{description}</p>
        <button className="absolute bottom-8 right-8 bg-blue-500 text-white px-4 py-2 rounded">
          {translation.translate(TRANSLATION_KEY.START_LESSON, languageOfApp)}
        </button>
      </div>
    )
  }
)
