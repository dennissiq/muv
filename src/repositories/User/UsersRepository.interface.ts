import { User } from "../../entities/User"

export interface IUsersRepository {
  findMany(): Promise<User[]>
  save(user: User): Promise<void>
}
