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
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';

interface Project {
  _id: string;
  name: string;
  description: string;
  status: string;
  client: string;
  startDate: string;
  endDate: string;
  budget: {
    total: number;
    spent: number;
    remaining: number;
  };
}

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [open, setOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    client: '',
    startDate: '',
    endDate: '',
    budget: {
      total: 0,
      remaining: 0,
    },
    status: 'Planning',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/projects`);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleOpen = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        name: project.name,
        description: project.description,
        client: project.client,
        startDate: project.startDate.split('T')[0],
        endDate: project.endDate.split('T')[0],
        budget: {
          total: project.budget.total,
          remaining: project.budget.remaining,
        },
        status: project.status,
      });
    } else {
      setEditingProject(null);
      setFormData({
        name: '',
        description: '',
        client: '',
        startDate: '',
        endDate: '',
        budget: {
          total: 0,
          remaining: 0,
        },
        status: 'Planning',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProject(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await axios.put(`${process.env.REACT_APP_API_URL}/api/projects/${editingProject._id}`, formData);
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/projects`, formData);
      }
      fetchProjects();
      handleClose();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/projects/${id}`);
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planning':
        return 'info';
      case 'In Progress':
        return 'success';
      case 'On Hold':
        return 'warning';
      case 'Completed':
        return 'primary';
      case 'Cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Projects</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          New Project
        </Button>
      </Box>

      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} md={6} lg={4} key={project._id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="h6" gutterBottom>
                    {project.name}
                  </Typography>
                  <Box>
                    <IconButton size="small" onClick={() => handleOpen(project)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(project._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography color="textSecondary" gutterBottom>
                  {project.client}
                </Typography>
                <Typography variant="body2" paragraph>
                  {project.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip
                    label={project.status}
                    color={getStatusColor(project.status)}
                    size="small"
                  />
                </Box>
                <Typography variant="body2">
                  Budget: ${project.budget.total.toLocaleString()}
                </Typography>
                <Typography variant="body2">
                  Spent: ${project.budget.spent.toLocaleString()}
                </Typography>
                <Typography variant="body2">
                  Remaining: ${project.budget.remaining.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingProject ? 'Edit Project' : 'New Project'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              label="Project Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
              rows={3}
              required
            />
            <TextField
              fullWidth
              label="Client"
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Start Date"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              fullWidth
              label="End Date"
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              fullWidth
              label="Total Budget"
              type="number"
              value={formData.budget.total}
              onChange={(e) => setFormData({
                ...formData,
                budget: { ...formData.budget, total: Number(e.target.value) }
              })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Remaining Budget"
              type="number"
              value={formData.budget.remaining}
              onChange={(e) => setFormData({
                ...formData,
                budget: { ...formData.budget, remaining: Number(e.target.value) }
              })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              select
              label="Status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              margin="normal"
              required
            >
              <MenuItem value="Planning">Planning</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="On Hold">On Hold</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {editingProject ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default ProjectList; 