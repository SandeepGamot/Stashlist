import { Router } from 'express';
import { validateResource } from '../middlewares';
import { loginUserSchema, signupUserSchema } from '../schemas';
import { signupHandler, loginHandler } from '../controllers';
import { errorWrapper } from '../middlewares';
import authenticate from '../middlewares/authenticate';

const router = Router();

router.get('/me', authenticate, (req, res, next) => {
  res.send(res.locals.user);
});

router.post(
  '/signup',
  validateResource(signupUserSchema),
  errorWrapper(signupHandler)
);

router.post(
  '/login',
  validateResource(loginUserSchema),
  errorWrapper(loginHandler)
);

export default router;
