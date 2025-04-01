import { useState, useEffect } from 'react';
import { Project, DailyReport, RFI, TimeEntry, SafetyCheck, Message, Submittal, Task } from '../types';
import { getLocalData, generateId } from '../utils';
import { INITIAL_PROJECTS } from '../constants';

export const useProject = () => {
  const [projects, setProjects] = useState<Project[]>(() => getLocalData("projects", INITIAL_PROJECTS));
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const handleFileUpload = (projectName: string, files: File[], type: "drawings" | "documents") => {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.name === projectName) {
          const newFiles = files.map((file) => ({
            file,
            shareLink: URL.createObjectURL(file),
            tag: type,
          }));
          return {
            ...project,
            [type]: [...project[type], ...newFiles],
          };
        }
        return project;
      })
    );
  };

  const addDailyReport = (projectName: string, report: DailyReport) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.name === projectName) {
          return {
            ...project,
            reports: [...project.reports, report],
          };
        }
        return project;
      })
    );
  };

  const addRFI = (projectName: string, rfi: RFI) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.name === projectName) {
          return {
            ...project,
            rfi: [...project.rfi, rfi],
          };
        }
        return project;
      })
    );
  };

  const addTimeEntry = (projectName: string, entry: TimeEntry) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.name === projectName) {
          return {
            ...project,
            timeEntries: [...project.timeEntries, entry],
          };
        }
        return project;
      })
    );
  };

  const addSafetyCheck = (projectName: string, check: SafetyCheck) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.name === projectName) {
          return {
            ...project,
            safetyChecks: [...project.safetyChecks, check],
          };
        }
        return project;
      })
    );
  };

  const addMessage = (projectName: string, message: Message) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.name === projectName) {
          return {
            ...project,
            messages: [...project.messages, message],
          };
        }
        return project;
      })
    );
  };

  const addSubmittal = (projectName: string, submittal: Submittal) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.name === projectName) {
          return {
            ...project,
            submittals: [...project.submittals, submittal],
          };
        }
        return project;
      })
    );
  };

  const addTask = (projectName: string, task: Task) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.name === projectName) {
          return {
            ...project,
            tasks: [...project.tasks, task],
          };
        }
        return project;
      })
    );
  };

  const selectedProjectData = projects.find((p) => p.name === selectedProject?.name);

  return {
    projects,
    selectedProject,
    setSelectedProject,
    selectedProjectData,
    handleFileUpload,
    addDailyReport,
    addRFI,
    addTimeEntry,
    addSafetyCheck,
    addMessage,
    addSubmittal,
    addTask,
  };
}; 