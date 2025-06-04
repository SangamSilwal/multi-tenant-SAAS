import { ObjectId } from "mongoose";

export interface Tenant {
    _id: ObjectId;
    name: string;
    slug: string;
    createdAt: Date;
    plan : 'free' | 'pro' | 'enterprise';
    billingID ?: string;
    settings: {
        theme?: 'light' | 'dark';
        timezone ?: string;
        features : {
            analytics?: boolean;
            customDomain?: boolean;
        };
    };
}

export interface User {
    _id: ObjectId;
    tenantId : ObjectId;
    email : string;
    role: 'member' | 'admin' | 'owner';
    authProviderId: string;
    lastLogin?: Date;
}

export interface Project {
    _id: ObjectId;
    tenantId: ObjectId;
    name: string;
    status : 'draft' | 'active' | 'archived';
    members : string[];
    createdAt: Date;
    metaData?: Record<string,unknown>;
}

