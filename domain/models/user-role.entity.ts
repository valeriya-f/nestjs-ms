import { Entity, EntityRepositoryType, PrimaryKey, ManyToOne } from "@mikro-orm/core";

import { UserRolesRepo } from "domain/repos/user-roles.repo";
import { UserEntity } from "./user.entity";
import { RoleEntity } from "./role.entity";

@Entity({ tableName: "user_roles", customRepository: () => UserRolesRepo })
export class UserRoleEntity {
  [EntityRepositoryType]?: UserRolesRepo;

  @PrimaryKey({ name: "user_id", type: "uuid" })
  userId!: string;

  @PrimaryKey({ name: "role_id", type: "bigint" })
  roleId!: number;

  @ManyToOne({ entity: () => UserEntity, joinColumn: "user_id" })
  user: UserEntity;

  @ManyToOne({ entity: () => RoleEntity, joinColumn: "role_id" })
  role: RoleEntity;
}
