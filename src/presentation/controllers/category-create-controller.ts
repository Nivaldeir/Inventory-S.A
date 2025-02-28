import { FastifyRequest, FastifyReply } from 'fastify'
import { CreateCategory } from '../../core/use-cases/create-category'

export class CategoryCreateController implements Http.Route {
  constructor(
    public readonly path: string,
    public readonly method: Http.Method,
    private readonly service: CreateCategory
  ) { }

  handler() {
    return async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
      try {
        await this.service.execute(request.body as any)
        reply.status(200).send({ message: 'Success' })
      } catch (error) {
        reply.status(500).send({ error: 'Internal Server Error' })
      }
    }
  }
} 