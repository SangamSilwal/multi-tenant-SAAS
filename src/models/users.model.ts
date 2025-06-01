import mongoose, {Document,Schema,model} from "mongoose";
import bcrypt from "bcrypt"
import { NextFunction } from "express";
import jwt, { SignOptions } from "jsonwebtoken";

export interface User extends Document {
    fullname: string;
    username: string;
    email: string;
    profilePic: string;
    password: string;
    refreshtoken: string
}


const userSchema: Schema<User> = new Schema(
    {
        fullname:{type:String,required:[true,"Name is required"]},
        username:{type:String,required:[true,"Username is Required"]},
        email:{type:String,required:[true,"Email is required"]},
        profilePic:{type:String,default:""},
        password:{type:String,required:[true,"Password is required"]},
        refreshtoken:{type:String}
    },
    {
        timestamps:true
    }
)


//Hashing the passsword before saving it to DataBase
userSchema.pre<User>("save",async function(next){
    if (!this.isModified("password")) return next();
    try {
        this.password = await bcrypt.hash(this.password,10);
        next()
    } catch (error) {
        next(error as Error)
    }
});

//-->Checking if the hash password is correct or not
userSchema.methods.isPasswordCorrect = async function(password:string): Promise<boolean>
{
    return bcrypt.compare(password,this.passed)
};

//Generating the Access Token
userSchema.methods.generateAccessToken = async function():Promise<string>{
    const payload = {
        _id:this._id,
        fullname:this.fullName,
        username:this.username,
        email:this.email
    };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const expiresIn= process.env.ACCESS_TOKEN_EXPIRY;
    if (!secret){
        throw new Error("Access Token is not Defined")
    }
    const options: SignOptions = {}
    if(expiresIn){
        options.expiresIn = Number(expiresIn);
    }
    return jwt.sign(payload,secret,options)
}

//--->Generating the refresh token
userSchema.methods.generateRefreshToken = async function():Promise<string>{
    const payload = {
        _id:this._id
    };
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const expiresIn= process.env.REFRESH_TOKEN_EXPIRY;
    if (!secret){
        throw new Error("Refresh Token is not Defined")
    }
    const options: SignOptions = {}
    if(expiresIn){
        options.expiresIn = Number(expiresIn);
    }
    return jwt.sign(payload,secret,options)
}

export const User = model<User>("User",userSchema)