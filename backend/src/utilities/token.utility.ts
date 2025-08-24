import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_REFRESH_SECRET, JWT_SECRET } from '../constants/env.constants';
import User from '../models/user.model';
import ApiError from '../middlewares/apiError.middleware';
import HttpStatus from '../constants/status.constant';
import authRepository from '../repositories/auth.repository';

class TokenUtility {
    private static instance: TokenUtility;
    private jwtSecret: string;
    private jwtRefreshSecret: string;

    private constructor() {
        this.jwtSecret = JWT_SECRET || 'secret';
        this.jwtRefreshSecret = JWT_REFRESH_SECRET || 'refresh_secret';
    }

    public static getInstance(): TokenUtility {
        if (!TokenUtility.instance) {
            TokenUtility.instance = new TokenUtility();
        }
        return TokenUtility.instance;
    }

    public generateAccessToken(payload: number): string {
        return jwt.sign(
            {
                userId: payload,
            },
            this.jwtSecret,
            {
                expiresIn: '1h',
            }
        );
    }

    public generateRefreshToken = async (payload: number): Promise<string> => {
        const refreshToken = jwt.sign(
            {
                userId: payload,
            },
            this.jwtRefreshSecret,
            {
                expiresIn: '7d',
            }
        );

        const { affectedRows, insertId } = await authRepository.addRefreshToken(
            {
                userId: payload,
                token: refreshToken,
            }
        );
        if (affectedRows === 0 && !insertId) {
            throw new ApiError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'Failed to store refresh token'
            );
        }
        return refreshToken;
    };

    public verifyToken = async (token: string): Promise<User> => {
        const decoded = jwt.verify(token, this.jwtSecret) as JwtPayload;
        const user = await authRepository.getUserByUserId(decoded.userId);
        if (!user) {
            throw new ApiError(HttpStatus.UNAUTHORIZED, 'Invalid token');
        }
        return user as User;
    };
}

export default TokenUtility.getInstance();
