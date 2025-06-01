import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors"
import { errorHandler } from './middlewares/errorHandler.middlewares';
import { StatusCodes } from './constants/ProjectStatusCodes';
import { ApiResponse } from './utils/ApiResponse.utils';
import { ApiError } from './utils/ApiError.utils';
import dotenv from "dotenv"
import {connectDB} from './db/dataBase.db'



dotenv.config({
    path:'./.env'
})

const app = express();

//Handling Middlewares
const corsOrigin: string = process.env.CORS_ORIGIN || "*"
app.use(cors({
    origin: corsOrigin,
    credentials: true
}))

app.use(express.json({
    limit:"16kb"
}))

app.use(express.urlencoded({
    extended: true,
    limit:"16kb"
}))

app.use(express.static("public"))
app.use(cookieParser())





app.get('/', (req: Request, res: Response) => {
  res.status(StatusCodes.STATUS_CODE_ACCEPTED).json(new ApiResponse(StatusCodes.STATUS_CODE_ACCEPTED,"Done"));
});


app.get('/getError',(req:Request,res:Response,next: NextFunction) => {
    next(new ApiError(StatusCodes.STATUS_CODE_METHOD_NOT_ALLOWED," Case for api error"))
})


app.use(errorHandler)


const PORT= process.env.PORT || 8000;
connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("Error Before listening",error)
        throw error
    })
    app.listen(PORT,()=>{
        console.log("Connected Succefully")
    })
    
})
.catch((error)=>{
    console.log("MongoDB connection failed",error)
})

