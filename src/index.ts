import express, { Request, Response} from 'express';
import routes from './routes/index'
const app = express();
const port = 3000;

app.get('/', (req:Request, res:Response)=> {
    res.send('connected to the root of our api')
})

app.use('/images', routes)

app.listen(port, (): void => {
	console.log(`server running on  http://localhost:${port}`);
});

export default app;