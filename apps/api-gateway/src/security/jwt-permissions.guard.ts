import {Reflector} from "@nestjs/core";
import {
  Injectable,
  ExecutionContext,
  Logger,
  UnauthorizedException,
  createParamDecorator,
  CanActivate,
  SetMetadata,
} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {I18nService} from "nestjs-i18n";
import {difference, isEmpty, includes, reduce} from "lodash";

import {UserPermissions} from "domain/enums/user-permissions.enum";
import {ErrorCodes} from "domain/enums/error-codes.enum";
import {UserSessionDto} from "domain/dtos/user-session.dto";

export const RestrictRequest = (...scopes: UserPermissions[]) => SetMetadata("user_permissions", scopes);

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as UserSessionDto;
});

@Injectable()
export class JwtPermissionsGuard extends AuthGuard("jwt-strategy") implements CanActivate {
  protected readonly logger = new Logger("JwtPermissionsGuard");

  protected permissions: UserPermissions[];

  constructor(
    private readonly reflector: Reflector,
    private readonly i18n: I18nService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    this.permissions = this.reflector.get<UserPermissions[]>("user_permissions", context.getHandler()) || [];
    return super.canActivate(context);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  handleRequest(err: Error, user: UserSessionDto): UserSessionDto {
    if (err || !user) {
      this.logger.error("User is not authorized to perform request");
      throw new UnauthorizedException({message: this.i18n.t(ErrorCodes.UserNotAuthorizedRequest)});
    }

    if (isEmpty(this.permissions)) {
      return user;
    }

    // TODO refactor in case performance needs
    const permissions = reduce(user.roles,
      (array: UserPermissions[], next) => ([...array, ...next.permissions]),
      []);

    if (includes(permissions, UserPermissions.All)) {
      return user;
    }

    // TODO modify in case of starred permissions
    if (difference(this.permissions, permissions).length) {
      this.logger.error("User is not authorized to perform request");
      throw new UnauthorizedException({message: this.i18n.t(ErrorCodes.UserNotAuthorizedRequest)});
    }

    return user;
  }
}
