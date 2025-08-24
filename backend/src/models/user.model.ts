type User = {
    userId: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'student' | 'admin';
    createdAt: string | Date;
    updatedAt: string | Date;
};

export default User;
