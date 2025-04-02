import { Request, Response } from 'express';
import RFI from '../models/RFI';

export const createRFI = async (req: Request, res: Response) => {
  try {
    const rfi = new RFI(req.body);
    await rfi.save();
    res.status(201).json(rfi);
  } catch (error) {
    res.status(400).json({ message: 'Error creating RFI', error });
  }
};

export const getRFIs = async (req: Request, res: Response) => {
  try {
    const rfis = await RFI.find({ projectId: req.params.projectId })
      .populate('projectId', 'name');
    res.json(rfis);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching RFIs', error });
  }
};

export const getRFIById = async (req: Request, res: Response) => {
  try {
    const rfi = await RFI.findById(req.params.id)
      .populate('projectId', 'name');
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
    const rfi = await RFI.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!rfi) {
      return res.status(404).json({ message: 'RFI not found' });
    }
    res.json(rfi);
  } catch (error) {
    res.status(400).json({ message: 'Error updating RFI', error });
  }
};

export const addRFIResponse = async (req: Request, res: Response) => {
  try {
    const rfi = await RFI.findById(req.params.id);
    if (!rfi) {
      return res.status(404).json({ message: 'RFI not found' });
    }
    
    rfi.responses.push(req.body);
    rfi.status = 'Answered';
    await rfi.save();
    
    res.json(rfi);
  } catch (error) {
    res.status(400).json({ message: 'Error adding RFI response', error });
  }
};

export const deleteRFI = async (req: Request, res: Response) => {
  try {
    const rfi = await RFI.findByIdAndDelete(req.params.id);
    if (!rfi) {
      return res.status(404).json({ message: 'RFI not found' });
    }
    res.json({ message: 'RFI deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting RFI', error });
  }
}; 