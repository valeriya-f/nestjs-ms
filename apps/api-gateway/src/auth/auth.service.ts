import {Injectable, Inject} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {firstValueFrom} from "rxjs";

import {AppServices} from "domain/enums/app-services.enum";
import {UserRoles} from "domain/enums/user-roles.enum";
import {AppEvents} from "domain/enums/app-events.enum";

import {UsersRepo} from "domain/repos/users.repo";
import {RolesRepo} from "domain/repos/roles.repo";

import {SignUpClientForm} from "./dtos/sign-up-client.form";
import {SignUpGuestForm} from "./dtos/sign-up-guest.form";

@Injectable()
export class AuthService {
  constructor(
    @Inject(AppServices.SERVICE_USERS) private readonly service_users: ClientProxy,
    private readonly repo_user_roles: RolesRepo,
    private readonly repo_users: UsersRepo
  ) {
  }

  async onApplicationBootstrap() {
    await this.service_users.connect();
  }

  async signUpGuest(form: SignUpGuestForm) {
    const e_role = await this.repo_user_roles.getDefaultRole(UserRoles.Guest);
    const e_user = await this.repo_users.addOne(form, e_role);
    await firstValueFrom(this.service_users.send(AppEvents.Users_UserCreated, e_user));
    return {};
  }

  async signUpClient(form: SignUpClientForm) {
    const e_role = await this.repo_user_roles.getDefaultRole(UserRoles.Client);
    const e_user = await this.repo_users.addOne(form, e_role);
    await firstValueFrom(this.service_users.send(AppEvents.Users_UserCreated, e_user));
    return {};
  }
}
