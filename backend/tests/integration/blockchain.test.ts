import request from 'supertest';
import app from '../../src/app';

describe('Blockchain API', () => {
    it('should return user with specific id', async () => {
        const response = await request(app).get(
            '/api/v1/blockchain/user/1?query=<script>alert("test")</script><a href="http://example.com">link</a>'
        );

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('user');
        expect(response.body).toHaveProperty('query');
        expect(Object.keys(response.body)).toHaveLength(2);
        expect(response.body.user).toBeInstanceOf(Object);
        expect(response.body.user).toHaveProperty('id');
        expect(response.body.user).toHaveProperty('name');
        expect(response.body.user).toHaveProperty('email');
        expect(response.body.user).toHaveProperty('password');
        expect(Object.keys(response.body.user)).toHaveLength(4);
        expect(response.body.user.id).toBe(1);
        expect(response.body.user.name).toBeDefined();
        expect(response.body.user.email).toBeDefined();
        expect(response.body.user.password).toBeDefined();
        expect(response.body.user.id).toEqual(expect.any(Number));
        expect(response.body.user.name).toEqual(expect.any(String));
        expect(response.body.user.email).toEqual(expect.any(String));
        expect(response.body.user.password).toEqual(expect.any(String));
        expect(response.body.query).toBeDefined();
        expect(response.body.query).toEqual(expect.any(String));
        expect(response.body.query).toBeDefined();
        console.log(response.body);
    });

    it('should return a message on GET /message', async () => {
        const response = await request(app).get('/api/v1/blockchain/message');

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('message');
        expect(Object.keys(response.body)).toHaveLength(1);
        expect(response.body).toEqual({
            message: 'Blockchain controller initialized successfully',
        });
    });

    it('should create a user with valid data', async () => {
        const newUser = {
            username: 'shihabsarar12',
            email: 'shihab@gmail.om',
            password: '@Chk232h',
            eventTime: '2022-12-31T23:00:00',
            eventDate: '2025-05-12',
        };
        const response = await request(app)
            .post('/api/v1/blockchain/test')
            .send(newUser);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('message');
        expect(Object.keys(response.body)).toHaveLength(1);
        expect(response.body).toEqual({
            message: 'Blockchain controller initialized successfully',
        });
        console.log(response.body);
    });
});
