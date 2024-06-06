import {Module} from "@nestjs/common";

// ========== modules ============
import {SecurityModule} from "@app/security/security.module";

import {UsersService} from "./users.service";
import {UsersController} from "./users.controller";

@Module({
  imports: [SecurityModule],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {
}
