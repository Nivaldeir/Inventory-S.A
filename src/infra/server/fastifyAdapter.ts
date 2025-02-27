import { Server } from './server';
import _Fastify from 'fastify'
export class Fastify implements Server {
  private _server = _Fastify({
    logger: true
  })
  constructor() { }
  start(port: number): void {
    this._server.listen({ port })
  }

  settings(settings: any): void {
  }
} 