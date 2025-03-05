import { FastifyRequest, FastifyReply } from 'fastify'
import { AppError } from '../../errors/http'
import { FindManyUser } from '../../core/aplication/queries/find-many-user'

export class UserFindManyController implements Http.Route {
  constructor(
    public readonly path: string,
    public readonly method: Http.Method,
    private readonly service: FindManyUser
  ) { }

  handler() {
    return async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
      try {
        const output = await this.service.execute({ userId: "dd13dabf-2bc8-4500-9924-a389a05eefcc" })
        reply.status(200).send({ message: 'Success', data: output })
      } catch (error: unknown) {
        if (error instanceof AppError) return reply.status(error.statusCode).send(error)
      }
    }
  }
} 