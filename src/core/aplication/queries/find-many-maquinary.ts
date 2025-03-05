export class FindManyMaquinary {
  constructor(readonly repository: Repository.Machinery) { }
  async execute() {
    return await this.repository.findAll({})
  }
}