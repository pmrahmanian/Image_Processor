import express, { Request, Response} from 'express';
const app = express();
const port = 3000;

app.get('/', (req:Request, res:Response)=> {
    res.send('connected to the root api')
})

app.listen(port, (): void => {
	console.log(`server running on  http://localhost:${port}`);
});
