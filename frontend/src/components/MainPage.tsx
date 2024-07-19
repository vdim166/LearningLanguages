import { observer } from "mobx-react-lite"
import appStore from "../store/AppStore"

// max-w-4xl

const Card = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl mx-auto relative">
      <h2 className="text-2xl font-bold mb-4">Название карточки</h2>
      <p className="text-gray-700 mb-8">
        Содержимое карточки. Содержимое карточки Содержимое карточки Содержимое
        карточки Содержимое карточки Содержимое карточки Содержимое карточки
        Содержимое карточки Содержимое карточки Содержимое карточки Содержимое
        карточки Содержимое карточки Содержимое карточки Содержимое карточки
        Содержимое карточки Содержимое карточки Содержимое карточки
      </p>
      <button className="absolute bottom-8 right-8 bg-blue-500 text-white px-4 py-2 rounded">
        НАЧАТЬ
      </button>
    </div>
  )
}
export const MainPage = observer(() => {
  const handlePrev = () => {
    console.log("Предыдущая страница")
  }

  const handleNext = () => {
    console.log("Следующая страница")
  }
  const { language } = appStore

  return (
    <>
      {/* <div>Main {language}</div> */}

      <div className="flex flex-col min-h-screen">
        <div className="bg-gray-800 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <button
              onClick={handlePrev}
              className="text-white bg-blue-500 px-4 py-2 rounded"
            >
              Предыдущая страница
            </button>
            <h1 className="text-white text-xl">{"Название урока"}</h1>
            <button
              onClick={handleNext}
              className="text-white bg-blue-500 px-4 py-2 rounded"
            >
              Следующая страница
            </button>
          </div>
        </div>
        <div className="flex-grow flex items-center justify-center ">
          <Card />
        </div>
      </div>
    </>
  )
})
