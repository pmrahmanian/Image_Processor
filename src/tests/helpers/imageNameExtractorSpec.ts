import imageNameExtractor from '../../helpers/imageNameExtractor'

describe ('Testing Image Name Extractor Helper Method', ():void => {
    it('no extension name',  () => {
        expect(imageNameExtractor('goldengate')).toEqual('goldengate')
    })

    it('goldengate.jpg',  () => {
        expect(imageNameExtractor('goldengate.jpg')).toEqual('goldengate')
    })

    it('goldengate.jpeg',  () => {
        expect(imageNameExtractor('goldengate.jpeg')).toEqual('goldengate')
    })

    it('randomName.png',  () => {
        expect(imageNameExtractor('randomName.png')).toEqual('randomName')
    })

    it('testing.gif',  () => {
        expect(imageNameExtractor('testing.gif')).toEqual('testing')
    })

    it('testing multiple fullstops',  () => {
        expect(imageNameExtractor('testing.multiple.gif')).toEqual('testing.multiple')
    })


})