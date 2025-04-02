import { Schema, model } from 'mongoose';

const dailyReportSchema = new Schema({
  date: { type: Date, required: true },
  projectId: { type: String, required: true },
  weather: { type: String, required: true },
  temperature: { type: Number, required: true },
  workCompleted: { type: String, required: true },
  materialsUsed: [String],
  equipmentUsed: [String],
  laborHours: { type: Number, required: true },
  safetyIncidents: { type: String, default: 'None' },
  qualityIssues: { type: String, default: 'None' },
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

export const DailyReport = model('DailyReport', dailyReportSchema); 