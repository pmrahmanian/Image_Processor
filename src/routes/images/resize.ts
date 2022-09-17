import express, { Request, Response} from 'express';
import path from 'path';
import sharp from 'sharp';
import imageNameExtractor from '../../helpers/imageNameExtractor'
import imageExtensionExtractor from '../../helpers/imageExtensionExtractor'
import fs from 'fs'

function getExtension (format:string) {
    switch (format) {
        case 'jpeg':
            return '.jpg';
        case 'png':
            return '.png';
        case 'gif':
            return '.gif';
        default:
            return '.jpg'
    }
    
}

type Format = string  & ('jpg' | 'jpeg' | 'png' |'gif')

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

    const name: string = imageNameExtractor(req.query.name as string)
    const extension: string = imageExtensionExtractor(req.query.name as string)

    // establish resizing dimensions from user inputs or default values.
    const width:number = req.query.width ? (parseInt(req.query.width as string)) : 300 ;
    const height:number = req.query.height ? (parseInt(req.query.height as string)): 300 ;

    // get output format
    const format:Format =  req.query.format ? req.query.format as Format : 'jpeg';
    
    // standardize output format for caching
    const thumbName:string = `${name}_${width}x${height}${getExtension(format)}`

    // normalize paths for input and output
    const originalPath:string = path.join(__dirname, `../../../assets/originals/${name}${extension}`); 
    const thumbpath:string = path.join(__dirname, `../../../assets/thumbs/${thumbName}`);

    // Ensure image exists
    let originalImageExists: boolean = fs.existsSync(originalPath);

    if (!originalImageExists) {
        res.status(404).send(`<b>${name+extension}</b> does not exist on the server:<br>
        PATH ${originalPath}`)
        return
    }

    // Check for Cahced image
    let thumbnailImageExists: boolean = fs.existsSync(thumbpath);
    if (thumbnailImageExists) {
        console.log(`loading ${thumbName} from cache`)
        res.status(200).sendFile(thumbpath)
        return
    }

    // Resize
    try {
        await sharp(originalPath).toFormat(format).resize({width:width, height:height}).toFile(thumbpath)
        console.log(`resized ${name+extension} to ${thumbName}`)
        res.status(200).sendFile(thumbpath)
    } catch (error) {
        console.log(error)
        res.status(500).send('something went wrong resizing this image')
    }




})

export default resize;