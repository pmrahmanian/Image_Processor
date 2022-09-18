import fs from 'fs'
import sizeof from 'image-size'
import imageFormatAndResize, {imageTransformReq} from '../../helpers/imageFormatAndResize';


describe('Testing imageFormatAndResize helper method', () => {

    const ogPath = './assets/originals/canon_beach.jpg'
    const outpath = './assets/thumbs/canon_beach_900x600.gif'


    const imageTransformRequest: imageTransformReq = {
        originalPath: ogPath,
        format: 'gif',
        width: 900,
        height: 600,
        thumbpath: outpath
    }

    beforeAll(async ()=> {
        try {fs.unlinkSync(outpath)}
        catch (error) {
            // console.error(error)
        }
        await imageFormatAndResize(imageTransformRequest)
    })
    
    it ('thumbnail created', () => {
        expect(fs.existsSync(outpath)).toBeTrue;
    })

    it ('proper width', () => {
        expect(sizeof(outpath).width).toBe(900);
    })
    it ('proper height', () => {
        expect(sizeof(outpath).height).toBe(600);
    })

})