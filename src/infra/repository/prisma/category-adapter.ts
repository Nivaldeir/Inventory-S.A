import { NotFoundError, ValidationError } from "../../../errors"
import { prisma } from "../../../utils/lib/prisma"

export class CategoryRepository implements Repository.Category {
  async create(data: {
    name: string,
    description?: string
  }): Promise<App.ICategory> {
    if (!data.name) {
      throw new ValidationError('Name is required')
    }

    const output = await prisma.category.create({
      data: {
        name: data.name,
        description: data.description
      }
    })
    return output
  }

  async findAll(): Promise<App.ICategory[]> {
    return await prisma.category.findMany()
  }

  async findById(id: number): Promise<App.ICategory> {
    const category = await prisma.category.findUnique({
      where: { id }
    })

    if (!category) {
      throw new NotFoundError('Category')
    }

    return category
  }

  async update(id: number, data: Partial<App.ICategory>): Promise<App.ICategory> {
    await this.findById(id) 

    return await prisma.category.update({
      where: { id },
      data
    })
  }

  async delete(id: number | number[]): Promise<void> {
    const ids = Array.isArray(id) ? id : [id]

    await Promise.all(
      ids.map(async (categoryId) => {
        await this.findById(categoryId)
      })
    )

    await prisma.category.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    })
  }
}