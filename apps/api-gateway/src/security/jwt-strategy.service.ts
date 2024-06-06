import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {I18nService} from "nestjs-i18n";
import {ExtractJwt, Strategy} from "passport-jwt";
import * as passport from "passport";

import {UserStatuses} from "domain/enums/user-statuses.enum";
import {UserSessionDto} from "domain/dtos/user-session.dto";
import {ErrorCodes} from "domain/enums/error-codes.enum";

import {SecurityService} from "./security.service";


@Injectable()
export class JwtStrategyService extends Strategy {
  readonly name = "jwt-strategy";

  constructor(
    private readonly configService: ConfigService,
    private readonly securityService: SecurityService,
    private readonly i18n: I18nService,
  ) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: configService.get("api_gateway.jwt_secret"),
      },
      async (req, payload, next) => await this.verify(req, payload, next),
    );
    passport.use(this);
  }

  public async verify(req, payload: UserSessionDto, done) {
    const user = await this.securityService.getUserById(payload.id);

    if (!user) {
      return done(this.i18n.t(ErrorCodes.NotFoundUser), false);
    }

    if (user.status !== UserStatuses.Active) {
      return done(this.i18n.t(ErrorCodes.InvalidStatusUserNotActive), false);
    }

    done(null, payload);
  }
}
