// class PostUtils {
    
// }

/**
 * Process content addition when string contents are html tags block
 * @param str 
 * @returns
 */
export function processContentAddition(str:string, len: number) {
    // slicing string from the first <p> to the last </p> suite condition which is required
    const strSliced = processSlice(str, str.search('<p>'), str.search('</p>') + 4);

    // slicing strSliced from 0 to len
    const strWithLength = processSlice(strSliced, 0, len);

    // search position of the last space in strWithLength
    const lastSpace = processSearchLastCharacter(strWithLength, ' ');
    let index;
    if(lastSpace == -1) index = getLengthArrayOrString(strSliced);
    index = lastSpace;

    // slicing strSlice from 0 to the last space
    return processSlice(strSliced, 0, index) + '...';
}

/**
 * Process content addition is only string
 * @param str
 * @param len
 * @returns
 */
export function processStringContentAddition(str:string, len: number) {
    if(str.length < len) {
        return str;
    }
    const strSliced = processSlice(str, 0, len);
    const lastSpace = processSearchLastCharacter(strSliced, ' ');
    return processSlice(strSliced, 0, lastSpace) + '...';
}

/**
 * Get length of string
 * @param str 
 * @returns 
 */
export function getLengthArrayOrString(str:string) {
    return str.length
}

/**
 * Slices a string to return a string which has content from "start" to "end"
 * @param str 
 * @param start 
 * @param end 
 * @returns 
 */
export function processSlice(str:string, start:number, end:number) {
    return str.slice(start, end);
}

/**
 * Process search last character
 * @param str 
 * @param character 
 * @returns 
 */
export function processSearchLastCharacter(str: string, character: string) {
    return str.lastIndexOf(character);
}

type QueryType = number | string;

/**
 * Check if type of a query is number
 * @param q 
 * @returns 
 */
export function isNumber(q: QueryType) {
    const isNumber = Number(q);
    if(isNaN(isNumber)) return false;
    return true;
}
