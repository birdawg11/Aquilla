import mongoose, { Schema, Document } from 'mongoose';

export interface IRFI extends Document {
  projectId: mongoose.Types.ObjectId;
  rfiNumber: string;
  title: string;
  description: string;
  status: 'Open' | 'In Review' | 'Answered' | 'Closed';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  submittedBy: string;
  assignedTo: string;
  dueDate: Date;
  attachments: string[];
  responses: {
    text: string;
    submittedBy: string;
    submittedAt: Date;
    attachments: string[];
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const RFISchema: Schema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  rfiNumber: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ['Open', 'In Review', 'Answered', 'Closed'],
    default: 'Open'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Urgent'],
    default: 'Medium'
  },
  submittedBy: { type: String, required: true },
  assignedTo: { type: String, required: true },
  dueDate: { type: Date, required: true },
  attachments: [{ type: String }],
  responses: [{
    text: { type: String, required: true },
    submittedBy: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now },
    attachments: [{ type: String }]
  }]
}, {
  timestamps: true
});

// Generate RFI number before saving
RFISchema.pre('save', async function(next) {
  if (!this.rfiNumber) {
    const project = await mongoose.model('Project').findById(this.projectId);
    const count = await this.constructor.countDocuments({ projectId: this.projectId });
    this.rfiNumber = `${project.name}-RFI-${String(count + 1).padStart(3, '0')}`;
  }
  next();
});

export default mongoose.model<IRFI>('RFI', RFISchema); 