import { StockMovementType } from "@prisma/client"
import { NotFoundError } from "../../../errors/http"

interface Input {
  stockId: string
  quantity: number
  userId: string,
  reason: string
  locationStocked: string,
  type: StockMovementType
}
export class GeneratingHistoryStock {
  constructor(readonly repository: Repository.Movement<App.IStockMovement>, readonly repositoryStock: Repository.Stock) { }
  async execute(input: Input) {
    const stock = await this.repositoryStock.findById(input.stockId)
    if (!stock) new NotFoundError("Item")
    const history = await this.repository.create({
      locationStocked: input.locationStocked,
      quantity: input.quantity,
      reason: input.reason,
      stockId: stock!.id,
      type: input.type,
      userId: input.userId
    })
    return { history, stock }
  }
}