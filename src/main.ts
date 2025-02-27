import { FastifyAdapter } from "./infra/server/fastifyAdapter";

const server = new FastifyAdapter()
server.start(8080)