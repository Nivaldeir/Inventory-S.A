import { prisma } from "../../../utils/lib/prisma";

export class StockRepository implements Repository.Stock {
  async create(data: App.IStock): Promise<App.IStock> {
    const output = await prisma.stock.create({
      data: {
        description: data.description,
        minStock: data.minStock,
        name: data.name,
        price: data.price,
        sku: data.sku,
        status: data.status,
        unitOfMeasurement: data.unitOfMeasurement,
        categoryId: data.categoryId,
      }
    })
    return output
  }
  async findAll(): Promise<App.IStock[]> {
    const output = await prisma.stock.findMany()
    return output
  }
  async findById(id: number): Promise<App.IStock | null> {
    return await prisma.stock.findUnique({
      where: { id: id.toString() }
    })
  }
  async update(id: number, data: Partial<App.IStock>): Promise<App.IStock | null> {
    return await prisma.stock.update({
      where: { id: id.toString() },
      data: { ...data }
    })
  }
  async delete(id: number[]): Promise<void> {
    await prisma.stock.update({
      where: { id: id.toString() },
      data: {
        deletedAt: new Date()
      }
    })
  }
}