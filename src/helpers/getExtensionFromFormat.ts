export default function getExtensionFromFormat (format:string) {
    switch (format) {
        case 'jpeg':
            return '.jpg';
        case 'jpg':
            return '.jpg';
        case 'png':
            return '.png';
        case 'gif':
            return '.gif';
        default:
            return '.jpg'
    }
    
}