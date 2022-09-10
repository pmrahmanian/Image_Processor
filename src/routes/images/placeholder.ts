import express, { Request, Response} from 'express';

const placeholder = express.Router();

placeholder.get('/', (req:Request, res:Response)=> {
    res.send('get placeholder image');
})

export default placeholder;