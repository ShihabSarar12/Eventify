import {
    IsString,
    Length,
    IsNotEmpty,
    IsBoolean,
    IsInt,
} from 'class-validator';
import IsDateTime from '../decorators/isDateTime.decorator';

class UpdateEventDTO {
    @IsInt()
    @IsNotEmpty()
    eventId!: number;

    @IsString()
    @Length(3, 74)
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsBoolean()
    featured!: string;

    @IsString()
    @Length(3, 99)
    location!: string;

    @IsDateTime()
    eventTime!: string;
}

export default UpdateEventDTO;
