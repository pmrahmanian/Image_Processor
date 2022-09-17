import imageExtensionExtractor from '../../helpers/imageExtensionExtractor'

describe ('Testing Image Extension Extractor Helper Method', ():void => {
    it('default extension from naked name',  () => {
        expect(imageExtensionExtractor('goldengate')).toEqual('.jpg')
    })

    it('goldengate.jpg',  () => {
        expect(imageExtensionExtractor('goldengate.jpg')).toEqual('.jpg')
    })

    it('randomName.png',  () => {
        expect(imageExtensionExtractor('randomName.png')).toEqual('.png')
    })

    it('testing.gif',  () => {
        expect(imageExtensionExtractor('testing.gif')).toEqual('.gif')
    })

    it('testing multiple extensions',  () => {
        expect(imageExtensionExtractor('testing.jpg.gif')).toEqual('.gif')
    })


})