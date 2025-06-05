import { model, Schema } from "mongoose";
import { Project } from "../types/tenant.types";

const ProjectSchema = new Schema<Project & Document>({
    tenantId: {type: Schema.Types.ObjectId,ref:'Tenant',required:true},
    name: {type : String,required: true},
    status: {
        type: String,
        enum: ['draft','active','archived'],
        default:'draft'
    },
    members: [{type: Schema.Types.ObjectId,ref:'User'}],
    metaData: Schema.Types.Mixed,
},{timestamps:true});

ProjectSchema.index({tenantId:1,status:1});

export const ProjectModel  = model<Project & Document>('Project',ProjectSchema);
