import { Pool as PromisePool, RowDataPacket } from 'mysql2/promise';
import pool from '../configs/db.config';
import Event from '../models/event.model';

class StudentRepository {
    private pool: PromisePool;

    constructor() {
        this.pool = pool;
    }

    public getUpcomingEvents = async (userId: number): Promise<Event[]> => {
        const [events] = await this.pool.query<Event[] & RowDataPacket[]>(
            `SELECT
                e.eventId, 
                e.title, 
                e.description, 
                e.featured, 
                e.location, 
                e.eventTime, 
                e.imageURL, 
                e.clubId
            FROM 
                events e
            LEFT JOIN 
                registrations r ON r.eventId = e.eventId
            LEFT JOIN 
                users u ON u.userId = r.userId
            WHERE 
                u.userId = ?
            AND 
                u.role = 'student'
            AND 
                e.eventTime > NOW()
            ORDER BY 
                e.eventTime ASC;`,
            [userId]
        );
        return events;
    };
}

export default new StudentRepository();
