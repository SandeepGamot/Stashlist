import { string } from 'zod';

export const usernameValidation = string({
  required_error: 'Username is required',
  invalid_type_error: 'Username is invalid',
}).regex(
  /^[a-zA-Z0-9]{3,}$/g,
  'Username must be atleast 3 chars and only contain alphanumeric characters'
);

export const emailValidation = string({
  required_error: 'Email is required',
})
  .trim()
  .email('Invalid Email');

export const passwordValidation = string({
  required_error: 'Password is required',
})
  .trim()
  .regex(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/g,
    'Password must be atleast 8 chars long, contain 1 Uppercase letter, 1 lowercase letter and 1 number'
  );
