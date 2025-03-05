import { UserArgs } from "@prisma/client/runtime/library"

declare global {
  namespace App {
    interface ICategory {
      id: number | string | null
      name: string
      description: string | null
      createdAt: Date | null
      updatedAt: Date | null
    }

    interface User {
      id: string
      name: string
      email: string
      password: string
      aproved: boolean
      role: string
      createdAt: Date
      updatedAt: Date
    }

    interface IStock {
      id: string
      sku: string
      name: string
      description: string
      price: number
      minStock: number
      unitOfMeasurement: string
      status: string
      quantity: number
      categoryId: number
      createdAt: Date
      updatedAt: Date
      deletedAt?: Date | null
    }

    interface IStockMovement {
      id: string
      type: 'PROHIBITED' | 'EXIT' | 'CREATED' | 'RETURN'
      quantity: number
      stockId: string
      locationStocked: string
      userId: string
      reason: string | null
      timestamp: Date
      createdAt: Date
      updatedAt: Date
    }

    interface IMachinery {
      id: string
      name: string
      sku: string
      description: string | null
      createdAt: Date
      updatedAt: Date
    }

    interface IMachineryMovement {
      id: string
      status: boolean
      machineryId: string
      userId: string
      destination: string
      reason: string
      total_units: number
      available: number
      unavailable: number
      timestamp: Date
      createdAt: Date
      updatedAt: Date
    }
  }

  namespace Repository {
    interface CRUD<T> {
      create(data: Omit<T, "id" | "updatedAt" | "timestamp" | "createdAt" | "deletedAt">): Promise<T>
      findAll(query: any | null): Promise<T[]>
      findById(id: number | string): Promise<T | null>
      update(id: string | number, data: Partial<T>): Promise<T | null>
      delete(id: string[] | number[]): Promise<void>
    }
    interface Category extends CRUD<App.ICategory> { }
    interface Stock extends CRUD<App.IStock> { }
    interface Machinery extends CRUD<App.IMachinery> { }
    interface Movement<T> extends CRUD<T> { }
    interface User extends CRUD<App.User> { }
  }

  namespace Http {
    type Method = "GET" | "POST" | "PUT" | "DELETE"

    interface Controller {
      handle(request: FastifyRequest, reply: FastifyReply): Promise<void>
    }
    interface Route {
      path: string
      method: Method
      handler(): (request: FastifyRequest, reply: FastifyReply) => Promise<void>
    }
    interface HttpResponse {
      statusCode: number
      body: any
    }
    interface Server {
      start(port: number): void
      settings(settings: any): void
      route(route: Http.Route): void
    }
  }
}

export { }