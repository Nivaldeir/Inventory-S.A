/// <reference path="../../../@types/index.d.ts" />
import { ValidationError } from "../../../errors/http"

type Input = {
  name: string
  description: string | null
}

export class CreateCategory {
  constructor(private readonly repository: Repository.Category) { }
  async execute(input: Input): Promise<App.ICategory> {
    if (!input.name) new ValidationError(`name`)
    const output = await this.repository.create(input)
    return output
  }
}