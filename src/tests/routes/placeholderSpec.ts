import supertest from 'supertest';
import app from '../../index';
import fs from 'fs'
import sizeof from 'image-size'

const request = supertest(app);

describe ('GET /images/placeholder Endpoint', ()=> {
    
    describe('/images/placeholder', () => {
        let BeforeAllResponse: unknown

        beforeAll(async ()=> {
            BeforeAllResponse = await request.get('/images/placeholder');
        }) 

        it ('is defined' , () => {
            expect(BeforeAllResponse).toBeDefined;
        })
        it ('image created', () => {
            expect(fs.existsSync('./assets/placeholders/placeholder.png')).toBeTrue;
        })

    })


    describe('/images/placeholder?name=CanIGetaName&width=400&height=500', () => {
        let BeforeAllResponse: unknown
        const path = './assets/placeholders/CanIGetaName.png'

        beforeAll(async ()=> {
            BeforeAllResponse = await request.get('/images/placeholder?name=CanIGetaName&width=400&height=500');
        }) 

        it ('is defined' , () => {
            expect(BeforeAllResponse).toBeDefined;
        })
        it ('image created', () => {
            expect(fs.existsSync(path)).toBeTrue;
        })
        it ('width is 400', () => {
            expect(sizeof(path).width).toBe(400);
        })
        it ('height is 500', () => {
            expect(sizeof(path).height).toBe(500);
        })



    })
    
})