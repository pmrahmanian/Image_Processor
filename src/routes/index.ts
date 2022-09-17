import express, { Request, Response} from 'express';
import placeholder from './images/placeholder';
import resize from './images/resize';
import peek from './images/peek'

const routes = express.Router();

routes.use('/placeholder', placeholder);
routes.use('/resize', resize)
routes.use('/', peek)


export default routes;