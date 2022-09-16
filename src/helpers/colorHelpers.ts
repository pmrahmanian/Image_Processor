export interface Color {
    r: number,
    g: number,
    b: number,
    a?: number | undefined
}

export function getRGBvalue (input:string):number {
    let value = parseInt(input)
    if (!value) return 0;
    if (value > 255) value = 255;
    if (value < 0) value = 0;
    return value
}

export function getRandomRGB():Color {
    return {
        r: Math.floor(Math.random() * 255),
        g: Math.floor(Math.random() * 255),
        b: Math.floor(Math.random() * 255),
    }
}

export function islightColor (color:Color) {
    const {r, g, b} = color;
    const hsp = Math.sqrt(
        0.299*(r*r) +
        0.587*(g*g) +
        0.114*(b*b)
    )
    return hsp > 127.5
}

export const lightColor = 'white';

export const darkColor = 'black';