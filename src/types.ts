export interface Project {
  name: string;
  progress: number;
  drawings: StoredDocument[];
  documents: StoredDocument[];
  reports: DailyReport[];
  rfi: RFI[];
  timeEntries: TimeEntry[];
  safetyChecks: SafetyCheck[];
  messages: Message[];
  submittals: Submittal[];
  tasks: Task[];
}

export interface Vendor {
  name: string;
  title: string;
  phone: string;
  email: string;
}

export interface SubcontractorEntry {
  vendor: string;
  summary: string;
}

export interface DailyReport {
  date: string;
  subcontractors: SubcontractorEntry[];
  men: number;
  hours: number;
  weather: string;
  injuries: string;
  visitors: string;
  meetings: string;
}

export interface StoredDocument {
  file: File;
  shareLink: string;
  previewUrl?: string;
  tag: string;
}

export interface RFI {
  id: string;
  title: string;
  description: string;
  responsible: string;
}

export interface TimeEntry {
  worker: string;
  clockIn: string;
  clockOut: string;
  gps: {
    lat: number;
    lng: number;
  };
}

export interface SafetyCheck {
  date: string;
  checklistItems: string[];
  talkTopics: string[];
}

export interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

export interface Submittal {
  id: string;
  title: string;
  file: File;
  assignedTo: string;
  status: "pending" | "approved" | "rejected";
}

export interface Task {
  id: string;
  title: string;
  assignedTo: string;
  deadline: string;
  status: "pending" | "in-progress" | "completed";
} 