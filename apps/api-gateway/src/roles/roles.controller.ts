import { BadRequestException, Body, Controller, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { I18nService } from "nestjs-i18n";

import { JwtPermissionsGuard, RestrictRequest } from "@app/security/jwt-permissions.guard";

import { UserRoleDto } from "domain/dtos/role.dto";
import { UserPermissions } from "domain/enums/user-permissions.enum";
import { ErrorCodes } from "domain/enums/error-codes.enum";

import { NewRoleForm } from "./dtos/new-role.form";
import { RolesService } from "./roles.service";

@ApiTags("auth")
@Controller("roles")
export class RolesController {
  constructor(
    private readonly i18n: I18nService,
    private readonly rolesService: RolesService
  ) { }

  @Post()
  @ApiOperation({ summary: "Add system roles", description: "This api endpoint uses for adding new system roles" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserRoleDto,
    isArray: true
  })
  @UseGuards(JwtPermissionsGuard)
  @RestrictRequest(UserPermissions.AddRoles)
  async addRoles(@Body() body: NewRoleForm[]) {
    const [form] = body;

    const dto = NewRoleForm.from(form);
    const errors = NewRoleForm.validate(dto);
    if (errors) {
      throw new BadRequestException({ message: this.i18n.t(ErrorCodes.InvalidForm), code: ErrorCodes.InvalidForm, errors });
    }

    const entity = await this.rolesService.addNewRole(dto);
    return [UserRoleDto.fromEntity(entity)];
  }
}
