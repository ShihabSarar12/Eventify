import HttpStatus from '../constants/status.constant';
import ApiError from '../middlewares/apiError.middleware';
import Event from '../models/event.model';
import adminRepository from '../repositories/admin.repository';
import Confirmation from '../types/confirmation.type';

class AdminService {
    constructor() {}

    public createEvent = async (event: Event): Promise<Confirmation> => {
        const { affectedRows, insertId } = await adminRepository.createNewEvent(
            event
        );
        if (!affectedRows && !insertId) {
            throw new ApiError(
                HttpStatus.BAD_REQUEST,
                'Failed to create new event'
            );
        }
        return {
            affectedRows,
            insertId,
        };
    };

    public editEvent = async (event: Event): Promise<Confirmation> => {
        const { affectedRows, insertId } = await adminRepository.editEvent(
            event
        );
        if (!affectedRows && !insertId) {
            throw new ApiError(
                HttpStatus.BAD_REQUEST,
                'Failed to edit the event'
            );
        }
        return {
            affectedRows,
            insertId,
        };
    };

    public deleteEvent = async (
        eventId: number
    ): Promise<Omit<Confirmation, 'insertId'>> => {
        const { affectedRows } = await adminRepository.deleteEvent(eventId);
        if (!affectedRows) {
            throw new ApiError(
                HttpStatus.BAD_REQUEST,
                'Failed to delete the event'
            );
        }
        return {
            affectedRows,
        };
    };

    public getAllAttendees = async () => {
        const attendees = await adminRepository.getAllAttendees();
        if (attendees.length === 0) {
            throw new ApiError(HttpStatus.NOT_FOUND, 'No attendees found');
        }
        return attendees;
    };
}

export default new AdminService();
