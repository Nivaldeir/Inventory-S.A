export class FindManyCategorie {
  constructor(readonly repository: Repository.Category) { }
  async execute() {
    return await this.repository.findAll({})
  }
}