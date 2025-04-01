import { Project } from './types';

export const getLocalData = <T>(key: string, defaultValue: T): T => {
  try {
    const item = window.localStorage.getItem(key);
    if (item) {
      const data = JSON.parse(item);
      if (key === "projects") {
        // Ensure all arrays exist in the project data
        return data.map((project: Project) => ({
          ...project,
          drawings: project.drawings || [],
          documents: project.documents || [],
          reports: project.reports || [],
          rfi: project.rfi || [],
          timeEntries: project.timeEntries || [],
          safetyChecks: project.safetyChecks || [],
          messages: project.messages || [],
          submittals: project.submittals || [],
          tasks: project.tasks || []
        })) as T;
      }
      return data;
    }
  } catch (error) {
    console.error("Error reading from localStorage:", error);
  }
  return defaultValue;
};

export const calculateTotalHours = (timeEntries: { clockIn: string; clockOut: string }[]): number => {
  return timeEntries.reduce((total, entry) => {
    if (entry.clockIn && entry.clockOut) {
      const start = new Date(entry.clockIn).getTime();
      const end = new Date(entry.clockOut).getTime();
      const hours = (end - start) / (1000 * 60 * 60);
      return total + hours;
    }
    return total;
  }, 0);
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}; 