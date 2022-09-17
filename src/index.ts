import express, { Request, Response} from 'express';
import routes from './routes/index'
import path from 'path'

const app = express();
const port = 3000;

app.get('/', (req:Request, res:Response)=> {
    // res.send('connected to the root of our api')
    res.status(200).sendFile(path.resolve(__dirname, '../README.md'));
})

app.use('/images', routes)

app.listen(port, (): void => {
	console.log(`server running on  http://localhost:${port}`);
});

export default app;