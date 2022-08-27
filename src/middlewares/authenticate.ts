import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { JwtPayload } from 'jsonwebtoken';
import { findUserById } from '../services/user.service';
import { verifyJwt } from '../utils/jwt';
import log from '../utils/logger';

const authenticate: RequestHandler = async (req, res, next) => {
  if (!!req.headers.authorization) {
    try {
      const token = req.headers.authorization.replace(/^Bearer\s/, '');
      log.info({ token });

      const valid = verifyJwt<JwtPayload>(token, 'accessTokenPublicKey');
      if (!!valid && !!valid.sub) {
        const user = await findUserById(valid.sub);
        if (!!user) {
          res.locals.user = user;
          next();
        } else {
          return res.sendStatus(401);
        }
      }
    } catch {
      return res.sendStatus(401);
    }
  }
  return res.sendStatus(401);
};

export default authenticate;
