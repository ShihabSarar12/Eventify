import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import tokenUtility from '../utilities/token.utility';
import ApiError from './apiError.middleware';
import HttpStatus from '../constants/status.constant';

const verify = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            try {
                token = req.headers.authorization.split(' ')[1];
                req.user = await tokenUtility.verifyToken(token);
                next();
            } catch (error) {
                throw new ApiError(
                    HttpStatus.BAD_REQUEST,
                    'Failed to authorize token'
                );
            }
        }
        if (!token) {
            throw new ApiError(HttpStatus.UNAUTHORIZED, 'Not authorized');
        }
    }
);

export default verify;
