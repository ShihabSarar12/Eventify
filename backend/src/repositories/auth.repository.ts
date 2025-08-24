import { Pool as PromisePool, RowDataPacket } from 'mysql2/promise';
import pool from '../configs/db.config';
import RefreshToken from '../models/token.model';
import Confirmation from '../types/confirmation.type';
import User from '../models/user.model';

class AuthRepository {
    private pool: PromisePool;

    constructor() {
        this.pool = pool;
    }

    public addRefreshToken = async (
        refreshToken: Partial<RefreshToken>
    ): Promise<Confirmation> => {
        const { userId, token } = refreshToken;
        const [{ affectedRows, insertId }]: any = await this.pool.query(
            'INSERT INTO refreshTokens (token, userId, expiryTime) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY));',
            [token, userId]
        );

        return { affectedRows, insertId };
    };

    public getUserByUserId = async (userId: number): Promise<User | null> => {
        const [[user]] = await this.pool.query<User & RowDataPacket[]>(
            'SELECT * FROM users WHERE user_id = ?;',
            [userId]
        );
        return user as User | null;
    };

    public getUserByEmail = async (email: string): Promise<User | null> => {
        const [[user]] = await pool.query<User & RowDataPacket[]>(
            `SELECT * FROM users WHERE email = ?`,
            [email]
        );

        return user as User | null;
    };

    public addUser = async (
        user: User,
        hash: string | undefined
    ): Promise<Confirmation> => {
        const { firstName, lastName, email, password, role } = user;
        const [{ affectedRows, insertId }]: any = await this.pool.query(
            `INSERT INTO users (firstName, lastName, email, password, role) VALUES (?, ?, ?, ?, ?)`,
            [firstName, lastName, email, hash, role]
        );
        return {
            affectedRows,
            insertId,
        };
    };
}

export default new AuthRepository();
