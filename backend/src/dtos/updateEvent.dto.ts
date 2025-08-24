import {
    IsString,
    Length,
    IsNotEmpty,
    IsBoolean,
    IsInt,
    IsOptional,
} from 'class-validator';
import IsDateTime from '../decorators/isDateTime.decorator';

class UpdateEventDTO {
    @IsInt()
    @IsNotEmpty()
    eventId!: number;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Length(3, 74)
    title!: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsOptional()
    @IsBoolean()
    featured!: string;

    @IsOptional()
    @IsString()
    @Length(3, 99)
    location!: string;

    @IsOptional()
    @IsDateTime()
    eventTime!: string;
}

export default UpdateEventDTO;
