import { NotFoundError } from "../../../errors/http";

export class DeleteStock {
  constructor(readonly repository: Repository.Stock) { }
  async execute(id: string) {
    if (!id) throw new NotFoundError("id")
    await this.repository.delete([id])
  }
}