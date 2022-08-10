import { Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import AppDataSource from "@shared/infra/typeorm/data-source";

import { User } from "./entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create({
    id,
    name,
    email,
    driver_license,
    password,
    avatar,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      id,
      name,
      email,
      driver_license,
      password,
      avatar,
    });
    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } });
    return user;
  }
  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ where: { id } });
    return user;
  }
}
export { UsersRepository };
