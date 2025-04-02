import express, { Request, Response } from 'express';
import { DailyReport } from '../models/DailyReport';

const router = express.Router();

// Get all daily reports for a project
router.get('/:projectId', async (req: Request, res: Response) => {
  try {
    const reports = await DailyReport.find({ projectId: req.params.projectId })
      .sort({ date: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching daily reports', error });
  }
});

// Create a new daily report
router.post('/', async (req: Request, res: Response) => {
  try {
    const newReport = new DailyReport(req.body);
    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (error) {
    res.status(400).json({ message: 'Error creating daily report', error });
  }
});

export default router; 