import express, { Request, Response} from 'express';
import path from 'path';
import sharp from 'sharp';
import {Color, getRGBValue, getRandomRGB, isLightColor, lightColor, darkColor} from '../../helpers/colorHelpers'

const placeholder = express.Router();

placeholder.get('/', async (req:Request, res:Response)=> {
    const width = req.query.width ? (parseInt(req.query.width as string)) as number : 300 as number;
    const height = req.query.height ? (parseInt(req.query.height as string)) as number : 300 as number;
    const text = req.query.text ? req.query.text as string : "Image Coming Soon...";
    const r = req.query.r ? getRGBValue(req.query.r as string) as number: 0 as number;
    const g = req.query.g ? getRGBValue(req.query.g as string) as number: 0 as number;
    const b = req.query.b ? getRGBValue(req.query.b as string) as number: 0 as number;
    const color = (r || g || b) ? {r:r, g:g, b:b} : getRandomRGB();
    const textcolor = isLightColor(color) ? darkColor : lightColor;
    const name = req.query.name ? req.query.name as string : 'placeholder';
    const filepath = path.join(__dirname, `../../../images/placeholders/${name}.png`);
    
    await sharp({
        create: {
            width: width,
            height: height,
            channels: 3,
            background: color
        }
    }).composite([
        { input: {
            text: {
                text: `<span foreground="${textcolor}">${text}</span>`, //using pango markup to set text color
                width: width-40, // max width
                height: height-20, // max height
                font: 'futura', 
                justify: true,
                align: 'center',
                rgba: true,
            }
        },
        blend: 'over'
    }
    ]).toFile(filepath);
    res.status(200).sendFile(filepath);
})

export default placeholder;