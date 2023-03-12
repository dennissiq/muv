import { User } from "../../entities/User"
import { IUsersRepository } from "../../repositories/User/UsersRepository.interface"
import { ICreateUserDTO } from "./CreateUser.dto"

export class CreateUser {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: ICreateUserDTO) {
    const user = new User(data)

    await this.usersRepository.save(user)
  }
}
