import { Router } from 'express';
import errorWrapper from '../middlewares/errorWrapper';

const router = Router();

router.get(
  '/',
  errorWrapper(async (req, res) => {
    res.send('Auth');
  })
);

export default router;
