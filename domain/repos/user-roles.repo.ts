import { Injectable } from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/postgresql";

import { UserEntity } from "domain/models/user.entity";

import { UserStatuses } from "domain/enums/user-statuses.enum";
import { RoleEntity } from "domain/models/role.entity";
import { UserRoleEntity } from "domain/models/user-role.entity";

@Injectable()
export class UserRolesRepo extends EntityRepository<UserRoleEntity> {

  async getList() {
    return await this.findAll();
  }
}