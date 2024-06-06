import {Module} from "@nestjs/common";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {MikroOrmModule} from "@mikro-orm/nestjs";

import {UserEntity} from "domain/models/user.entity";
import {UserRoleEntity} from "domain/models/user-role.entity";
import {RoleEntity} from "domain/models/role.entity";

import {SecurityService} from "./security.service";
import {JwtStrategyService} from "./jwt-strategy.service";

@Module({
  imports: [
    PassportModule.register({defaultStrategy: "jwt-strategy"}),
    JwtModule,
    MikroOrmModule.forFeature({
      entities: [
        UserEntity,
        UserRoleEntity,
        RoleEntity
      ]
    })
  ],
  providers: [
    JwtStrategyService,
    SecurityService
  ]
})
export class SecurityModule {
}
