import React, { useState } from "react"
import { Pencil } from "../../assets/Pencil"
import translation, { TRANSLATION_KEY } from "../../assets/Translation"
import { observer } from "mobx-react-lite"
import appStore from "../../store/AppStore"
type NameProps = {
  name: string
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Name = observer(({ name, handleNameChange }: NameProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isButtonHovering, setIsButtonHovering] = useState(false)

  const { languageOfApp } = appStore

  const buttonClickHandle = () => {
    setIsEditing(true)
  }

  return (
    <>
      {isEditing ? (
        <>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="text-xl font-bold text-center mb-2 w-full border rounded p-2"
          />
          <button
            onClick={() => {
              setIsEditing(false)
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {translation.translate(
              TRANSLATION_KEY.CONFIRM_NAME_SAVE,
              languageOfApp
            )}
          </button>
        </>
      ) : (
        <div>
          <span>{name}</span>
          <button
            className="hover:cursor-pointer "
            onMouseEnter={() => setIsButtonHovering(true)}
            onMouseLeave={() => setIsButtonHovering(false)}
            onClick={buttonClickHandle}
          >
            <div className="ml-2">
              <Pencil isButtonHovering={isButtonHovering} />
            </div>
          </button>
        </div>
      )}
    </>
  )
})
