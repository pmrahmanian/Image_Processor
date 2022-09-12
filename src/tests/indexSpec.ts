import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe ('I: Test endpoint responses', () => {
    it ('I.1: gets the root endpoint', async() => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });

    it ('I.2: gets the /images endpoint', async() => {
        const response = await request.get('/images');
        expect(response.status).toBe(200);
    })

    it ('I.3: gets the /images/placeholder endpoint', async() => {
        const response = await request.get('/images/placeholder');
        expect(response.status).toBe(200);
    })

    it ('I.4: gets the /images/resize endpoint', async() => {
        const response = await request.get('/images/resize');
        expect(response.status).toBe(200);
    })
});