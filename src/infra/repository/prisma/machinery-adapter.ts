import { prisma } from "../../../utils/lib/prisma";

export class MachineryRepository implements Repository.Machinery {
  async create(data: Omit<App.IMachinery, "id" | "updatedAt" | "timestamp" | "createdAt">): Promise<App.IMachinery> {
    try {
      const machinery = await prisma.machinery.create({
        data: {
          name: data.name,
          sku: data.sku,
          description: data.description,
        },
      });
      return machinery;
    } catch (error: any) {
      throw new Error(`Error creating machinery: ${error.message}`);
    }
  }

  async findAll(query: any | null): Promise<App.IMachinery[]> {
    try {
      const machineries = await prisma.machinery.findMany({
        where: query,
      });
      return machineries;
    } catch (error: any) {
      throw new Error(`Error fetching machineries: ${error.message}`);
    }
  }

  async findById(id: number): Promise<App.IMachinery | null> {
    try {
      const machinery = await prisma.machinery.findUnique({
        where: {
          id: id.toString(), // Assuming ID is of type string in the database model
        },
      });
      return machinery;
    } catch (error: any) {
      throw new Error(`Error fetching machinery by ID: ${error.message}`);
    }
  }

  async update(id: number, data: Partial<App.IMachinery>): Promise<App.IMachinery | null> {
    try {
      const updatedMachinery = await prisma.machinery.update({
        where: {
          id: id.toString(), // Assuming ID is of type string in the database model
        },
        data: {
          name: data.name,
          sku: data.sku,
          description: data.description,
        },
      });
      return updatedMachinery;
    } catch (error: any) {
      throw new Error(`Error updating machinery: ${error.message}`);
    }
  }

  async delete(id: number[]): Promise<void> {
    try {
      await prisma.machinery.deleteMany({
        where: {
          id: {
            in: id.map((id) => id.toString()), // Assuming ID is of type string in the database model
          },
        },
      });
    } catch (error: any) {
      throw new Error(`Error deleting machineries: ${error.message}`);
    }
  }
}
