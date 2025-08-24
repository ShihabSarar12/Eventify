import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsStrongPassword,
    Length,
} from 'class-validator';

class LoginDTO {
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email!: string;

    @IsStrongPassword()
    @IsNotEmpty()
    @IsString()
    @Length(6, 16)
    password!: string;
}

export default LoginDTO;
