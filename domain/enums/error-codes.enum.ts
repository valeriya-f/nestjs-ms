export enum ErrorCodes {
  FieldShouldBeString = "errors.field-invalid.should-be-string",
  FieldShouldBeNumber = "errors.field-invalid.should-be-number",
  FieldShouldBeEnum = "errors.field-invalid.should-be-enum",
  FieldShouldBeEmail = "errors.field-invalid.should-be-email",

  InvalidForm = "errors.form-invalid",

  NotFoundUser = "errors.not-found.user",

  InvalidStatusUserNotActive = "errors.invalid-status.user-not-active",
  UserNotAuthorizedRequest = "errors.not-authorized.user-request",
}