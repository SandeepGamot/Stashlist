import { object, TypeOf } from 'zod';
import {
  emailValidation,
  passwordValidation,
  usernameValidation,
} from '../validations';

export const signupUserSchema = object({
  body: object({
    username: usernameValidation,
    email: emailValidation,
    password: passwordValidation,
    passwordConfirmation: passwordValidation,
  }).refine(
    (data) => data.password === data.passwordConfirmation,
    'Password Confirmation must match with Password'
  ),
});

export const loginUserSchema = object({
  body: object({
    username: usernameValidation,
    password: passwordValidation,
  }),
});

export type SignupUserInput = TypeOf<typeof signupUserSchema>['body'];
export type LoginUserInput = TypeOf<typeof loginUserSchema>['body'];
