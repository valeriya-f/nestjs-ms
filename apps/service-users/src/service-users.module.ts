import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";

import {ServiceUsersController} from "./service-users.controller";
import {ServiceUsersService} from "./service-users.service";

// ========== config ==========
import service_users from "config/service-users.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      load: [
        service_users
      ],
      isGlobal: true,
    }),
  ],
  controllers: [ServiceUsersController],
  providers: [ServiceUsersService],
})
export class ServiceUsersModule {
}
