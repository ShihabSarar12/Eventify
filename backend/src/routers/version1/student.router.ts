import { Router } from 'express';
import studentController from '../../controllers/student.controller';

const studentRouter = Router();

studentRouter.post('/upcoming-events', studentController.getUpcomingEvents);

export default studentRouter;
