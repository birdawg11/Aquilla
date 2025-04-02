import { Request, Response } from 'express';
import RFI from '../models/RFI';

export const createRFI = async (req: Request, res: Response) => {
  try {
    const rfi = new RFI({
      ...req.body,
      createdBy: req.user?.userId
    });
    await rfi.save();
    res.status(201).json(rfi);
  } catch (error) {
    res.status(500).json({ message: 'Error creating RFI', error });
  }
};

export const getRFIs = async (req: Request, res: Response) => {
  try {
    const rfis = await RFI.find({ projectId: req.params.projectId });
    res.json(rfis);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching RFIs', error });
  }
};

export const getRFI = async (req: Request, res: Response) => {
  try {
    const rfi = await RFI.findById(req.params.id);
    if (!rfi) {
      return res.status(404).json({ message: 'RFI not found' });
    }
    res.json(rfi);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching RFI', error });
  }
};

export const updateRFI = async (req: Request, res: Response) => {
  try {
    const rfi = await RFI.findById(req.params.id);
    if (!rfi) {
      return res.status(404).json({ message: 'RFI not found' });
    }

    // Update fields
    Object.keys(req.body).forEach(key => {
      rfi[key] = req.body[key];
    });

    await rfi.save();
    res.json(rfi);
  } catch (error) {
    res.status(500).json({ message: 'Error updating RFI', error });
  }
};

export const deleteRFI = async (req: Request, res: Response) => {
  try {
    const rfi = await RFI.findById(req.params.id);
    if (!rfi) {
      return res.status(404).json({ message: 'RFI not found' });
    }
    await rfi.deleteOne();
    res.json({ message: 'RFI deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting RFI', error });
  }
}; 