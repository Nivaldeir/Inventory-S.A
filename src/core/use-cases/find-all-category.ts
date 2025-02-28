
export class FindAllCategory {
  constructor(private readonly repository: Repository.Category) { }
  async execute(input: any): Promise<App.ICategory[]> {
    const output = await this.repository.findAll()
    return output
  }
}