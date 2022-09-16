import {getRGBValue, getAlphaValue, getRandomRGB, isLightColor} from '../../helpers/colorHelpers'

function rgbNumber() {
    return {
    asymmetricMatch: function(n: number) {
        return typeof n === 'number' && n >=0 && n <= 255;
    },
    jasmineToString: function () {
        return `<a number between 0 and 255>`
    }
}}

function rgbaAlphaValue() {
    return {
    asymmetricMatch: function(n:number) {
        return ((typeof n === 'number' && n >=0 && n <= 1))
    },
    jasmineToString: function () {
        return `<alpha number between 0 and 1>`
    }
}}

describe('Testing Color Helper Methods', ():void => {

    describe('Testing getRGBValue helper function', (): void => {
        it('check output type to be number', () => {
            expect(typeof getRGBValue('5')).toEqual('number')
        })

        it('check return value for non numerical string', () => {
            expect(getRGBValue('apple')).toEqual(0)
        })

        it('check return for negative input', () => {
            expect(getRGBValue('-75')).toEqual(0)
        })

        it('check return for > 255 input', () => {
            expect(getRGBValue('355')).toEqual(255)
        })

        it('check return for proper input', () => {
            expect(getRGBValue('76')).toEqual(76)
        })
    })

    describe('Testing getRandomRGB helper function', ():void => {
        const returnColor = getRandomRGB(1)
        
        it('check proper formating of rgba color object', ()=> {
            expect(returnColor).toEqual(jasmine.objectContaining({
                r: rgbNumber(),
                g: rgbNumber(),
                b: rgbNumber(),
                alpha: rgbaAlphaValue()
            }))
        })
    })

    describe('Testing getAlphaValue helper function', ():void => {
        
        it('check output type to be number', () => {
            expect(typeof getAlphaValue('0.5')).toEqual('number')
        })

        it('check return value for non numerical string', () => {
            expect(getAlphaValue('apple')).toEqual(1)
        })

        it('check return for negative input', () => {
            expect(getAlphaValue('-75')).toEqual(0)
        })

        it('check return for > 1 input', () => {
            expect(getAlphaValue('355')).toEqual(1)
        })

        it('check return for proper input', () => {
            expect(getAlphaValue('0.5')).toEqual(0.5)
        })
    })


    describe('Testing isLightColor helper function', ():void => {
        it('check white', ()=> {
            expect(isLightColor({r: 255, g: 255,b: 255, alpha:1})).toBeTrue
        })

        it('check black', ()=> {
            expect(isLightColor({r: 0, g: 0,b: 0, alpha:1})).toBeFalse
        })

        it('check navy blue', ()=> {
            expect(isLightColor({r: 0, g: 0,b: 100, alpha:1})).toBeFalse
        })

        it('check yellow', ()=> {
            expect(isLightColor({r: 255, g: 255,b: 0, alpha:1})).toBeTrue
        })

    })
})