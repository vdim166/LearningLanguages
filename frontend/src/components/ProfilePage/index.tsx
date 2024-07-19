import { Name } from "./Name"
import { UserImage } from "./UserImage"
import { Form } from "./Form"
import { observer } from "mobx-react-lite"
import authStore from "../../store/AuthStore"

export const ProfilePage = observer(() => {
  const { user, setUser } = authStore

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <UserImage />
          <Name
            name={user.email}
            handleNameChange={(e) => console.log("setting user")}
          />
        </div>
        <Form />
      </div>
    </div>
  )
})
