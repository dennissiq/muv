import { MailProvider } from "../../providers/MailProvider/MailProvider"
import { UsersRepository } from "../../repositories/User/UsersRepository"

import { CreateUserController } from "./CreateUser.controller"
import { CreateUser } from "./CreateUser"

const usersRepository = new UsersRepository()
const mailProvider = new MailProvider()

const createUser = new CreateUser(usersRepository, mailProvider)

const createUserController = new CreateUserController(createUser)

export { createUser, createUserController }
