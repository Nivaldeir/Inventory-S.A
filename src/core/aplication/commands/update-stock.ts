import { NotFoundError, ValidationError } from "../../../errors/http";
import { CategoryRepository } from "../../../infra/repository/prisma/category-adapter";
import { StockRepository } from "../../../infra/repository/prisma/stock-adapter";
import { StockMovement } from "../../../infra/repository/prisma/stock-movement-adapter";

type Input = {
  id: string
  name?: string
  description?: string
  price?: number
  minStock?: number
  unitOfMeasurement?: string
  status?: string
  categoryId?: number
  type: 'PROHIBITED' | 'EXIT' | 'CREATED' | 'RETURN'
  quantity?: number
  stockId?: string
  locationStocked?: string
  userId?: string
  reason: string | null
}

export class UpdateStock {
  constructor(
    readonly repository: StockRepository,
    readonly repositoryMovement: StockMovement,
    readonly categoryRepository: CategoryRepository
  ) { }

  async execute(input: Input) {
    if (!input.id || !input.userId) throw new ValidationError('Name, userId are required');

    try {
      const stockFinded = await this.repository.findById(parseInt(input!.id))
      if (!stockFinded) throw new NotFoundError("Item")
      let quantity = stockFinded.quantity
      if (input.type == "PROHIBITED" && input.quantity) quantity += input.quantity
      if (input.type == "EXIT" && input.quantity) quantity -= input.quantity
      const stockUpdated = await this.repository.update(parseInt(input.id), {
        ...stockFinded,
        ...input,
        quantity: quantity
      });
      const stockMovement = await this.repositoryMovement.create({
        type: input.type,
        quantity: input.quantity ?? 0,
        stockId: stockUpdated!.id,
        locationStocked: input.locationStocked ?? "",
        userId: input.userId,
        reason: input.reason,
      });

      return { stockUpdated, stockMovement };
    } catch (error: any) {
      throw new Error(`Error creating stock: ${error.message}`);
    }
  }
}
