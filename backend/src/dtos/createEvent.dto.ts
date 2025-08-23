import { IsString, Length, IsNotEmpty, IsBoolean } from 'class-validator';
import IsDateTime from '../decorators/isDateTime.decorator';

class CreateEventDTO {
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

export default CreateEventDTO;
