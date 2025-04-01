import { useState, useEffect } from 'react';
import { Project, DailyReport, RFI, TimeEntry, SafetyCheck, Message, Submittal, Task } from '../types';
import { getLocalData, generateId } from '../utils';
import { INITIAL_PROJECTS } from '../constants';

export const useProject = () => {
  const [projects, setProjects] = useState<Project[]>(getLocalData("projects", INITIAL_PROJECTS));
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: "drawings" | "documents" | "photos" | "submittals") => {
    if (!event.target.files || event.target.files.length === 0 || !selectedProject) return;
    const file = event.target.files[0];
    const updatedProjects = projects.map((p) =>
      p.name === selectedProject
        ? type === "drawings"
          ? { ...p, drawings: [...p.drawings, file] }
          : type === "documents"
          ? { ...p, documents: [...p.documents, { file, shareLink: `link-to-${file.name}` }] }
          : type === "photos"
          ? {
              ...p,
              documents: [...p.documents, { file, shareLink: `photo-${file.name}`, previewUrl: URL.createObjectURL(file) }],
            }
          : { ...p, submittals: [...p.submittals, { id: generateId(), title: "", file, assignedTo: "", status: "Pending" }] }
        : p
    );
    setProjects(updatedProjects);
  };

  const addDailyReport = (report: DailyReport) => {
    if (!selectedProject) return;
    const updatedProjects = projects.map((p) =>
      p.name === selectedProject
        ? { ...p, reports: [...p.reports, report] }
        : p
    );
    setProjects(updatedProjects);
  };

  const addRFI = (rfi: RFI) => {
    if (!selectedProject) return;
    const updatedProjects = projects.map((p) =>
      p.name === selectedProject
        ? { ...p, rfis: [...p.rfis, { ...rfi, id: generateId() }] }
        : p
    );
    setProjects(updatedProjects);
  };

  const addTimeEntry = (entry: TimeEntry) => {
    if (!selectedProject) return;
    const updatedProjects = projects.map((p) =>
      p.name === selectedProject
        ? { ...p, timeEntries: [...p.timeEntries, entry] }
        : p
    );
    setProjects(updatedProjects);
  };

  const updateTimeEntry = (entryIndex: number, clockOut: string) => {
    if (!selectedProject) return;
    const updatedProjects = projects.map((p) =>
      p.name === selectedProject
        ? {
            ...p,
            timeEntries: p.timeEntries.map((entry, i) =>
              i === entryIndex ? { ...entry, clockOut } : entry
            ),
          }
        : p
    );
    setProjects(updatedProjects);
  };

  const addSafetyCheck = (check: SafetyCheck) => {
    if (!selectedProject) return;
    const updatedProjects = projects.map((p) =>
      p.name === selectedProject
        ? { ...p, safetyChecks: [...p.safetyChecks, check] }
        : p
    );
    setProjects(updatedProjects);
  };

  const addMessage = (message: Message) => {
    if (!selectedProject) return;
    const updatedProjects = projects.map((p) =>
      p.name === selectedProject
        ? { ...p, messages: [...p.messages, { ...message, id: generateId() }] }
        : p
    );
    setProjects(updatedProjects);
  };

  const addSubmittal = (submittal: Submittal) => {
    if (!selectedProject) return;
    const updatedProjects = projects.map((p) =>
      p.name === selectedProject
        ? { ...p, submittals: [...p.submittals, { ...submittal, id: generateId() }] }
        : p
    );
    setProjects(updatedProjects);
  };

  const addTask = (task: Task) => {
    if (!selectedProject) return;
    const updatedProjects = projects.map((p) =>
      p.name === selectedProject
        ? { ...p, tasks: [...p.tasks, { ...task, id: generateId() }] }
        : p
    );
    setProjects(updatedProjects);
  };

  const selectedProjectData = projects.find((p) => p.name === selectedProject);

  return {
    projects,
    selectedProject,
    setSelectedProject,
    selectedProjectData,
    handleFileUpload,
    addDailyReport,
    addRFI,
    addTimeEntry,
    updateTimeEntry,
    addSafetyCheck,
    addMessage,
    addSubmittal,
    addTask,
  };
}; 