import { UnauthorizedError } from "../../../errors/http"

type Input = {
  userId: string
}
export class FindManyUser {
  constructor(readonly repository: Repository.User) { }
  async execute(input: Input) {
    const user = await this.repository.findById(input.userId)
    if (!user || user.role != 'ADMIN') throw new UnauthorizedError("Not permission")
    return await this.repository.findAll({})
  }
}