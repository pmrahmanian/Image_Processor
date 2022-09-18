import getExtensionFromFormat from '../../helpers/getExtensionFromFormat'

describe ('Testing getExtensionFromFormat Helper Method', ():void => {
    it('jpeg',  () => {
        expect(getExtensionFromFormat('jpeg')).toEqual('.jpg')
    })

    it('jpg',  () => {
        expect(getExtensionFromFormat('jpg')).toEqual('.jpg')
    })

    it('png',  () => {
        expect(getExtensionFromFormat('png')).toEqual('.png')
    })

    it('gif',  () => {
        expect(getExtensionFromFormat('gif')).toEqual('.gif')
    })

    it('default',  () => {
        expect(getExtensionFromFormat('ThisStringShouldTriggerDefault')).toEqual('.jpg')
    })

})