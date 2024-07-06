type ModelType = {
  id: number
  email: string
  password: string
  isActivated: boolean
  activationLink: string | null
}

export default class UserDto {
  public email: string
  public id: number
  public isActivated: boolean

  constructor(model: ModelType) {
    this.email = model.email
    this.id = model.id
    this.isActivated = model.isActivated
  }
}
