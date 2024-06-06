import {BadRequestException, Body, Controller, Post} from "@nestjs/common";

import {AuthService} from "./auth.service";

import {SignUpGuestForm} from "./dtos/sign-up-guest.form";
import {SignUpClientForm} from "./dtos/sign-up-client.form";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post("sign-up/guest")
  async signUpGuest(@Body() body: SignUpGuestForm) {
    const form = SignUpGuestForm.from(body);
    const errors = await SignUpGuestForm.validate(form);
    if (errors) {
      throw new BadRequestException({message: "", errors});
    }

    return await this.authService.signUpGuest(form);
  }

  @Post("sign-up/client")
  async signUpClient(@Body() body: SignUpClientForm) {
    const form = SignUpClientForm.from(body);
    const errors = await SignUpClientForm.validate(form);
    if (errors) {
      throw new BadRequestException({message: "", errors});
    }

    return await this.authService.signUpClient(form);
  }
}
