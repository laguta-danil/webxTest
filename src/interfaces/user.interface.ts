export interface IUser {
  id?: string;
  email: string;
  password: string;
  qrCodeKey?: string;
}

export interface ILoginRes {
  user: IUser;
  token: string;
}

export interface IResetPass {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export interface IMutationLogin {
  email: string;
  password: string;
  qrCodeKey?: string;
}

export interface IMutationResetPassword {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export interface IMutationAdd2FAArgs {
  email: string;
}

export interface IReq {
  user?: IUser;
  error?: string;
}
