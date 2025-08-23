import { Router } from 'express';
import adminController from '../../controllers/admin.controller';
import CreateEventDTO from '../../dtos/createEvent.dto';
import validateDTO from '../../middlewares/validateDTO.middleware';

const adminRouter = Router();

adminRouter
    .post('/event', validateDTO(CreateEventDTO), adminController.createEvent)
    .patch('/event', validateDTO(CreateEventDTO), adminController.editEvent)
    .delete('/event', adminController.deleteEvent);

adminRouter.get('/attendees', adminController.getAllAttendees);

export default adminRouter;
