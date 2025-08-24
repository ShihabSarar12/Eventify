import { Pool as PromisePool, RowDataPacket } from 'mysql2/promise';
import pool from '../configs/db.config';
import Event from '../models/event.model';
import Confirmation from '../types/confirmation.type';
import User from '../models/user.model';
import ApiError from '../middlewares/apiError.middleware';
import HttpStatus from '../constants/status.constant';

class AdminRepository {
    private pool: PromisePool;
    constructor() {
        this.pool = pool;
    }

    public createNewEvent = async (event: Event): Promise<Confirmation> => {
        const {
            title,
            description,
            featured,
            location,
            eventTime,
            imageURL,
            clubId,
        } = event;
        const [{ affectedRows, insertId }]: any = await pool.query(
            `INSERT INTO events (title, description, featured, location, eventTime, imageURL, clubId) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                title,
                description,
                featured,
                location,
                new Date(eventTime),
                imageURL,
                clubId,
            ]
        );

        return {
            affectedRows,
            insertId,
        };
    };

    public editEvent = async (event: Event): Promise<Confirmation> => {
        const allowedFields = [
            'title',
            'description',
            'featured',
            'location',
            'eventTime',
            'imageURL',
            'clubId',
        ];

        let query = 'UPDATE events SET ';
        const { eventId, ...filteredEvent } = event;
        let values = Object.values(filteredEvent);

        Object.keys(filteredEvent).forEach((key) => {
            if (allowedFields.includes(key)) {
                query += `${key} = ?, `;
            } else {
                throw new ApiError(
                    HttpStatus.BAD_REQUEST,
                    `Field ${key} is not allowed to be updated.`
                );
            }
        });

        query = query.slice(0, -2) + ' WHERE eventId = ?;';
        values.push(eventId);

        Object.keys(filteredEvent).forEach((key) => {
            if (key === 'eventTime' && typeof filteredEvent[key] === 'string') {
                const dateValue = new Date(filteredEvent[key] as string);
                filteredEvent[key] = dateValue
                    .toISOString()
                    .slice(0, 19)
                    .replace('T', ' ');
            }
        });

        values = Object.values(filteredEvent);
        values.push(eventId);

        const [{ affectedRows, insertId }]: any = await pool.query(
            query,
            values
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

    public getAllAttendees = async (
        userId: number
    ): Promise<User & RowDataPacket> => {
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
            JOIN 
                memberships m ON m.clubId = e.clubId
            WHERE 
                u.userId IS NOT NULL
            AND 
                m.userId = ? 
            AND 
                m.userId IN (
                    SELECT 
                        userId 
                    FROM 
                        users 
                    WHERE 
                        role = 'admin'
                )
            AND 
                u.role = 'student'
            GROUP BY 
                e.eventId
            ORDER BY 
                e.eventId;`,
            [userId]
        );

        const filteredAttendees = attendees.map((attendee: any) => {
            return {
                eventId: attendee.eventId,
                attendees: JSON.parse(attendee.attendees || '[]'),
            };
        });
        return filteredAttendees;
    };

    public getStats = async (userId: number): Promise<any> => {
        const [[stats]]: any = await pool.query(
            `SELECT
                COUNT(DISTINCT e.eventId) AS totalEvents,
                COUNT(DISTINCT r.userId) AS totalAttendees
            FROM
                events e
            LEFT JOIN 
                registrations r ON e.eventId = r.eventId
            JOIN 
                memberships m ON m.clubId = e.clubId
            JOIN 
                users u ON m.userId = u.userId
            WHERE
                u.userId = ?
                AND u.role = 'admin'
            GROUP BY 
                e.clubId;`,
            [userId]
        );

        const [[{ noOfUpcomingEvents }]]: any = await pool.query(
            `SELECT
                COUNT(*) AS noOfUpcomingEvents
            FROM
                events e
            JOIN
                memberships m ON e.clubId = m.clubId
            JOIN
                users u ON m.userId = u.userId
            WHERE
                e.eventTime > NOW()
                AND u.userId = ?
                AND u.role = 'admin'
            GROUP BY
                e.clubId;`,
            [userId]
        );
        return {
            ...stats,
            noOfUpcomingEvents,
        };
    };
}

export default new AdminRepository();
