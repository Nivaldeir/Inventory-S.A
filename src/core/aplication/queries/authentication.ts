import { NotFoundError, ValidationError } from "../../../errors/http"
import { PasswordEncryptor } from "../../domain/shared/password-encryptor"

type Input = {
  email: string,
  password: string
}
export class Authentication {
  constructor(readonly repository: Repository.User) { }
  async execute(input: Input) {
    if (!input.email || !input.password) throw new ValidationError("email and password is required!")
    const user = await this.repository.findAll({
      email: input.email
    })
    if (user.length == 0) throw new NotFoundError("User")
    const isValidPassword = PasswordEncryptor.compare(input.password, user[0].password)
    if (!isValidPassword) throw new ValidationError("email or password is invalid!")
    return {
      id: user[0].id,
      name: user[0].name,
      email: user[0].email,
      aproved: user[0].aproved,
      role: user[0].role,
      createdAt: user[0].createdAt,
      updatedAt: user[0].updatedAt,
    }
  }
}