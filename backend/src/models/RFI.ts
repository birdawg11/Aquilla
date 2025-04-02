import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IRFI extends Document {
  rfiNumber: string;
  projectId: string;
  title: string;
  description: string;
  status: 'open' | 'closed' | 'pending' | 'Answered';
  priority: 'low' | 'medium' | 'high';
  assignedTo: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  attachments: string[];
  responses: {
    text: string;
    createdBy: string;
    createdAt: Date;
  }[];
  comments: {
    text: string;
    createdBy: string;
    createdAt: Date;
  }[];
  generateRFINumber(): Promise<string>;
}

const RFISchema = new Schema({
  rfiNumber: { type: String, required: true, unique: true },
  projectId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['open', 'closed', 'pending', 'Answered'],
    default: 'open'
  },
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  assignedTo: { type: String, required: true },
  createdBy: { type: String, required: true },
  dueDate: { type: Date },
  attachments: [{ type: String }],
  responses: [{
    text: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }],
  comments: [{
    text: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

// Static method to generate RFI number
RFISchema.statics.generateRFINumber = async function(projectId: string): Promise<string> {
  const timestamp = Date.now().toString().slice(-4);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `RFI-${projectId}-${timestamp}-${random}`;
};

// Pre-save middleware to generate RFI number
RFISchema.pre('save', async function(next) {
  if (!this.isModified('rfiNumber')) {
    try {
      this.rfiNumber = await (this.constructor as any).generateRFINumber(this.projectId);
      next();
    } catch (error) {
      next(error as Error);
    }
  } else {
    next();
  }
});

const RFI = mongoose.model<IRFI>('RFI', RFISchema);

export default RFI; 