import { CategoryRepository } from "../../../infra/repository/prisma/category-adapter"
import { StockRepository } from "../../../infra/repository/prisma/stock-adapter"
import { StockMovement } from "../../../infra/repository/prisma/stock-movement-adapter"

type Input = {
  sku: string
  name: string
  description: string
  price: number
  minStock: number
  unitOfMeasurement: string
  status: string
  categoryId: number
  type: 'PROHIBITED' | 'EXIT' | 'CREATED' | 'RETURN'
  quantity: number
  stockId: string
  locationStocked: string
  userId: string
  reason: string | null
}

export class CreateStock {
  constructor(
    readonly repository: StockRepository,
    readonly repositoryMovement: StockMovement,
    readonly categoryRepository: CategoryRepository
  ) { }

  async execute(input: Input) {
    if (!input.name || !input.userId || input.minStock <= 0) {
      throw new Error('Name, userId, and valid minStock are required');
    }

    try {
      const category = await this.categoryRepository.findById(input.categoryId);
      if (!category) {
        throw new Error('Category not found');
      }

      const stockCreated = await this.repository.create({
        categoryId: category.id!,
        description: input.description,
        minStock: input.minStock,
        name: input.name,
        quantity: input.quantity,
        price: input.price,
        sku: input.sku,
        status: input.status,
        unitOfMeasurement: input.unitOfMeasurement,
        id: '#',
        createdAt: new Date(),
        updatedAt: new Date()
      });

      const stockMovement = await this.repositoryMovement.create({
        type: input.type,
        quantity: input.quantity,
        stockId: stockCreated.id,
        locationStocked: input.locationStocked,
        userId: input.userId,
        reason: input.reason,
      });

      return { stockCreated, stockMovement };
    } catch (error: any) {
      throw new Error(`Error creating stock: ${error.message}`);
    }
  }
}
