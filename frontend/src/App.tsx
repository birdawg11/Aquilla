import React from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import DailyReportForm from './components/DailyReportForm';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <DailyReportForm projectId="test-project-1" />
      </Container>
    </ThemeProvider>
  );
}

export default App;
