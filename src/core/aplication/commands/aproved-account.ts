import { UnauthorizedError } from "../../../errors/http"

export class ApprovedAccount {
  constructor(readonly repository: Repository.User) { }
  async execute(input: Input) {
    const [userAdmin, userDefault] = await Promise.all([
      this.repository.findById(input.userIdApproved),
      this.repository.findById(input.userId),
    ])
    if ((userAdmin?.id || userAdmin?.role == "ADMIN") && !userDefault?.id) new UnauthorizedError()
    await this.repository.update(userDefault!.id, {
      aproved: true
    })
  }
}

type Input = {
  userIdApproved: string
  userId: string
}