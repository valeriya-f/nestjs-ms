import {Controller, Logger} from "@nestjs/common";
import {EventPattern} from "@nestjs/microservices";

import {AppEvents} from "domain/enums/app-events.enum";
import {UserDto} from "domain/dtos/user.dto";

import {ServiceUsersService} from "./service-users.service";

@Controller()
export class ServiceUsersController {
  private readonly logger = new Logger("ServiceUsersController");

  constructor(
    private readonly serviceUsersService: ServiceUsersService
  ) {
  }

  @EventPattern(AppEvents.Users_UserCreated)
  async userCreated(data: Record<string, UserDto>) {
    this.logger.log("user created");
    return {asd: 1};
  }
}
