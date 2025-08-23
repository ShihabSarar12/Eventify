type User = {
    userId: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'student' | 'admin';
    createdAt: string;
    updatedAt: string;
};

export default User;
