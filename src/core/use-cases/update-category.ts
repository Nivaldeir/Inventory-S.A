import { NotFoundError } from "../../errors"

type Input = { id: string, data: Partial<App.ICategory> }

export class UpdateCategory {
  constructor(private readonly repository: Repository.Category) { }
  async execute(input: Input): Promise<App.ICategory> {
    if (!input.id) new NotFoundError(`id`)
    const output = await this.repository.update(parseInt(input.id), input.data)
    return output
  }
}