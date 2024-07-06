import { useMemo, useState } from "react"
import { ChooseLogin } from "./login/ChooseLogin"
import { LoginInputs } from "./login/LoginInputs"
import { RegisterInputs } from "./login/RegisterInputs"
import { observer } from "mobx-react-lite"

enum LoginEnums {
  MAIN_PAGE,
  LOGIN_PAGE,
  REGISTER_PAGE,
}
export const LoginPage = observer(() => {
  const [loginState, setLoginState] = useState<LoginEnums>(LoginEnums.MAIN_PAGE)

  const toLoginPage = () => {
    setLoginState(LoginEnums.LOGIN_PAGE)
  }
  const toRegisterPage = () => {
    setLoginState(LoginEnums.REGISTER_PAGE)
  }
  const toMainPage = () => {
    setLoginState(LoginEnums.MAIN_PAGE)
  }

  const renderInputs = useMemo(() => {
    switch (loginState) {
      case LoginEnums.MAIN_PAGE:
        return (
          <ChooseLogin
            toLoginPage={toLoginPage}
            toRegisterPage={toRegisterPage}
          />
        )

      case LoginEnums.LOGIN_PAGE:
        return <LoginInputs backFn={toMainPage} />

      case LoginEnums.REGISTER_PAGE:
        return <RegisterInputs backFn={toMainPage} />
      default:
        return <>Error...</>
    }
  }, [loginState])

  return (
    <div className="flex h-screen relative">
      <div className="absolute inset-x-[10vw] inset-y-[20vw] ">
        <img
          src="https://previews.123rf.com/images/rasslava/rasslava1306/rasslava130601159/20141542-many-colored-balls-abstract-background-with-place-for-your-text.jpg"
          alt="Login background"
          className="w-full h-full object-cover rounded scale-x-[-1]"
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-start justify-center space-y-4 pl-[70%]">
        {renderInputs}
      </div>
    </div>
  )
})
