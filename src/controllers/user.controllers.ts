import { StatusCodes } from "../constants/ProjectStatusCodes";
import { User } from "../models/users.model";
import { ApiError } from "../utils/ApiError.utils";
import { asyncHandler } from "../utils/AsynHandler.utils";

const userRegister = asyncHandler(async(req,res)=>{
    const {
        fullname,
        username,
        email,
        password
    } = req.body
    if(
        [fullname,username,email,password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(StatusCodes.STATUS_CODE_BAD_REQUEST,"Some fields are missing")
    }
    const existedUserCheck = await User.findOne({
        $or:[{username,email}]
    })
    if (existedUserCheck) {

    }
})