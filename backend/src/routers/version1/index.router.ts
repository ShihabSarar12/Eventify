import { Router } from 'express';
import blockchainRouter from './blockchain.router';
import adminRouter from './admin.router';

const routerV1 = Router();

routerV1.use('/blockchain', blockchainRouter);
routerV1.use('/admin', adminRouter);

export default routerV1;
