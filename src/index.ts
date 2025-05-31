import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors"
import { errorHandler } from './middlewares/errorHandler.middlewares';
import { StatusCodes } from './ProjectStatusCodes';
import { ApiResponse } from './utils/ApiResponse.utils';
import { ApiError } from './utils/ApiError.utils';
import dotenv from "dotenv"



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
app.listen(process.env.PORT, () => {
    console.log(process.env.PORT)
  console.log('Server is definetrly running on port 8000');
});
