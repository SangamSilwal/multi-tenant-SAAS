import {Schema,model,Document} from "mongoose"
import {Tenant} from "../types/tenant.types"


const TenantSchema = new Schema<Tenant & Document>({
    name: {type:String,required:true},
    slug: {type: String,required:true,unique:true},
    plan: {type: String,enum: ['free','pro','enterprise'],default:'free'},
    billingID: String,
    settings: {
        theme: {type: String,enum:['light','dark'],default:'light'},
        timezone:{type: String, default: 'UTC'},
        features:{
            analytics: {type: Boolean,default: false},
            customDomain: {type: Boolean,default: false},
        }
    }
},{timestamps: true});

export const TenantModel = model<Tenant &  Document>('Tenant',TenantSchema);
