export class FindManyStock {
  constructor(readonly repository: Repository.Stock) { }
  async execute() {
    return await this.repository.findAll({})
  }
}