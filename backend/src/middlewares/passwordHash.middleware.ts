import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import { SALT_ROUNDS } from '../constants/env.constants';
import ApiError from './apiError.middleware';
import HttpStatus from '../constants/status.constant';

class PasswordHash {
    private saltRounds: number;
    constructor() {
        this.saltRounds = SALT_ROUNDS ? parseInt(SALT_ROUNDS, 10) : 10;
    }
    public passwordHash = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            const { password } = req.body;
            const salt = await bcrypt.genSalt(parseInt(SALT_ROUNDS as string));
            req.hash = await bcrypt.hash(password, salt);
            next();
        }
    );

    public passwordCompare = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            if (!req.user && !req.user.password) {
                throw new ApiError(
                    HttpStatus.UNAUTHORIZED,
                    'User is not valid'
                );
            }
            const { password } = req.body;
            req.verified = await bcrypt.compare(password, req.user.password);
            next();
        }
    );
}

export default new PasswordHash();
