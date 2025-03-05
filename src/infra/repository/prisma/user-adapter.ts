import { prisma } from "../../../utils/lib/prisma";

export class UserRepository implements Repository.User {
  async create(data: Omit<App.User, "id" | "updatedAt" | "timestamp" | "createdAt">): Promise<App.User> {
    return await prisma.user.create({
      data,
    });
  }

  async findAll(query: any | null): Promise<App.User[]> {
    return await prisma.user.findMany({
      where: query || {},
    });
  }

  async findById(id: number | string): Promise<App.User | null> {
    return await prisma.user.findUnique({
      where: { id: id.toString() },
    });
  }

  async update(id: string | number, data: Partial<App.User>): Promise<App.User | null> {
    return await prisma.user.update({
      where: { id: id.toString() },
      data,
    });
  }

  async delete(id: string[] | number[]): Promise<void> {
    await prisma.user.deleteMany({
      where: { id: { in: id.map(String) } },
    });
  }
}
