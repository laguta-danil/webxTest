import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as QRCode from 'qrcode';
import { uid } from 'uid';

import { ILoginRes, IResetPass, IUser } from '../../interfaces/user.interface';
import User from '../../models/User';

export default class UserService {
  static async registration(req: IUser): Promise<IUser> {
    try {
      const existingUser = await User.findOne({ email: req.email });

      if (existingUser) {
        throw new Error('A user with this email already exists');
      }

      const hashedPassword = await bcrypt.hash(req.password, 10);

      return await User.create({
        email: req.email,
        password: hashedPassword
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async login(req: IUser): Promise<ILoginRes> {
    const { email, password } = req;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('User not found');
      }

      if (!(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid login credentials');
      }

      const accessToken = jwt.sign(
        {
          email: user.email,
          userId: user.id
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return {
        token: accessToken,
        user
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async resetPassword(req: IResetPass): Promise<IUser> {
    try {
      const { email, oldPassword, newPassword } = req;

      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('User not found');
      }

      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

      if (!isPasswordValid) {
        throw new Error('Invalid login credentials');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      return await User.findByIdAndUpdate(
        { _id: user.id },
        { password: hashedPassword },
        { new: true }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async add2FA(email: string): Promise<string> {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('User not found');
      }

      const qrCodeKey = uid(32);
      const qrCode = await QRCode.toDataURL(qrCodeKey);

      await User.findByIdAndUpdate(
        { _id: user.id },
        { isTwoFactorAuthEnabled: true, qrCodeKey },
        { new: true }
      );

      return qrCode;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
