import { Request, RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { LoginUserInput, SignupUserInput } from '../schemas/user.schema';
import { findUserByUsername, signupUser } from '../services/user.service';
import { signJwt } from '../utils/jwt';

export const signupHandler: RequestHandler<{}, {}, SignupUserInput> = async (
  req,
  res,
  next
) => {
  try {
    const { username, email, password } = req.body;
    await signupUser({ username, email, password });
    res.status(201).json({
      message: 'User created successfully',
    });
  } catch (error: any) {
    //mongo already exist error code
    if (error.code === 11000) {
      return res.status(409).send({
        message: 'User already exists',
      });
    }
    next(error);
  }
};

export const loginHandler: RequestHandler<{}, {}, LoginUserInput> = async (
  req,
  res,
  next
) => {
  const { username, password } = req.body;

  const user = await findUserByUsername(username);

  if (!!user) {
    const isValid = await user.isValidPassword(password);

    if (isValid) {
      const accessToken = signJwt(
        {
          sub: user._id,
        },
        'accessTokenPrivateKey'
      );
      return res.send({ accessToken });
    }
  }

  return next(new createHttpError.BadRequest('Invalid username / password'));
};
