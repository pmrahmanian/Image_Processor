export interface Color {
    r: number,
    g: number,
    b: number,
    alpha: number
}

export function getRGBValue (input:string):number {
    let value = parseInt(input)
    if (!value) return 0;
    if (value > 255) value = 255;
    if (value < 0) value = 0;
    return value
}

export function getAlphaValue (input:string):number {
    let value = parseFloat(input)
    if (!value) return 1;
    if (value > 1) value = 1;
    if (value < 0) value = 0;
    return value
}

export function getRandomRGB(alpha:number):Color {
    return {
        r: Math.floor(Math.random() * 255),
        g: Math.floor(Math.random() * 255),
        b: Math.floor(Math.random() * 255),
        alpha: alpha
    }
}

export function isLightColor (color:Color) {
    const {r, g, b} = color;

    // referenced from https://awik.io/determine-color-bright-dark-using-javascript/
    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    const hsp = Math.sqrt(
        0.299*(r*r) +
        0.587*(g*g) +
        0.114*(b*b)
    )
    return hsp > 127.5
}

export const lightColor = 'white';

export const darkColor = 'black';