export default function imageExtensionExtractor (input:string):string {
    const fullstop:number | undefined = input.lastIndexOf('.')
    if (fullstop) return input.slice(fullstop)
    else return '.jpg'
};