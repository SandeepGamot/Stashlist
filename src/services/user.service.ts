import UserModel from '../models/user.model';
import { SignupUserInput } from '../schemas/user.schema';

export const signupUser = (
  user: Omit<SignupUserInput, 'passwordConfirmation'>
) => {
  return UserModel.create(user);
};

export const findUserById = (id: string) => {
  return UserModel.findById(id);
};

export const findUserByUsername = (username: string) => {
  return UserModel.findOne({ username });
};

export const findUserByEmail = (email: string) => {
  return UserModel.findOne({ email });
};
