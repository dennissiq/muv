import { UsersRepository } from "../../repositories/User/UsersRepository"
import { CreateUserController } from "./CreateUser.controller"
import { CreateUser } from "./CreateUser"

const usersRepository = new UsersRepository()

const createUser = new CreateUser(usersRepository)

const createUserController = new CreateUserController(createUser)

export { createUser, createUserController }
