import { User } from "../../entities/User"
import { IMailProvider } from "../../providers/MailProvider/MailProvider.interface"
import { IUsersRepository } from "../../repositories/User/UsersRepository.interface"
import { ICreateUserDTO } from "./CreateUser.dto"

export class CreateUser {
  constructor(private usersRepository: IUsersRepository, private mailProvider: IMailProvider) {}

  async execute(data: ICreateUserDTO) {
    const user = new User(data)

    await this.usersRepository.save(user)

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: "ACME Company",
        email: "hello@acme.com",
      },
      subject: `Seja bem vindo, ${data.name}`,
      body: `<p>Sua conta foi criada com sucesso.</p>`,
    })
  }
}
