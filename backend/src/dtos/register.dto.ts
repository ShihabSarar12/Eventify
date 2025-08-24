import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    IsStrongPassword,
    Length,
} from 'class-validator';

class RegisterDTO {
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email!: string;

    @IsStrongPassword()
    @IsNotEmpty()
    @IsString()
    @Length(6, 16)
    password!: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 16)
    firstName!: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 16)
    lastName!: string;

    @IsEnum(['student', 'admin'])
    @IsNotEmpty()
    @IsString()
    role!: 'student' | 'admin';
}

export default RegisterDTO;
