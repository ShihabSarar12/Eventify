import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import HttpStatus from '../constants/status.constant';
import tokenUtility from '../utilities/token.utility';
import authService from '../services/auth.service';
import Confirmation from '../types/confirmation.type';

class AuthController {
    constructor() {}

    public authValidate = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            const { email } = req.body;
            const user = await authService.getUserByEmail(email);
            if (!user) {
                res.status(403).json({
                    message: 'User does not exist',
                });
                return;
            }
            req.user = user;
            next();
        }
    );

    public authLogin = asyncHandler(async (req: Request, res: Response) => {
        const { verified, user } = req;
        const { userId, password, ...filteredUser } = user;
        res.status(verified ? HttpStatus.OK : HttpStatus.UNAUTHORIZED).json({
            loginStatus: verified,
            user: verified ? filteredUser : null,
            accessToken: verified
                ? tokenUtility.generateAccessToken(userId)
                : null,
            refreshToken: verified
                ? await tokenUtility.generateRefreshToken(userId)
                : null,
        });
    });

    public authRegister = asyncHandler(async (req: Request, res: Response) => {
        const user = req.body;
        const hash = req.hash;
        const { insertId }: any = (await authService.addUser(
            user,
            hash
        )) as Confirmation;
        res.status(HttpStatus.OK).json({
            insertId,
            message: 'Successfully added user',
        });
    });
}

export default new AuthController();
