type RefreshToken = {
    tokenId: number;
    userId: number;
    token: string;
    expiryTime: Date | string;
    createdAt: Date | string;
};

export default RefreshToken;
