import { ObjectId } from "mongoose";

export interface Tenant {
    _id: ObjectId;
    name: string;
    slug: string;
    plan : 'free' | 'pro' | 'enterprise';
    billingID ?: string;
    status: 'active' | 'suspended' | 'pending',
    settings: {
        theme?: 'light' | 'dark';
        timezone ?: string;
        features : {
            analytics?: boolean;
            customDomain?: boolean;
        };
    };
    createdAt ?: Date;
    updatedAt ?: Date;
}

export interface User {
    _id: ObjectId;
    name:string;
    email : string;
    password:string;
    tenantID: ObjectId | null;
    role: 'member' | 'admin' | 'owner'|null;
    isVerified:boolean;
    verificationToken:string;
    verificationTokenExpires:Date;
    accessToken:string;
    refreshToken:string;
    lastLogin?: Date;
    createdAt ?: Date;
    updatedAt ?: Date;
}

export interface Project {
    _id: ObjectId;
    tenantId: ObjectId;
    name: string;
    status : 'draft' | 'active' | 'archived';
    members : ObjectId[];
    metaData?: Record<string,unknown>;
    createdAt ?: Date;
    updatedAt ?: Date;
}

export interface Invite {
    _id: ObjectId;
    email: string;
    tenantId: ObjectId;
    role: 'member'|'admin';
    token: string;
    expiresAt : Date;
    status : 'pending'|'accepted'|'expired';
    createdAt ?: Date;
    updatedAt ?: Date;
}
