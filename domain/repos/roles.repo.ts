import { Injectable } from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/postgresql";

import { UserRoles } from "domain/enums/user-roles.enum";
import { RoleEntity } from "domain/models/role.entity";

@Injectable()
export class RolesRepo extends EntityRepository<RoleEntity> {

  async getAll() {
    return await this.findAll();
  }

  async getById(id: number) {
    return await this.findOne({ id });
  }

  public async getDefaultRole(type: UserRoles) {
    return this.findOne({ type, isDefault: true }, { orderBy: { created: "desc" } });
  }

  public async addOne(dto: Partial<RoleEntity>) {
    const role_e: RoleEntity = this.create(dto);
    await this.persistAndFlush(role_e);
    return role_e;
  }
}