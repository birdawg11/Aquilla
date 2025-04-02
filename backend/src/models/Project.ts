import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: 'Planning' | 'In Progress' | 'On Hold' | 'Completed' | 'Cancelled';
  client: string;
  projectManager: string;
  teamMembers: string[];
  budget: {
    total: number;
    spent: number;
    remaining: number;
  };
  location: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['Planning', 'In Progress', 'On Hold', 'Completed', 'Cancelled'],
    default: 'Planning'
  },
  client: { type: String, required: true },
  projectManager: { type: String, required: true },
  teamMembers: [{ type: String }],
  budget: {
    total: { type: Number, required: true },
    spent: { type: Number, default: 0 },
    remaining: { type: Number, required: true }
  },
  location: { type: String, required: true },
  type: { type: String, required: true }
}, {
  timestamps: true
});

export default mongoose.model<IProject>('Project', ProjectSchema); 