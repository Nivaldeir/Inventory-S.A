import { NotFoundError } from "../../../errors/http"

interface Input {
  status: boolean
  machineryId: string
  userId: string
  destination: string
  reason: string
  total_units: number
  available: number
  unavailable: number
}
export class GeneratingHistoryMachinery {
  constructor(readonly repository: Repository.Movement<App.IMachineryMovement>, readonly repositoryMaquinary: Repository.Machinery) { }
  async execute(input: Input) {
    const machinery = await this.repositoryMaquinary.findById(input.machineryId)
    if (!machinery) new NotFoundError("Machinery")
    const history = await this.repository.create({
      available: input.available,
      destination: input.destination,
      machineryId: machinery!.id,
      reason: input.reason,
      status: input.status,
      total_units: input.total_units,
      unavailable: input.unavailable,
      userId: input.userId
    })
    return { history, machinery }
  }
}