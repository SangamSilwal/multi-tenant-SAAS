import { StatusCodes } from "../constants/ProjectStatusCodes";
import { ApiError } from "../utils/ApiError.utils";
import { ApiResponse } from "../utils/ApiResponse.utils";
import { UserModel } from "../models/user.model";
import { asyncHandler } from "../utils/AsynHandler.utils";

const userRegistration = asyncHandler(async(req,res) => {
    const {
        name,
        email,
        password
    } = req.body;
    if(
        [name,email,password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(StatusCodes.STATUS_CODE_BAD_REQUEST,"Some Field are Missing")
    }
    const existedUserCheck = await UserModel.findOne({
        email:email
    })
    if(existedUserCheck){
        throw new ApiError(StatusCodes.STATUS_CODE_CONFLICT,"User with the email already exists")
    }

})
