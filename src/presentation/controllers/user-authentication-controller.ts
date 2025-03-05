import { FastifyReply, FastifyRequest } from "fastify";
import { Authentication } from "../../core/aplication/queries/authentication";
import { AppError } from "../../errors/http";

export class UserAuthenticationController implements Http.Route {
  constructor(
    public readonly path: string,
    public readonly method: Http.Method,
    private readonly service: Authentication
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