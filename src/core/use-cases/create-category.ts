/// <reference path="../../@types/index.d.ts" />
import { NotFoundError } from "../../errors"

type Input = {
  name: string
  description?: string
}

export class CreateCategory {
  constructor(private readonly repository: Repository.Category) { }
  async execute(input: Input): Promise<App.ICategory> {
    if (!input.name) new NotFoundError(`name`)
    console.log(input)
    const output = await this.repository.create(input)
    return output
  }
}