import HttpStatus from '../constants/status.constant';
import ApiError from '../middlewares/apiError.middleware';
import Event from '../models/event.model';
import studentRepository from '../repositories/student.repository';

class StudentService {
    constructor() {}

    public getUpcomingEvents = async (userId: number): Promise<Event[]> => {
        const events = await studentRepository.getUpcomingEvents(userId);
        if (events.length === 0) {
            throw new ApiError(
                HttpStatus.NOT_FOUND,
                'No upcoming events found'
            );
        }
        return events;
    };
}

export default new StudentService();
