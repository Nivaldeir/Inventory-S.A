import { CreateCategory } from "./core/aplication/commands/create-category";
import { CreateUser } from "./core/aplication/commands/create-user";
import { Authentication } from "./core/aplication/queries/authentication";
import { FindManyCategorie } from "./core/aplication/queries/find-many-categorie";
import { FindManyUser } from "./core/aplication/queries/find-many-user";
import { CategoryRepository } from "./infra/repository/prisma/category-adapter";
import { UserRepository } from "./infra/repository/prisma/user-adapter";
import { FastifyAdapter } from "./infra/server/fastifyAdapter";
import { CategoryCreateController } from "./presentation/controllers/category-create-controller";
import { CategoryFindManyController } from "./presentation/controllers/category-find-many-controller";
import { UserAuthenticationController } from "./presentation/controllers/user-authentication-controller";
import { UserCreateController } from "./presentation/controllers/user-create-controller";
import { UserFindManyController } from "./presentation/controllers/user-find-many-controller";

const server = new FastifyAdapter()
const repositoryCategory = new CategoryRepository()
const repositoryUser = new UserRepository()

const createCategory = new CreateCategory(repositoryCategory)
const findManyCategory = new FindManyCategorie(repositoryCategory)

const userAuthentication = new Authentication(repositoryUser)
const createUser = new CreateUser(repositoryUser)
const findManyUser = new FindManyUser(repositoryUser)


const controllerCreateCategory = new CategoryCreateController("/api/category", "POST", createCategory)
const controllerFindManyCategory = new CategoryFindManyController("/api/category", "GET", findManyCategory)

const controllerAuthentication = new UserAuthenticationController("/api/user/auth", "POST", userAuthentication)
const controllerCreateUser = new UserCreateController("/api/user", "POST", createUser)
const controllerFindManyUser = new UserFindManyController("/api/user", "GET", findManyUser)

server.route(controllerCreateCategory)
server.route(controllerFindManyCategory)
server.route(controllerAuthentication)
server.route(controllerCreateUser)
server.route(controllerFindManyUser)

server.start(8080)