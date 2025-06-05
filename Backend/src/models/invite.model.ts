import {Schema,model,Document} from "mongoose"
import { Invite } from "../types/tenant.types";

const InviteSchema = new Schema<Invite & Document>({
  email: { type: String, required: true },
  tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true },
  role: { type: String, enum: ['member', 'admin'], default: 'member' },
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'expired'], 
    default: 'pending' 
  }
}, { timestamps: true });

export const InviteModel = model<Invite & Document>('Invite', InviteSchema);