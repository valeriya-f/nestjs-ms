import {Injectable} from "@nestjs/common";

import {RolesRepo} from "domain/repos/roles.repo";

import {NewRoleForm} from "./dtos/new-role.form";

@Injectable()
export class RolesService {
  constructor(private readonly repo_roles: RolesRepo) {
  }

  async addNewRole(form: NewRoleForm) {
    return this.repo_roles.addOne(form);
  }
}
