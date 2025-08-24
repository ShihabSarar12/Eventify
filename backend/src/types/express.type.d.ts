import user from '../models/user.model';

declare global {
    namespace Express {
        interface Request {
            user?: User;
            hash?: string;
            verified?: boolean;
        }
    }
}
