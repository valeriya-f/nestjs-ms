import {Module} from "@nestjs/common";
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {ClientsModule} from "@nestjs/microservices";
import {ConfigModule, ConfigService} from "@nestjs/config";

// =============== modules =================
import {SecurityModule} from "@app/security/security.module";

import {UserEntity} from "domain/models/user.entity";
import {RoleEntity} from "domain/models/role.entity";

import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {AppServices} from "domain/enums/app-services.enum";

@Module({
  imports: [
    SecurityModule,
    ClientsModule.registerAsync([
      {
        name: AppServices.SERVICE_USERS,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => config.get("service_users")
      }
    ]),
    MikroOrmModule.forFeature({
      entities: [
        UserEntity,
        RoleEntity
      ]
    })
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {
}
