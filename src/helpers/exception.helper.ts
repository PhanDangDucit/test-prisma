/**
 * Link reference about status error: https://docs.sentinel.thalesgroup.com/softwareandservices/rms/RMSDocumentation/APIREF/Content/SCL_WS/returnCodes.htm
 */

// type TApiResponseClientError = {
//     [index:number]: string
// }

interface TApiResponseClientError {
    status: number,
    message:string
}
/**
 * Client Error: 400
 */
export const ApiResponseElements:Array<TApiResponseClientError> = [
    /**
     * Status code for cases:
     * 	- User is invalid,
     *  - Customer is invalid
     *  - Invalid parameter: vendorId
     *  - Value of feature name passed in the input parameter is invalid.
     *  - Invalid parameter: featureVersion
     *  - The request XML is not well formed
     *  - license sessionId is invalid
     *  - Value of usage count passed in input parameter is invalid. Valid range is 1 to 2147483647
     *  - Value of unitsRequired passed in input parameter is invalid. Valid range is 1 to 2147483647
     */
    {
        status:400,
        message:"Bad request"
    },
    /**
     * - Request from this vendorID is not supported
     * - Authentication failed. Please check secret key, secret key id, vendor id, and hash computation.
     * - Authorization header not found
     * - x-sfnt-date header not found
     * - Invalid parameter: dateHeader
     * - Authentication Failed due to time mismatch
     */
    {
        status:401,
        message:"Unauthorized"
    },
    /**
     * - Units are not supported with limited concurrency - Per User
     * - Not authorized to process any request
     * - Internal error
     * - License is expired
     * - License is disabled
     * - Maximum concurrent user limit reached
     * - Maximum usage count reached
     * - License does not exist or license is not in active state
     * - Invalid parameter
     * - Session terminated
     * - Access denied to the requested feature
     * - No authorization server mapped to given vendorId
     * - Maximum usage count reached
     */
    {
        status: 403, 
        message: "Forbidden"
    },
    /**
     * - This web service version is not supported
     */
    {
        status:406,
        message: "Not Acceptable"
    },
]
export interface ApiResponseCLientError extends Error {
    status: number,
    message: string
}