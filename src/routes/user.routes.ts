import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validate } from '../middlewares/validate';
import { registerSchema, loginSchema, refreshTokenSchema } from '../schemas/user.schema';

const router = Router();
const userController = new UserController();

router.post('/register', validate(registerSchema), userController.register.bind(userController));
router.post('/login', validate(loginSchema), userController.login.bind(userController));
router.post('/refresh-token', validate(refreshTokenSchema), userController.refreshToken.bind(userController));

export const userRouter = router; 