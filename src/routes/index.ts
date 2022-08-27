import { Router } from 'express';
import { default as UserRoutes } from './user.route';
import { default as AuthRoutes } from './auth.route';
const router = Router();

router.get('/health', (_, res) => {
  res.sendStatus(200);
});

router.use('/users', UserRoutes);
router.use('/auth', AuthRoutes);

export default router;
