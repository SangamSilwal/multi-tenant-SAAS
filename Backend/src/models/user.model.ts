import { Schema,Document, model } from "mongoose";
import { User } from "../types/tenant.types";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const UserSchema = new Schema<User & Document>({
    name:{
        type:String,
        required:[true,"Name is Required"]
    },
    email:{
        type:String,
        required:[true,"Email is Required"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    tenantID:{
        type: Schema.Types.ObjectId,
        ref:'Tenant',
        default:null
    },
    role:{
        type:String,
        enum:['member','admin','owner',null],
        default:null
    },
    verificationToken:{
        type:String
    },
    verificationTokenExpires:{
        type:Date
    },
    isVerified:{
        type:Boolean
    },
    accessToken:{
        type:String
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})



UserSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
})


UserSchema.methods.isPasswordCorrect = async function(password:string)
{
    return await bcrypt.compare(password,this.password)
}


interface TokenPayload {
    _id: string;
    name?: string;
    email?: string;
}
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET!;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET!;

UserSchema.methods.genrateAccessToken = function():string {
    const payload:TokenPayload = {
        _id:this._id,
    };

    if(this.name) payload.name = this.name;
    if(this.email) payload.email = this.email;

    if(!process.env.ACCESS_TOKEN_SECRET)
    {
        throw new Error("Access Token is not Defined")
    }
    return jwt.sign(
        payload,
        accessTokenSecret,
        {
            expiresIn: '1hr'
        }
    );
};

UserSchema.methods.genrateRefreshToken = function():string {
    const payload:TokenPayload = {
        _id:this._id,
    };

    if(this.name) payload.name = this.name;
    if(this.email) payload.email = this.email;

    if(!process.env.REFRESH_TOKEN_SECRET)
    {
        throw new Error("Access Token is not Defined")
    }
    return jwt.sign(
        payload,
        refreshTokenSecret,
        {
            expiresIn: '1hr'
        }
    );
};

UserSchema.methods.generateToken= function():string{
    return Math.floor(10000 +Math.random()*90000).toString();
}


export const UserModel = model<User & Document>('User',UserSchema);
