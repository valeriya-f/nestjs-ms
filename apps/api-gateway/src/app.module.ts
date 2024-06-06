import { Module } from "@nestjs/common";
import { ConfigService, ConfigModule } from "@nestjs/config";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import {I18nModule} from "nestjs-i18n";

// ========== modules =========
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";

// ========== app =============
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

// ========== config ==========
import database from "config/database.config";
import api_gateway from "config/api-gateway.config";
import service_users from "config/service-users.config";

import {RolesModule} from "@app/roles/roles.module";
import {DatabaseModule} from "@app/database/database.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      load: [
        database,
        api_gateway,
        service_users
      ],
      isGlobal: true
    }),
    {
      ...I18nModule.forRoot({
        fallbackLanguage: "en",
        loaderOptions: {
          path: "resources/i18n/",
        },
      }),
      global: true,
    },
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get("database"),
      inject: [ConfigService]
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}