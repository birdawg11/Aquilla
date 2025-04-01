import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  MenuItem,
  Grid,
} from '@mui/material';
import axios from 'axios';

interface DailyReportFormProps {
  projectId: string;
}

const DailyReportForm: React.FC<DailyReportFormProps> = ({ projectId }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    weather: '',
    temperature: '',
    workCompleted: '',
    materialsUsed: '',
    equipmentUsed: '',
    laborHours: '',
    safetyIncidents: '',
    qualityIssues: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/daily-reports', {
        ...formData,
        projectId,
        materialsUsed: formData.materialsUsed.split(',').map(m => m.trim()),
        equipmentUsed: formData.equipmentUsed.split(',').map(e => e.trim()),
      });
      console.log('Report submitted:', response.data);
      // Reset form
      setFormData({
        date: new Date().toISOString().split('T')[0],
        weather: '',
        temperature: '',
        workCompleted: '',
        materialsUsed: '',
        equipmentUsed: '',
        laborHours: '',
        safetyIncidents: '',
        qualityIssues: '',
        notes: '',
      });
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Daily Report Form
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              name="date"
              label="Date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              name="weather"
              label="Weather"
              select
              value={formData.weather}
              onChange={handleChange}
            >
              <MenuItem value="Sunny">Sunny</MenuItem>
              <MenuItem value="Cloudy">Cloudy</MenuItem>
              <MenuItem value="Rainy">Rainy</MenuItem>
              <MenuItem value="Snowy">Snowy</MenuItem>
            </TextField>
          </Stack>
          <TextField
            fullWidth
            name="temperature"
            label="Temperature (°F)"
            type="number"
            value={formData.temperature}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            name="workCompleted"
            label="Work Completed"
            multiline
            rows={3}
            value={formData.workCompleted}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            name="laborHours"
            label="Labor Hours"
            type="number"
            value={formData.laborHours}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            name="materialsUsed"
            label="Materials Used"
            multiline
            rows={2}
            value={formData.materialsUsed}
            onChange={handleChange}
          />
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              name="equipmentUsed"
              label="Equipment Used"
              value={formData.equipmentUsed}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              name="safetyIncidents"
              label="Safety Incidents"
              value={formData.safetyIncidents}
              onChange={handleChange}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              name="qualityIssues"
              label="Quality Issues"
              value={formData.qualityIssues}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              name="notes"
              label="Additional Notes"
              multiline
              rows={2}
              value={formData.notes}
              onChange={handleChange}
            />
          </Stack>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
          >
            Submit Daily Report
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default DailyReportForm; 