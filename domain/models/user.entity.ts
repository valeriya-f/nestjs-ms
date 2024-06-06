import { Entity, Property, Enum, ManyToMany, EntityRepositoryType, Unique, Index } from "@mikro-orm/core";

import { UUIDEntity } from "domain/models/uuid.entity";

import { UserStatuses } from "domain/enums/user-statuses.enum";

import { UsersRepo } from "domain/repos/users.repo";

import { RoleEntity } from "./role.entity";
import { UserRoleEntity } from "./user-role.entity";

@Entity({ tableName: "users", customRepository: () => UsersRepo })
@Unique({ name: "ix_user_email", properties: ["email"] })
@Index({ name: "ix_user_email_acc", properties: ["email", "password"] })
@Unique({ name: "ix_user_phone", properties: ["phone"] })
@Index({ name: "ix_user_phone_acc", properties: ["phone", "password"] })
export class UserEntity extends UUIDEntity {
  [EntityRepositoryType]?: UsersRepo;

  @Property({ name: "email" })
  email!: string;

  @Property({ name: "phone", nullable: true })
  phone?: string;

  @Property({ name: "password" })
  password!: string;

  @Enum({ name: "status", array: false, items: () => UserStatuses })
  status!: UserStatuses;

  @ManyToMany({
    entity: () => RoleEntity,
    inversedBy: e => e.users,
    pivotEntity: () => UserRoleEntity,
    owner: true
  })
  roles?: RoleEntity[];
}