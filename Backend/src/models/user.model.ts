import { Schema,Document, model } from "mongoose";
import { User } from "../types/tenant.types";

const UserSchema = new Schema<User & Document>({
    email: {type: String, required:true,index:true},
    role:{type: String,enum:['member','admin','owner'],default:'member'},
    authProviderId:{type: String,required:true,unique:true},
    lastLogin:Date,
},{timestamps:true})

/*
Making a compound index for user and tenant
MongoDB ensures that the pair { tenantId, email } is unique.
*/
UserSchema.index(
    {
        tenantId:1,
        email:1
    },
    {
        unique:true
    }
);

export const UserModel = model<User & Document>('User',UserSchema);
