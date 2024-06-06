import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsEnum, IsString, ValidateNested } from "class-validator";

import { UserRoles } from "domain/enums/user-roles.enum";
import { UserPermissions } from "domain/enums/user-permissions.enum";

import { IDDto } from "domain/dtos/id.dto";
import { UserDto } from "domain/dtos/user.dto";
import { RoleEntity } from "domain/models/role.entity";
import { ArrayErrorMessage, BooleanErrorMessage, EnumErrorMessage, NestedErrorMessage, StringErrorMessage } from "domain/etc/messages";

export class UserRoleDto extends IDDto {
  @ApiProperty({
    description: "User role type",
    isArray: false,
    enum: UserRoles
  })
  @IsEnum(UserRoles, { message: EnumErrorMessage })
  type: UserRoles;

  @ApiProperty({
    description: "User role name"
  })
  @IsString({ message: StringErrorMessage })
  name: string;

  @ApiProperty({
    description: "User role permissions",
    isArray: true,
    enum: UserPermissions
  })
  @IsArray({ context: UserPermissions, message: ArrayErrorMessage })
  permissions: UserPermissions[];

  @ApiProperty({
    description: "Is role default"
  })
  @IsBoolean({ message: BooleanErrorMessage })
  isDefault: boolean;

  @ApiProperty({
    description: "List of users",
    required: false,
    isArray: true,
    type: () => UserDto
  })
  @ValidateNested({ context: UserDto, message: NestedErrorMessage })
  users?: UserDto[];

  public static fromEntity(entity?: RoleEntity) {
    if (!entity) { return; }
    const it = new UserRoleDto();
    it.id = entity.id;
    it.created = new Date(entity.created).valueOf();
    it.updated = new Date(entity.updated).valueOf();
    it.type = entity.type;
    it.name = entity.name;
    it.permissions = entity.permissions;
    it.isDefault = entity.isDefault;

    it.users = UserDto.fromEntities(entity.users);
    return it;
  }

  static fromEntities(entities?: RoleEntity[]) {
    if (!entities?.map) { return; }
    return entities.map(entity => this.fromEntity(entity));
  }
}
