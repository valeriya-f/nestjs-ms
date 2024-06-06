export enum UserPermissions {
  All = "permissions.*",

  // ============== auth ===========
  AllAuth = "permissions.auth.*",
  RefreshToken = "permissions.auth.refresh-token",
  SignOut = "permissions.auth.sign-out",

  // ============== users ==========
  AllUsers = "permissions.users.*",
  GetUsers = "permissions.users.get-users",
  GetUserInfo = "permissions.users.get-user-info",

  // ============== roles ==========
  AllRoles = "permissions.roles.*",
  AddRoles = "permissions.roles.add-roles"
}
