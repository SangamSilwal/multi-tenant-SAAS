import { Request,Response,NextFunction } from "express";
import { ApiError } from "../utils/ApiError.utils";
import { StatusCodes } from "../ProjectStatusCodes";
import { ErrorRequestHandler } from "express";

export const errorHandler:ErrorRequestHandler = (
    err: Error | ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err);

    if(err instanceof ApiError){
        res.status(err.statusCode).json({
            statusCode:err.statusCode,
            success: err.success,
            message: err.message,
        }); 
        return ;
    }
    res.status(500).json({
            StatusCodes:500,
            success: false,
            message:`Internal Server Error. Something Went Wrong`
        });
}