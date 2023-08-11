import {
  IMutationAdd2FAArgs,
  IMutationLogin,
  IMutationResetPassword,
  IUser
} from '../../interfaces/user.interface';
import User from '../../models/User';

import UserService from './services';
import {
  add2FAInputSchema,
  loginInputSchema,
  registrationInputSchema,
  resetPasswordInputSchema
} from './validators';

const resolvers = {
  Mutation: {
    add2FA: async (_, { email }: IMutationAdd2FAArgs) => {
      try {
        const validatedInput = add2FAInputSchema.parse({ email });

        const code = await UserService.add2FA(validatedInput.email);

        return {
          code,
          message: 'Activated Qr code authorization',
          success: true
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    login: async (_, { email, password, qrCodeKey }: IMutationLogin) => {
      try {
        const validatedInput = loginInputSchema.parse({
          email,
          password,
          qrCodeKey
        });

        const loggedInUser = await UserService.login({
          email: validatedInput.email,
          password: validatedInput.password,
          qrCodeKey: validatedInput.qrCodeKey
        });

        return {
          message: 'User logged in successfully',
          success: true,
          token: loggedInUser.token,
          user: loggedInUser.user
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    registration: async (_, { email, password }: IUser) => {
      try {
        const validatedInput = registrationInputSchema.parse({
          email,
          password
        });

        const user = await UserService.registration({
          email: validatedInput.email,
          password: validatedInput.password
        });

        return {
          message: 'Registration succes',
          success: true,
          user
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    resetPassword: async (
      _,
      { email, oldPassword, newPassword }: IMutationResetPassword
    ) => {
      try {
        const validatedInput = resetPasswordInputSchema.parse({
          email,
          newPassword,
          oldPassword
        });

        const user = await UserService.resetPassword({
          email: validatedInput.email,
          newPassword: validatedInput.newPassword,
          oldPassword: validatedInput.oldPassword
        });

        return {
          message: 'Password reset successfully',
          success: true,
          user
        };
      } catch (error) {
        throw new Error(error.message);
      }
    }
  },
  Query: {
    user: async (_, args, context: any) => User.findOne(context.id)
  }
};

export default resolvers;
