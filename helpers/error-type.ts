export namespace TError {
    export interface ServerError {
        NotFound: {
            statusCode: 404,
            message: "Not found"
        },
    }
    export interface ClientError {}
}

// export enum ResponseStatus {
//     Success = 200,
//     BadRequest = 400,
//     Unauthorized = 401,
//     NotFound = 404,
//     Forbidden = 403,
//     MethodNotAllowed = 405,
//     NotAcceptable = 406,
//     RequestTimeout = 408,
//     Conflict = 409,
//     Gone = 410,
//     PreconditionFailed = 412,
//     PayloadTooLarge = 413,
//     UnsupportedMediaType = 415,
//     ImATeapot = 418,
//     UnprocessableEntity = 422,
//     InternalServerError = 500,
//     NotImplemented = 501,
//     BadGateway = 502,
//     ServiceUnavailable = 503,
//     GatewayTimeout = 504,
//     HttpVersionNotSupported = 505,
//   }