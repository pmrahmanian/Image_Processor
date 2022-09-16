import express, { Request, Response} from 'express';
import path from 'path';
import sharp from 'sharp';

const resize = express.Router();

resize.get('/', async(req:Request, res:Response): Promise<void>=> {
    // name is a required query parameter, if not present we exit the method
    if (!req.query.name) {
        res.status(400).send(
            `Make sure to include the image file name as a query parameter.
            To see a list of available images hit the GET /images/peek endpoint.`
        );
        return
    }
    const name = req.query.name as string

    // establish resizing dimensions from user inputs or default values.
    const width:number = req.query.width ? (parseInt(req.query.width as string)) : 300 ;
    const height:number = req.query.height ? (parseInt(req.query.height as string)): 300 ;
    
    // standardize output format for caching
    const thumbName:string = `${name.slice(0, name.lastIndexOf('.'))}_${width}x${height}.jpg`

    // normalize paths for input and output
    const originalPath:string = path.join(__dirname, `../../../assets/originals/${name}`); 
    const thumbpath:string = path.join(__dirname, `../../../assets/thumbs/${thumbName}`);

    // Ensure image exists

    // res.status(404).send(`${name} does not exist on the server`)

    // Check for Cahced image

    // Resize
    try {
        await sharp(originalPath).resize({width:width, height:height}).toFile(thumbpath)
        res.status(200).sendFile(thumbpath)
    } catch (error) {
        console.log(error)
        res.status(500).send('something went wrong resizing this image')
    }




})

export default resize;