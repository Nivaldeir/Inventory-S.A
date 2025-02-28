declare global {
  namespace App {
    export interface ICategory {
      id: number
      name: string
      description: string | null
      createdAt: Date
      updatedAt: Date
    }

    export interface IStock {
      id: string
      sku: string
      name: string
      description: string
      price: number
      minStock: number
      unitOfMeasurement: string
      status: string
      categoryId: number
      createdAt: Date
      updatedAt: Date
    }

    export interface IStockMovement {
      id: string
      type: 'PROHIBITED' | 'EXIT' | 'CREATED' | 'RETURN'
      quantity: number
      stockId: string
      locationStocked: string
      userId: string
      reason?: string
      timestamp: Date
      createdAt: Date
      updatedAt: Date
    }

    export interface IMachinery {
      id: string
      name: string
      sku: string
      description?: string
      createdAt: Date
      updatedAt: Date
    }

    export interface IMachineryMovement {
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
    export interface Category {
      create(data: {
        name: string
        description?: string
      }): Promise<App.ICategory>

      findAll(): Promise<App.ICategory[]>
      findById(id: number): Promise<App.ICategory>
      update(id: number, data: Partial<App.ICategory>): Promise<App.ICategory>
      delete(id: number[]): Promise<void>
    }
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