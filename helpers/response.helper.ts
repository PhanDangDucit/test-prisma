/**
 * @desc handle try catch errors
 * @param {any} cb - callback is used to handle actions related to data
 * @returns 
 */
export const catchError = (cb: any) => {
    try {
        return cb();
    } catch (error) {
        return {error};
    }
}