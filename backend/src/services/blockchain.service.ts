import blockchainRepository from '../repositories/blockchain.repository';
import User from '../models/user.model';
import logger from '../utilities/logger.utility';
import sanitizeHTMLConfig from '../configs/sanitizeHTML.config';
import sanitize from 'sanitize-html';

class BlockchainService {
    constructor() {}

    public initializeBlockchain = async (): Promise<void> => {
        logger.info('Blockchain initialized successfully');
    };

    public getUserData = async (userId: number): Promise<User | null> => {
        const user: User | null = await blockchainRepository.getUserById(
            userId
        );
        if (!user) {
            logger.error(`User with ID ${userId} not found`);
            return null;
        }
        return user;
    };

    public sanitizeQuery = (query: string): string => {
        return sanitize(query, sanitizeHTMLConfig);
    };
}

export default new BlockchainService();
