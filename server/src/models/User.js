import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  fullname: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    required: true,
    default: 'user'
  },
  password: {
    type: String,
    length: 6,
    required: true
  }
}, {
  timestamps: true,
  collection: 'users'
});

export const User = mongoose.model('User', UserSchema);