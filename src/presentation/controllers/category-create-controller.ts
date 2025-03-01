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
        const output = await this.service.execute(request.body as any)
        console.log(output)
        reply.status(200).send({ message: 'Success', data: output})
      } catch (error) {
        reply.status(500).send({ error: 'Internal Server Error' })
      }
    }
  }
} 