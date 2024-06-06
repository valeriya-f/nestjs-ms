import { validate } from "class-validator";

export class SignUpClientForm {
  email!: string;

  password!: string;

  confirmPassword!: string;

  static from(form: SignUpClientForm) {
    const it = new SignUpClientForm();
    it.email = form.email;
    it.password = form.password;
    it.confirmPassword = form.confirmPassword;
    return it;
  }

  static async validate(form: SignUpClientForm) {
    const errors = await validate(form);
    if (errors.length) {
      return errors;
    }
    return;
  }
}