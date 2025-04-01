const API_URL = process.env.REACT_APP_API_URL;

export const DailyReportAPI = {
  create: async (reportData: any) => {
    const response = await fetch(`${API_URL}/daily-reports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reportData),
    });
    return response.json();
  },

  getByProject: async (projectId: string) => {
    const response = await fetch(`${API_URL}/daily-reports/project/${projectId}`);
    return response.json();
  },
}; 