import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsNumber, IsString, IsUUID} from "class-validator";

// ============ entities =============
import {UserEntity} from "domain/models/user.entity";
import {UserRoleDto} from "domain/dtos/role.dto";

export class UserSessionDto {
  @ApiProperty({
    description: "User id",
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: "User email",
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: "User roles",
  })
  @IsArray({context: UserRoleDto})
  roles: UserRoleDto[];

  static from(dto?: UserSessionDto): UserSessionDto {
    if (!dto) {
      return;
    }

    return {
      id: dto.id,
      email: dto.email,
      roles: dto.roles
    };
  }

  static fromEntity(entity?: UserEntity): UserSessionDto {
    if (!entity) {
      return;
    }

    return {
      id: entity.id,
      email: entity.email,
      roles: UserRoleDto.fromEntities(entity.roles)
    };
  }
}