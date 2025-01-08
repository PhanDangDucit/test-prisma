/**
 * @desc handle try catch errors
 * @param {any} cb - callback is used to handle actions related to data
 * @returns 
 */
export const catchError = async (cb: any) => {
    try {
        return await cb;
    } catch (error) {
        console.log("==============")
        console.log(error);
        return {error};
    }
}