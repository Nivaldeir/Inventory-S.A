import { NotFoundError } from "../../errors"

type Input = {
  id: string | string[]
}
export class DeleteCategory {
  constructor(private readonly repository: Repository.Category) { }
  async execute(input: Input): Promise<void> {
    if (input.id.length == 0) throw new NotFoundError(`id`)

    const ids = Array.isArray(input.id) ? input.id.map(id => parseInt(id)) : [parseInt(input.id)]

    await this.repository.delete(ids)
  }
}