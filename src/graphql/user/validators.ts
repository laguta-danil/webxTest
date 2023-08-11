import { z } from 'zod';

export const registrationInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3)
});

export const loginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  qrCodeKey: z.string().optional()
});

export const resetPasswordInputSchema = z.object({
  email: z.string().email(),
  newPassword: z.string().min(3),
  oldPassword: z.string().min(3)
});

export const add2FAInputSchema = z.object({
  email: z.string().email()
});
