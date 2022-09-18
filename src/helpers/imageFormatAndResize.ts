import sharp from 'sharp'

type Format = string  & ('jpg' | 'jpeg' | 'png' |'gif')

export interface imageTransformReq {
    originalPath: string,
    format: Format,
    width: number,
    height: number,
    thumbpath: string
}

export default async function imageFormatAndResize (
    imageTransformRequest: imageTransformReq
):Promise<void> {
    const {
        originalPath,
        format,
        width,
        height,
        thumbpath
    } = imageTransformRequest
    await sharp(originalPath).toFormat(format).resize({width:width, height:height}).toFile(thumbpath)
}