import { NotFoundError } from "../../errors"

type Input = { id: string }

export class FindAllCategory {
  constructor(private readonly repository: Repository.Category) { }
  async execute(input: Input): Promise<App.ICategory> {
    if (!input.id) new NotFoundError(`id`)
    const output = await this.repository.findById(parseInt(input.id))
    return output
  }
}