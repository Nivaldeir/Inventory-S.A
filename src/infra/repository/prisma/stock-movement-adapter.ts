import { prisma } from "../../../utils/lib/prisma";

export class StockMovement implements Repository.Movement<App.IStockMovement> {
  async create(data: Omit<App.IStockMovement, "id" | "updatedAt" | "timestamp" | "createdAt">): Promise<App.IStockMovement> {
    const output = await prisma.stockMovement.create({
      data: {
        locationStocked: data.locationStocked,
        quantity: data.quantity,
        type: data.type,
        userId: data.userId,
        reason: data.reason,
        stockId: data.stockId
      }
    })
    return output
  }

  async findAll(query?: any): Promise<App.IStockMovement[]> {
    return await prisma.stockMovement.findMany()
  }
  async findById(id: number): Promise<App.IStockMovement | null> {
    return await prisma.stockMovement.findUnique({
      where: { id: id.toString() }
    })
  }
  update(id: number, data: Partial<App.IStockMovement>): Promise<App.IStockMovement | null> {
    throw new Error("Method not implemented.");
  }
  async delete(id: any[]): Promise<void> {
    await prisma.stockMovement.deleteMany({
      where: {
        id: {
          in: id
        }
      }
    })
  }
}