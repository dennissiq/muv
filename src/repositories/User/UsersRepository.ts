import { PrismaClient } from "@prisma/client"
import { fieldEncryptionMiddleware } from "prisma-field-encryption"

import { User } from "../../entities/User"

import { IUsersRepository } from "./UsersRepository.interface"

export class UsersRepository implements IUsersRepository {
  prisma = new PrismaClient()

  async findMany(): Promise<User[]> {
    const users = await this.prisma.user.findMany()

    return users
  }

  async save(user: User): Promise<void> {
    this.prisma.$use(
      fieldEncryptionMiddleware({
        encryptionKey: process.env.PRISMA_FIELD_ENCRYPTION_KEY,
      })
    )

    const { name, username, password, email } = user

    await this.prisma.user.create({
      data: {
        name,
        username,
        password,
        email,
      },
    })
  }
}
