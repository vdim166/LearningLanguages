import { observer } from "mobx-react-lite"
import { useState } from "react"
import authStore from "../../store/AuthStore"
type RegisterInputsProps = {
  backFn: () => void
}

export const RegisterInputs = observer(({ backFn }: RegisterInputsProps) => {
  const { registration } = authStore

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const registerHandle = () => {
    registration(email, password)
  }
  return (
    <>
      <div>
        <label
          htmlFor="email"
          className="block text-xl font-medium leading-6 black-white "
        >
          Email address
        </label>
        <div className="mt-2">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="block w-full rounded-md border-0 py-1.5 p-3
       text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
       focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-xl font-medium leading-6 black-white "
        >
          Password
        </label>
        <div className="mt-2">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            type="password"
            autoComplete="password"
            required
            className="block w-full rounded-md border-0 py-1.5 p-3
       text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
       focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <button
        className="px-4 py-2 bg-green-500 text-white font-roboto rounded"
        onClick={registerHandle}
      >
        Зарегистрироваться
      </button>
      <button
        onClick={backFn}
        className="px-4 py-2 bg-blue-500 text-white font-roboto rounded "
      >
        Назад
      </button>
    </>
  )
})
