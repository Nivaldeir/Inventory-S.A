import { CreateCategory } from "./core/use-cases/create-category";
import { CategoryRepository } from "./infra/repository/prisma/category-adapter";
import { FastifyAdapter } from "./infra/server/fastifyAdapter";
import { CategoryCreateController } from "./presentation/controllers/category-create-controller";

const server = new FastifyAdapter()
const repositoryCategory = new CategoryRepository()
const createCategory = new CreateCategory(repositoryCategory)
const controllerCreateCategory = new CategoryCreateController("/api/category", "POST", createCategory)
server.route(controllerCreateCategory)
server.start(8080)