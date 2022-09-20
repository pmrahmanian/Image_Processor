// import sharp from '../node_modules/@types/sharp'

// namespace sharp {
//     interface SharpOptions {
//         // ADDED THIS
//         // TODO Extend this into src project
//         /** Describes a new text image to be created. */
//         text?: Text | undefined;
//     }

//     export interface TextObject {
//         text: Text
//     }

//     interface OverlayOptions {
//         //     /** Buffer containing image data, String containing the path to an image file, or Create object  */
//         //     // TODO add this modification to include text to src project
//         //     // input?: string | Buffer | {text: Text} | undefined;
//             // input: {text: Text};
//         input: sharp.OverlayOptions.input | {TextObject};
//     }

//     // ADDED THIS
//     // TODO extend this into src project
//     interface Text {
//         text: string;
//         font?: string;
//         fontfile?: string;
//         /** Number of pixels wide. */
//         width: number;
//         /** Number of pixels high. */
//         height: number;
//         align?: string;
//         justify?: boolean;
//         rgba?: boolean;
//     }
// }