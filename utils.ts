import { Project } from './types';

export const getLocalData = (key: string, defaultValue: any) => {
  const savedData = localStorage.getItem(key);
  try {
    const parsed = savedData ? JSON.parse(savedData) : defaultValue;
    if (key === "projects" && Array.isArray(parsed)) {
      return parsed.map((p: any) => ({
        ...p,
        drawings: Array.isArray(p.drawings) ? p.drawings : [],
        documents: Array.isArray(p.documents) ? p.documents : [],
        reports: Array.isArray(p.reports) ? p.reports : [],
        rfis: Array.isArray(p.rfis) ? p.rfis : [],
        timeEntries: Array.isArray(p.timeEntries) ? p.timeEntries : [],
        safetyChecks: Array.isArray(p.safetyChecks) ? p.safetyChecks : [],
        messages: Array.isArray(p.messages) ? p.messages : [],
        submittals: Array.isArray(p.submittals) ? p.submittals : [],
        tasks: Array.isArray(p.tasks) ? p.tasks : [],
      }));
    }
    return Array.isArray(parsed) ? parsed : defaultValue;
  } catch (e) {
    console.error(`Error parsing ${key} from localStorage, using default:`, e);
    return defaultValue;
  }
};

export const calculateTotalHours = (timeEntries: any[]) => {
  if (!Array.isArray(timeEntries)) return 0;
  return timeEntries.reduce((total, entry) => {
    if (entry.clockIn && entry.clockOut) {
      const start = new Date(entry.clockIn).getTime();
      const end = new Date(entry.clockOut).getTime();
      const hours = (end - start) / (1000 * 60 * 60);
      return total + hours;
    }
    return total;
  }, 0).toFixed(2);
};

export const generateId = () => Date.now().toString(); 