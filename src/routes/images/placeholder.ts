import express, { Request, Response} from 'express';
import path from 'path';
import sharp from 'sharp';

const placeholder = express.Router();

placeholder.get('/', async (req:Request, res:Response)=> {
    const width = req.query.width ? (parseInt(req.query.width as string)) as number : 300;
    const height = req.query.height ? (parseInt(req.query.height as string)) as number : 300;
    const text = req.query.text ? req.query.text as string : "Image Coming Soon...";
    // res.send('get placeholder image');
    // res.sendFile(path.join(__dirname, '../../images/originals/goldengate.jpg'))
    
    await sharp({
        create: {
            width: width,
            height: height,
            channels: 3,
            background: 'blue'
        }
    }).composite([
        { input: {
            text: {
                text: `<span foreground="green">${text}</span>`,
                width: width-20, // max width
                height: height-20, // max height
                font: 'futura',
                justify: true,
                align: 'center',
                rgba: true,
            }
        },
        blend: 'over'
    }
    ]).toFile(path.join(__dirname, '../../../images/originals/text_bw4.png'));
})

export default placeholder;