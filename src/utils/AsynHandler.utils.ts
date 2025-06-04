import { Request,Response,NextFunction,RequestHandler } from "express";

type AsyncHandler = (req: Request,res: Response, next:NextFunction) => Promise<any>

export const asyncHandler = (fn:AsyncHandler):RequestHandler => {
    return(req,res,next)=>{
        fn(req,res,next).catch(next);
    }
}