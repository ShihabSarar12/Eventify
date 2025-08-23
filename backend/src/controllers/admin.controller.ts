import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import Event from '../models/event.model';
import adminService from '../services/admin.service';
import HttpStatus from '../constants/status.constant';

class AdminController {
    constructor() {}

    public createEvent = asyncHandler(async (req: Request, res: Response) => {
        const event: Event = req.body;
        const { insertId } = await adminService.createEvent(event);
        res.status(HttpStatus.OK).json({
            message: 'Event created successfully',
            insertId,
        });
    });

    public editEvent = asyncHandler(async (req: Request, res: Response) => {
        const event: Event = req.body;
        const { affectedRows } = await adminService.editEvent(event);
        res.status(HttpStatus.OK).json({
            message: 'Event edited successfully',
        });
    });

    public deleteEvent = asyncHandler(async (req: Request, res: Response) => {
        const eventId: number = parseInt(req.query.eventId as string);
        const { affectedRows } = await adminService.deleteEvent(eventId);
        res.status(HttpStatus.OK).json({
            message: 'Event deleted successfully',
            affectedRows,
        });
    });

    public getAllAttendees = asyncHandler(
        async (req: Request, res: Response) => {
            const attendees = await adminService.getAllAttendees();
            res.status(HttpStatus.OK).json({
                data: attendees,
            });
        }
    );
}

export default new AdminController();
