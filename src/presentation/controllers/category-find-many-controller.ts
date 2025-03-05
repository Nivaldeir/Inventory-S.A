import { FastifyRequest, FastifyReply } from 'fastify'
import { AppError } from '../../errors/http'
import { FindManyCategorie } from '../../core/aplication/queries/find-many-categorie'

export class CategoryFindManyController implements Http.Route {
  constructor(
    public readonly path: string,
    public readonly method: Http.Method,
    private readonly service: FindManyCategorie
  ) { }

  handler() {
    return async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
      try {
        const output = await this.service.execute()
        reply.status(200).send({ message: 'Success', data: output })
      } catch (error: unknown) {
        if (error instanceof AppError) return reply.status(error.statusCode).send(error)
      }
    }
  }
} 