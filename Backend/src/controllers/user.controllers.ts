import { StatusCodes } from "../constants/ProjectStatusCodes";
import { ApiError } from "../utils/ApiError.utils";
import { ApiResponse } from "../utils/ApiResponse.utils";
import { UserModel } from "../models/user.model";
import { asyncHandler } from "../utils/AsynHandler.utils";
import { oauth2client } from "../config/googleConfig";
import axios from "axios";

const userRegistartion = asyncHandler(async(req,res) => {
    const {code} = req.query as string;
    const googleRes = await oauth2client.getToken(code);
    oauth2client.setCredentials(googleRes.tokens);
    const userRes = await axios.get(
        `https:/www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    )
    const {email,name} = userRes.data;
    

})