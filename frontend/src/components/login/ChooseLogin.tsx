import React from "react"

type ChooseLoginType = {
  toRegisterPage: () => void
  toLoginPage: () => void
}

export const ChooseLogin = ({
  toRegisterPage,
  toLoginPage,
}: ChooseLoginType) => {
  return (
    <>
      <button
        onClick={toLoginPage}
        className="px-4 py-2 bg-green-500 text-white font-roboto rounded"
      >
        Вход
      </button>
      <button
        onClick={toRegisterPage}
        className="px-4 py-2 bg-blue-500 text-white font-roboto rounded"
      >
        Зарегистрироваться
      </button>
    </>
  )
}
