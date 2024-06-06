import {Module} from "@nestjs/common";
import {MikroOrmModule} from "@mikro-orm/nestjs";

import {SecurityModule} from "@app/security/security.module";

import {RoleEntity} from "domain/models/role.entity";
import {UserRoleEntity} from "domain/models/user-role.entity";
import {UserEntity} from "domain/models/user.entity";

import {RolesService} from "./roles.service";
import {RolesController} from "./roles.controller";

@Module({
  imports: [
    SecurityModule,
    MikroOrmModule.forFeature({
      entities: [
        RoleEntity,
        UserRoleEntity,
        UserEntity
      ]
    })
  ],
  providers: [RolesService],
  controllers: [RolesController]
})
export class RolesModule {
}
