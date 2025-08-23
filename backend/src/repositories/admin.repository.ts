import { Pool as PromisePool, RowDataPacket } from 'mysql2/promise';
import pool from '../configs/db.config';
import Event from '../models/event.model';
import Confirmation from '../types/confirmation.type';
import User from '../models/user.model';

class AdminRepository {
    private pool: PromisePool;
    constructor() {
        this.pool = pool;
    }

    public createNewEvent = async (event: Event): Promise<Confirmation> => {
        const { title, description, featured, location, eventTime, imageURL } =
            event;
        const [{ affectedRows, insertId }]: any = await pool.query(
            `INSERT INTO events (title, description, featured, location, eventTime, imageURL) VALUES (?, ?, ?, ?, ?, ?)`,
            [
                title,
                description,
                featured,
                location,
                new Date(eventTime),
                imageURL,
            ]
        );

        return {
            affectedRows,
            insertId,
        };
    };

    public editEvent = async (event: Event): Promise<Confirmation> => {
        const {
            eventId,
            title,
            description,
            featured,
            location,
            eventTime,
            imageURL,
        } = event;
        const [{ affectedRows, insertId }]: any = await pool.query(
            `UPDATE events SET title = ?, description = ?, featured = ?, location = ?, eventTime = ?, imageURL = ? WHERE eventId = ?`,
            [
                title,
                description,
                featured,
                location,
                eventTime,
                imageURL,
                eventId,
            ]
        );

        return {
            affectedRows,
            insertId,
        };
    };

    public deleteEvent = async (
        eventId: number
    ): Promise<Omit<Confirmation, 'insertId'>> => {
        const [{ affectedRows, insertId }]: any = await pool.query(
            `DELETE FROM events WHERE eventId = ?`,
            [eventId]
        );
        return {
            affectedRows,
        };
    };

    public getAllAttendees = async (): Promise<User & RowDataPacket> => {
        const [attendees]: any = await pool.query(
            `SELECT 
                e.eventId,
                CONCAT('[', 
                    GROUP_CONCAT(
                        CONCAT('{"userId":', u.userId, ',"firstName":"', u.firstName, '","lastName":"', u.lastName, '","email":"', u.email, '"}')
                        SEPARATOR ','
                    ), 
                ']') AS attendees
            FROM 
                events e
            LEFT JOIN 
                registrations r ON e.eventId = r.eventId
            LEFT JOIN 
                users u ON r.userId = u.userId
            WHERE 
                u.userId IS NOT NULL
            GROUP BY 
                e.eventId
            ORDER BY 
                e.eventId;`
        );

        const filteredAttendees = attendees.map((attendee: any) => {
            return {
                eventId: attendee.eventId,
                attendees: JSON.parse(attendee.attendees || '[]'),
            };
        });
        return filteredAttendees;
    };
}

export default new AdminRepository();
