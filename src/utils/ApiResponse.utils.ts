import { StatusCodes } from "../constants/ProjectStatusCodes"

export class ApiResponse<T = any > {
    statusCode : StatusCodes;
    success: boolean;
    message: string;
    data: T;

    constructor(
        statusCode: StatusCodes,
        data: T,
        message = "Success"
    ){
        this.statusCode = statusCode;
        this.success = statusCode <400;
        this.message = message;
        this.data = data;
    }
}