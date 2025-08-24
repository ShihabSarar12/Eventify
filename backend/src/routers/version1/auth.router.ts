import { Router } from 'express';
import authController from '../../controllers/auth.controller';
import passwordHashMiddleware from '../../middlewares/passwordHash.middleware';
import LoginDTO from '../../dtos/login.dto';
import validateDTO from '../../middlewares/validateDTO.middleware';
import RegisterDTO from '../../dtos/register.dto';

const authRouter = Router();

authRouter.post(
    '/login',
    validateDTO(LoginDTO),
    authController.authValidate,
    passwordHashMiddleware.passwordCompare,
    authController.authLogin
);

authRouter.post(
    '/register',
    validateDTO(RegisterDTO),
    passwordHashMiddleware.passwordHash,
    authController.authRegister
);

export default authRouter;
