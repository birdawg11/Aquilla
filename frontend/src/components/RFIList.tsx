import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';

interface RFI {
  _id: string;
  rfiNumber: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  submittedBy: string;
  assignedTo: string;
  dueDate: string;
  responses: {
    text: string;
    submittedBy: string;
    submittedAt: string;
  }[];
}

interface RFIListProps {
  projectId: string;
}

const RFIList: React.FC<RFIListProps> = ({ projectId }) => {
  const [rfis, setRfis] = useState<RFI[]>([]);
  const [open, setOpen] = useState(false);
  const [editingRfi, setEditingRfi] = useState<RFI | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    assignedTo: '',
    dueDate: '',
  });

  useEffect(() => {
    fetchRFIs();
  }, [projectId]);

  const fetchRFIs = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/rfis/project/${projectId}`);
      setRfis(response.data);
    } catch (error) {
      console.error('Error fetching RFIs:', error);
    }
  };

  const handleOpen = (rfi?: RFI) => {
    if (rfi) {
      setEditingRfi(rfi);
      setFormData({
        title: rfi.title,
        description: rfi.description,
        priority: rfi.priority,
        assignedTo: rfi.assignedTo,
        dueDate: rfi.dueDate.split('T')[0],
      });
    } else {
      setEditingRfi(null);
      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
        assignedTo: '',
        dueDate: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingRfi(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const rfiData = {
        ...formData,
        projectId,
        submittedBy: 'Current User', // Replace with actual user
      };

      if (editingRfi) {
        await axios.put(`${process.env.REACT_APP_API_URL}/api/rfis/${editingRfi._id}`, rfiData);
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/rfis`, rfiData);
      }
      fetchRFIs();
      handleClose();
    } catch (error) {
      console.error('Error saving RFI:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this RFI?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/rfis/${id}`);
        fetchRFIs();
      } catch (error) {
        console.error('Error deleting RFI:', error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'error';
      case 'In Review':
        return 'warning';
      case 'Answered':
        return 'info';
      case 'Closed':
        return 'success';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent':
        return 'error';
      case 'High':
        return 'warning';
      case 'Medium':
        return 'info';
      case 'Low':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Requests for Information (RFIs)</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          New RFI
        </Button>
      </Box>

      <Grid container spacing={3}>
        {rfis.map((rfi) => (
          <Grid item xs={12} key={rfi._id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {rfi.title}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      RFI #{rfi.rfiNumber}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton size="small" onClick={() => handleOpen(rfi)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(rfi._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="body2" paragraph>
                  {rfi.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip
                    label={rfi.status}
                    color={getStatusColor(rfi.status)}
                    size="small"
                  />
                  <Chip
                    label={rfi.priority}
                    color={getPriorityColor(rfi.priority)}
                    size="small"
                  />
                </Box>
                <Typography variant="body2">
                  Submitted by: {rfi.submittedBy}
                </Typography>
                <Typography variant="body2">
                  Assigned to: {rfi.assignedTo}
                </Typography>
                <Typography variant="body2">
                  Due Date: {new Date(rfi.dueDate).toLocaleDateString()}
                </Typography>

                {rfi.responses.length > 0 && (
                  <>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" gutterBottom>
                      Responses
                    </Typography>
                    <List>
                      {rfi.responses.map((response, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={response.text}
                            secondary={`${response.submittedBy} - ${new Date(response.submittedAt).toLocaleString()}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingRfi ? 'Edit RFI' : 'New RFI'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              margin="normal"
              multiline
              rows={4}
              required
            />
            <TextField
              fullWidth
              select
              label="Priority"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              margin="normal"
              required
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Urgent">Urgent</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="Assigned To"
              value={formData.assignedTo}
              onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Due Date"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {editingRfi ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default RFIList; 