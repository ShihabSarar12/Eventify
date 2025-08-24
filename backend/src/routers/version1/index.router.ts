import { Router } from 'express';
import adminRouter from './admin.router';
import studentRouter from './student.router';
import authRouter from './auth.router';

const routerV1 = Router();

routerV1.use('/admin', adminRouter);
routerV1.use('/student', studentRouter);
routerV1.use('/auth', authRouter);

export default routerV1;
