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
            const userId: number = parseInt(req.body.userId as string);
            if (isNaN(userId)) {
                res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'Invalid userId',
                });
                return;
            }

            const attendees = await adminService.getAllAttendees(userId);
            res.status(HttpStatus.OK).json({
                data: attendees,
            });
        }
    );

    public getStats = asyncHandler(async (req: Request, res: Response) => {
        const userId: number = parseInt(req.body.userId as string);
        const stats = await adminService.getStats(userId);
        res.status(HttpStatus.OK).json({
            data: stats,
        });
    });
}

export default new AdminController();
