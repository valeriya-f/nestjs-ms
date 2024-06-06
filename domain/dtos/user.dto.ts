import { ApiProperty } from "@nestjs/swagger";

import { UUIDDto } from "domain/dtos/uuid.dto";

import { UserEntity } from "domain/models/user.entity";

export class UserDto extends UUIDDto {

  @ApiProperty({
    description: "User email"
  })
  email!: string;

  @ApiProperty({
    description: "User phone",
    required: false
  })
  phone?: string;

  static fromEntity(entity?: UserEntity) {
    if (!entity) { return; }
    const it = new UserDto();
    it.id = entity.id;
    it.created = entity.created.valueOf();
    it.updated = entity.updated.valueOf();
    it.email = entity.email;
    it.phone = entity.phone;

    return it;
  }

  static fromEntities(entities?: UserEntity[]) {
    if (!entities?.map) { return; }
    return entities.map(entity => this.fromEntity(entity));
  }
}