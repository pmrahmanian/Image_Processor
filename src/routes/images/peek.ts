import express, {Request, Response} from 'express';
import path from 'path';
import fs from 'fs/promises';


const peek = express.Router();

peek.get('/', async(req: Request, res:Response): Promise<void> => {

    const directoryPath = path.resolve(__dirname, '../../../assets/originals')
    const files = await fs.readdir(directoryPath).catch((error)=> {
        res.status(500).send(`Trouble reading files from the server: ${error}`)
        console.error(error)
        return null;
    })

    if (!files) {
        res.status(200).send('no images on server')
        return
    }


    let images = ''

    // files.forEach(file => images+= `<li><img src='${path.join(directoryPath, file)}' >${file}</li>`)
    files.forEach(file => images+= `<li>${file}</li>`)


    const html = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
        </head>
        <body>
            <h1>Available Images On Server</h1>
            <p>You can use any of these images with the resize endpoint: /images/resize </p>
            <ul>
                ${images}
            </ul> 
        </body>
    </html>
    `
    // await fs.writeFile(path.normalize(path.join(__dirname, 'index.html')), html)

    // res.status(200).sendFile(path.normalize(path.join(__dirname, 'index.html')))
    res.status(200).send(html)

})

export default peek;