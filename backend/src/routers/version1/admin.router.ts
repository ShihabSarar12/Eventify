import { Router } from 'express';
import adminController from '../../controllers/admin.controller';
import CreateEventDTO from '../../dtos/createEvent.dto';
import validateDTO from '../../middlewares/validateDTO.middleware';
import UpdateEventDTO from '../../dtos/updateEvent.dto';

const adminRouter = Router();

adminRouter
    .post('/event', validateDTO(CreateEventDTO), adminController.createEvent)
    .patch('/event', validateDTO(UpdateEventDTO), adminController.editEvent)
    .delete('/event', adminController.deleteEvent);

adminRouter.post('/attendees', adminController.getAllAttendees);
adminRouter.post('/stats', adminController.getStats);

export default adminRouter;
