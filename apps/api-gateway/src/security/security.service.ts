import {Injectable} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import {UsersRepo} from "domain/repos/users.repo";
import {UserEntity} from "domain/models/user.entity";
import {UserSessionDto} from "domain/dtos/user-session.dto";
import {JwtTokenDto} from "./dtos/jwt-token.dto";

@Injectable()
export class SecurityService {
  constructor(
    private readonly repo_users: UsersRepo,
    private readonly jwtService: JwtService,
  ) { }

  public async getUserById(userId: string) {
    return await this.repo_users.getById(userId);
  }

  async generateToken(entity: UserEntity) {
    const payload = UserSessionDto.fromEntity(entity);
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
    } as JwtTokenDto;
  }
}
