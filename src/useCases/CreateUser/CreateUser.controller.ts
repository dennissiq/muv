import { FastifyReply, FastifyRequest } from "fastify"
import { createUserSchema } from "./CreateUser.schema"
import { CreateUser } from "./CreateUser"

export class CreateUserController {
  constructor(private createUser: CreateUser) {}

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { name, username, password, email } = createUserSchema.parse(request.body)

    await this.createUser.execute({
      name,
      username,
      password,
      email,
    })

    return reply.status(201).send()
  }
}
