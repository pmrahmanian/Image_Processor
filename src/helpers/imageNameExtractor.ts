export default function imageNameExtractor (input:string):string {
    const fullstop:number | undefined = input.lastIndexOf('.')
    if (fullstop>0) return input.slice(0,fullstop)
    else return input
};