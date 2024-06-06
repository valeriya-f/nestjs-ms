import { Entity, Property, Enum, ManyToMany, Index, EntityRepositoryType, Unique, EnumType, PrimaryKey } from "@mikro-orm/core";

import { UserEntity } from "domain/models/user.entity";
import { IDEntity } from "domain/models/id.entity";

import { UserRoles } from "domain/enums/user-roles.enum";
import { UserPermissions } from "domain/enums/user-permissions.enum";
import { RolesRepo } from "domain/repos/roles.repo";

@Entity({ tableName: "roles", customRepository: () => RolesRepo })
@Index({ name: "ix_roles_default_role", properties: ["type", "isDefault"] })
@Index({ name: "ix_roles_type", properties: ["type"] })
@Unique({ name: "ix_roles_name", properties: ["name"] })
export class RoleEntity extends IDEntity {
  [EntityRepositoryType]?: RolesRepo;

  @Enum({ type: EnumType, name: "type", array: false, items: () => UserRoles })
  type!: UserRoles;

  @Property({ name: "name" })
  name!: string;

  @Enum({ type: EnumType, name: "permissions", array: true, items: () => UserPermissions })
  permissions!: UserPermissions[];

  @Property({ name: "is_default", type: "boolean" })
  isDefault!: boolean;

  @ManyToMany(() => UserEntity, e => e.roles)
  users?: UserEntity[];
}
