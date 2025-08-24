import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import studentService from '../services/student.service';
import HttpStatus from '../constants/status.constant';

class StudentController {
    constructor() {}

    public getUpcomingEvents = asyncHandler(
        async (req: Request, res: Response) => {
            const userId: number = parseInt(req.body.userId as string);
            if (isNaN(userId)) {
                res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'Invalid userId',
                });
                return;
            }
            const events = await studentService.getUpcomingEvents(userId);
            res.status(HttpStatus.OK).json({
                data: events,
            });
        }
    );
}

export default new StudentController();
