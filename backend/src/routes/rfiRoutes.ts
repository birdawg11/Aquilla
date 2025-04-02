import express from 'express';
import {
  createRFI,
  getRFIs,
  getRFIById,
  updateRFI,
  addRFIResponse,
  deleteRFI
} from '../controllers/rfiController';

const router = express.Router();

router.post('/', createRFI);
router.get('/project/:projectId', getRFIs);
router.get('/:id', getRFIById);
router.put('/:id', updateRFI);
router.post('/:id/responses', addRFIResponse);
router.delete('/:id', deleteRFI);

export default router; 