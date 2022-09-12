import express, { Request, Response} from 'express';
import path from 'path';

const placeholder = express.Router();

placeholder.get('/', (req:Request, res:Response)=> {

    // res.send('get placeholder image');
    res.sendFile(path.join(__dirname, '../../images/originals/goldengate.jpg'))
})

export default placeholder;