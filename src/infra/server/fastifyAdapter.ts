
import _Fastify, { FastifyInstance } from 'fastify'

export class FastifyAdapter implements Http.Server {
  private _server: FastifyInstance = _Fastify({
    logger: true
  })
  constructor() { }
  start(port: number): void {
    this._server.listen({ port })
  }
  settings(settings: any): void {
    throw new Error('Method not implemented.')
  }

  public route(route: Http.Route): void {
    this._server[route.method.toLowerCase() as Lowercase<Http.Method>](
      route.path,
      route.handler
    )
  }
} 