import HttpStatus from '../constants/status.constant';
import ApiError from '../middlewares/apiError.middleware';
import User from '../models/user.model';
import authRepository from '../repositories/auth.repository';
import Confirmation from '../types/confirmation.type';

class AuthService {
    constructor() {}

    public getUserByEmail = async (email: string): Promise<User | null> => {
        const user = await authRepository.getUserByEmail(email);
        return user;
    };

    public addUser = async (
        user: User,
        hash: string | undefined
    ): Promise<Confirmation> => {
        const { affectedRows, insertId } = await authRepository.addUser(
            user,
            hash
        );
        if (affectedRows === 0 && !insertId) {
            throw new ApiError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'Failed to add user'
            );
        }
        return {
            affectedRows,
            insertId,
        };
    };
}

export default new AuthService();
