import { FastifyRequest, FastifyReply } from 'fastify'
import { AppError } from '../../errors/http'
import { CreateCategory } from '../../core/aplication/commands/create-category'

export class CategoryCreateController implements Http.Route {
  constructor(
    public readonly path: string,
    public readonly method: Http.Method,
    private readonly service: CreateCategory
  ) { }

  handler() {
    return async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
      try {
        const output = await this.service.execute(request.body as any)
        reply.status(200).send({ message: 'Success', data: output })
      } catch (error: unknown) {
        if (error instanceof AppError) return reply.status(error.statusCode).send(error)
      }
    }
  }
} 