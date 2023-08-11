import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  createdAt: {
    default: Date.now(),
    type: Date
  },
  email: {
    lowercase: true,
    required: true,
    type: String,
    unique: true
  },
  password: {
    required: true,
    type: String
  },
  qrCodeKey: {
    required: false,
    type: String,
    unique: true
  },
  twoFactorAuthEnabled: {
    default: false,
    type: Boolean
  },
  updatedAt: Date
});

export default mongoose.model('User', UserSchema);
