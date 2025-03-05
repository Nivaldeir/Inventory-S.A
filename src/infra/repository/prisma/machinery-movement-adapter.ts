import { prisma } from "../../../utils/lib/prisma";

export class MachineryRepository implements Repository.Movement<App.IMachineryMovement> {
  async create(data: Omit<App.IMachineryMovement, "id" | "updatedAt" | "timestamp" | "createdAt">): Promise<App.IMachineryMovement> {
    try {
      const machineryMovement = await prisma.machineryMovement.create({
        data: {
          status: data.status,
          machineryId: data.machineryId,
          userId: data.userId,
          destination: data.destination,
          reason: data.reason,
          total_units: data.total_units,
          available: data.available,
          unavailable: data.unavailable,
        },
      });
      return machineryMovement;
    } catch (error: any) {
      throw new Error(`Error creating machinery movement: ${error.message}`);
    }
  }

  async findAll(query: any | null): Promise<App.IMachineryMovement[]> {
    try {
      const machineryMovements = await prisma.machineryMovement.findMany({
        where: query,
      });
      return machineryMovements;
    } catch (error: any) {
      throw new Error(`Error fetching machinery movements: ${error.message}`);
    }
  }

  async findById(id: number): Promise<App.IMachineryMovement | null> {
    try {
      const machineryMovement = await prisma.machineryMovement.findUnique({
        where: {
          id: id.toString(),
        },
      });
      return machineryMovement;
    } catch (error: any) {
      throw new Error(`Error fetching machinery movement by ID: ${error.message}`);
    }
  }

  async update(id: number, data: Partial<App.IMachineryMovement>): Promise<App.IMachineryMovement | null> {
    try {
      const updatedMachineryMovement = await prisma.machineryMovement.update({
        where: {
          id: id.toString(),
        },
        data: {
          status: data.status,
          machineryId: data.machineryId,
          userId: data.userId,
          destination: data.destination,
          reason: data.reason,
          total_units: data.total_units,
          available: data.available,
          unavailable: data.unavailable,
        },
      });
      return updatedMachineryMovement;
    } catch (error: any) {
      throw new Error(`Error updating machinery movement: ${error.message}`);
    }
  }

  async delete(id: number[]): Promise<void> {
    try {
      await prisma.machineryMovement.deleteMany({
        where: {
          id: {
            in: id.map((id) => id.toString()),
          },
        },
      });
    } catch (error: any) {
      throw new Error(`Error deleting machinery movements: ${error.message}`);
    }
  }
}
