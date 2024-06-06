import { validate } from "class-validator";

export class SignUpGuestForm {

  static from(form: SignUpGuestForm) {
    const it = new SignUpGuestForm();
    return it;
  }

  static async validate(form: SignUpGuestForm) {
    const errors = await validate(form);
    if (errors.length) {
      return errors;
    }
    return;
  }
}