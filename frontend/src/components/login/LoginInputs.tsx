import { observer } from "mobx-react-lite"
import authStore from "../../store/AuthStore"
import { useState } from "react"

type LoginInputsProps = {
  backFn: () => void
}

export const LoginInputs = observer(({ backFn }: LoginInputsProps) => {
  const { login } = authStore

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const loginHandle = () => {
    login(email, password)
  }

  return (
    <>
      <div>
        <label
          htmlFor="email"
          className="block text-xl font-medium leading-6 black-white"
        >
          Email address
        </label>
        <div className="mt-2">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-xl font-medium leading-6 black-white"
        >
          Password
        </label>
        <div className="mt-2">
          <input
            value={password}
            id="password"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <button
          className="px-4 py-2 bg-green-500 text-white font-roboto rounded"
          onClick={loginHandle}
        >
          Вход
        </button>
        <button
          onClick={backFn}
          className="ml-2 px-4 py-2 bg-blue-500 text-white font-roboto rounded"
        >
          Назад
        </button>
      </div>
    </>
  )
})
