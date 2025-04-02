import express from 'express';
import {
  createRFI,
  getRFIs,
  getRFI,
  updateRFI,
  deleteRFI
} from '../controllers/rfiController';

const router = express.Router();

// Get all RFIs for a project
router.get('/project/:projectId', getRFIs);

// Get a single RFI
router.get('/:id', getRFI);

// Create a new RFI
router.post('/', createRFI);

// Update an RFI
router.put('/:id', updateRFI);

// Delete an RFI
router.delete('/:id', deleteRFI);

export default router; 