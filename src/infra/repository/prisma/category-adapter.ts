import { prisma } from "../../../utils/lib/prisma"

export class CategoryRepository implements Repository.Category {
  async create(data: App.ICategory): Promise<App.ICategory> {
    const output = await prisma.category.create({
      data: {
        name: data.name,
        description: data.description
      }
    })
    return output
  }

  async findAll(query?: any): Promise<App.ICategory[]> {
    return await prisma.category.findMany({
      where: query
    })
  }

  async findById(id: string | number): Promise<App.ICategory | any> {
    try {
      const category = await prisma.category.findUnique({
        where: { id: parseInt(id.toString()) }
      })

      return category
    } catch (error) {
      throw new Error('')
    }
  }

  async update(id: string | number, data: Partial<App.ICategory>): Promise<App.ICategory> {
    await this.findById(id)

    return await prisma.category.update({
      where: { id: parseInt(id.toString()) },
      data: {
        name: data.name,
        description: data.description
      }
    })
  }

  async delete(id: string[] | number[]): Promise<void> {
    const ids = Array.isArray(id) ? id : [id]

    await Promise.all(
      ids.map(async (categoryId) => {
        await this.findById(categoryId)
      })
    )

    await prisma.category.deleteMany({
      where: {
        id: {
          in: ids.map(e => parseInt(e.toString()))
        }
      }
    })
  }
}