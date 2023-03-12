export class User {
  //   public readonly id!: string
  //   public readonly createdAt!: Date
  public name!: string
  public username!: string
  public email!: string
  public password!: string

  constructor(props: User) {
    Object.assign(this, props)
  }
}
