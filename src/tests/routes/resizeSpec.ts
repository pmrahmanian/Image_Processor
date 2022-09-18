import supertest from 'supertest';
import app from '../../index';
import fs from 'fs'
import {Response, Request} from 'express'
import sizeof from 'image-size'

const request = supertest(app);

describe ('GET /images/resize Endpoint', ()=> {

    describe('Client failure situations', () => {
        
        it ('no name argument provided', async () => {
            const response = await request.get('/images/resize');
            expect(response.status).toBe(400);
        })

        it ('image does not exist', async () => {
            const response = await request.get('/images/resize?name=ThisNameDoesNotExist.jpg');
            expect(response.status).toBe(404);
        })

    })
    
    describe('/images/resize?name=goldengate', () => {
        let BeforeAllResponse: Promise<Response> | Response | object
        const path = './assets/thumbs/goldengate_300x300.jpg'
        beforeAll(async ()=> {
            fs.unlinkSync(path)
            BeforeAllResponse = await request.get('/images/resize?name=goldengate');
        })
        
        it ('image created', () => {
            expect(fs.existsSync(path)).toBeTrue;
        })

        it ('is defined' , () => {
            expect(BeforeAllResponse).toBeDefined;
        })
        it ('width is 300', () => {
            expect(sizeof(path).width).toBe(300);
        })
        it ('height is 300', () => {
            expect(sizeof(path).height).toBe(300);
        })

        it ('first call not from cache', async () => {
            fs.unlinkSync(path)
            console.log(`deleted ${path}`)
            const firstResponse = await request.get('/images/resize?name=goldengate');
            expect(firstResponse.status).toBe(200);
        })

        it ('second call finds file in cache', async () => {
            const secondResponse = await request.get('/images/resize?name=goldengate');
            expect(secondResponse.status).toBe(220);
        })

    })


    describe('/images/resize?name=canon_beach&width=500&height=200&format=png', () => {
        let BeforeAllResponse: Promise<Response> | Response | object
        const path = './assets/thumbs/canon_beach_500x200.png'
        const call = '/images/resize?name=canon_beach&width=500&height=200&format=png'
        beforeAll(async ()=> {
            try {fs.unlinkSync(path)}
            catch (error) {
                // console.error(error)
            }
            BeforeAllResponse = await request.get(call);
        })
        
        it ('image created', () => {
            expect(fs.existsSync(path)).toBeTrue;
        })

        it ('is defined' , () => {
            expect(BeforeAllResponse).toBeDefined;
        })
        it ('width is 500', () => {
            expect(sizeof(path).width).toBe(500);
        })
        it ('height is 200', () => {
            expect(sizeof(path).height).toBe(200);
        })

        it ('first call not from cache', async () => {
            fs.unlinkSync(path)
            console.log(`deleted ${path}`)
            const firstResponse = await request.get(call);
            expect(firstResponse.status).toBe(200);
        })

        it ('second call finds file in cache', async () => {
            const secondResponse = await request.get(call);
            expect(secondResponse.status).toBe(220);
        })

    })
    
})