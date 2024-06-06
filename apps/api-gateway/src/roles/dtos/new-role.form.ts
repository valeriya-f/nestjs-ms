import {validate} from "class-validator";

import {UserRoles} from "domain/enums/user-roles.enum";
import {UserPermissions} from "domain/enums/user-permissions.enum";

export class NewRoleForm {
  type!: UserRoles;
  name!: string;
  permissions!: UserPermissions[];
  isDefault!: boolean;

  static from(form: NewRoleForm) {
    const it = new NewRoleForm();
    it.type = form.type;
    it.name = form.name;
    it.permissions = form.permissions;
    it.isDefault = form.isDefault;
    return it;
  }

  static async validate(form: NewRoleForm) {
    const errors = await validate(form);
    if (errors.length) {
      return errors;
    }

    return;
  }
}