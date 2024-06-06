import {Injectable} from "@nestjs/common";
import {EntityRepository} from "@mikro-orm/postgresql";

import {UserEntity} from "domain/models/user.entity";

import {UserStatuses} from "domain/enums/user-statuses.enum";
import {RoleEntity} from "domain/models/role.entity";

@Injectable()
export class UsersRepo extends EntityRepository<UserEntity> {

  async getList() {
    return await this.findAll();
  }

  async getByIdLazy(id: string) {
    return await this.findOne({id});
  }

  async getById(id: string) {
    return await this.findOne({id}, {populate: ["roles"]});
  }

  async getByEmailLazy(email: string) {
    return await this.findOne({email});
  }

  async getByEmailAndPasswordLazy(email: string, password: string) {
    return await this.findOne({email, password});
  }

  async addOne(dto: Partial<UserEntity>, dto_role: Partial<RoleEntity>) {
    const newUser = this.create({
      status: UserStatuses.Active,

      email: dto.email,
      password: dto.password,

      roles: [dto_role]
    });
    await this.persistAndFlush(newUser);
    return newUser;
  }
}