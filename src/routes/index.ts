import express, { Request, Response} from 'express';
import placeholder from './images/placeholder';
import resize from './images/resize';
import peek from './images/peek'

const routes = express.Router();

routes.get('/', (req:Request, res:Response)=> {
    res.send('connected to the router');
})

routes.use('/placeholder', placeholder);
routes.use('/resize', resize)
routes.use('/peek', peek)


export default routes;