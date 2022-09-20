import express, { Request, Response} from 'express';
import path from 'path';
import imageNameExtractor from '../../helpers/imageNameExtractor'
import imageExtensionExtractor from '../../helpers/imageExtensionExtractor'
import fs from 'fs'
import getExtensionFromFormat from '../../helpers/getExtensionFromFormat'
import imageFormatAndResize, {imageTransformReq} from '../../helpers/imageFormatAndResize'

// @REVIEWER : The only way I can get the server to start without an error is to include this type here. It cannot find the declaration from my src/@types/index.d.ts file
// How am I supposed to do this?
type Format = string  & ('jpg' | 'jpeg' | 'png' |'gif')

const resize = express.Router();

resize.get('/', async(req:Request, res:Response): Promise<void>=> {
    /* ----- FATAL ERROR HANDLING ----- */
    // name is a required query parameter, if not present we exit the method
    if (!req.query.name) {
        res.status(400).send(
            `Make sure to include the image file name as a query parameter.
            To see a list of available images hit the GET /images endpoint.`
        );
        return
    }

    /* ----- ESTABLISHING VARIABLES ----- */

    const name: string = imageNameExtractor(req.query.name as string)
    const extension: string = imageExtensionExtractor(req.query.name as string)

    // establish resizing dimensions from user inputs or default values.
    const width:number = req.query.width ? (parseInt(req.query.width as string)) : 300 ;
    const height:number = req.query.height ? (parseInt(req.query.height as string)): 300 ;

    // get output format
    const format:Format =  req.query.format ? req.query.format as Format : 'jpeg';
    
    // standardize output format for caching
    const thumbName:string = `${name}_${width}x${height}${getExtensionFromFormat(format)}`

    // normalize paths for input and output
    const originalPath:string = path.join(__dirname, `../../../assets/originals/${name}${extension}`); 
    const thumbpath:string = path.join(__dirname, `../../../assets/thumbs/${thumbName}`);


    /* ----- ENDPOINT LOGIC AND ERROR HANDLING ----- */

    // Ensure image exists
    let originalImageExists: boolean = fs.existsSync(originalPath);

    if (!originalImageExists) {
        res.status(404).send(`<b>${name+extension}</b> does not exist on the server:<br>
        PATH ${originalPath}`)
        return
    }

    // Check for cahced image and return that is found
    let thumbnailImageExists: boolean = fs.existsSync(thumbpath);
    if (thumbnailImageExists) {
        console.log(`loading ${thumbName} from cache`)
        res.status(220).sendFile(thumbpath)
        return
    }

    // Resize
    try {
        const imageTransformationRequest: imageTransformReq = {
            originalPath,
            format,
            width,
            height,
            thumbpath
        }
        await imageFormatAndResize(imageTransformationRequest)
        console.log(`resized ${name+extension} to ${thumbName}`)
        res.status(200).sendFile(thumbpath)
    } catch (error) {
        console.log(error)
        res.status(500).send('something went wrong resizing this image')
    }

})

export default resize;