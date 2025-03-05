import { ForbiddenError } from "../../../errors/http"
import { PasswordEncryptor } from "../../domain/shared/password-encryptor"

type Input = {
  email: string
  password: string
  name: string
}
export class CreateUser {
  constructor(readonly repository: Repository.User) { }
  async execute(input: Input) {
    const existUser = await this.repository.findAll({
      email: input.email
    })
    if (existUser) new ForbiddenError("Usuario já existente")
    const passwordHash = await PasswordEncryptor.hash(input.password)
    await this.repository.create({
      aproved: false,
      email: input.email,
      name: input.name,
      password: passwordHash,
      role: "USER"
    })
    return {
      email: input.email,
      name: input.name
    }
  }
}