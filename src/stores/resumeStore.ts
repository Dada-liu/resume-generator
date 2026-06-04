import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
import type { ResumeData, Experience, Education, Skill, Project, Contact } from '../types/resume'
import type { TemplateId } from '../types/template'
import { getTemplateById } from '../templates'

const fallbackResume: ResumeData = {
  personalInfo: {
    name: '',
    jobTitle: '',
    showAvatar: true,
    avatarShape: 'circle',
  },
  selfIntroduction: '',
  experiences: [],
  educations: [],
  skills: [],
  projects: [],
  contacts: [],
}

interface ResumeState {
  resume: ResumeData
  activeEditor: string | null
  selectedTemplate: TemplateId
  setActiveEditor: (editor: string | null) => void
  setSelectedTemplate: (templateId: TemplateId) => void
  updatePersonalInfo: (info: ResumeData['personalInfo']) => void
  updateSelfIntroduction: (intro: string) => void
  addExperience: () => void
  updateExperience: (id: string, experience: Experience) => void
  deleteExperience: (id: string) => void
  addEducation: () => void
  updateEducation: (id: string, education: Education) => void
  deleteEducation: (id: string) => void
  addSkill: () => void
  updateSkill: (id: string, skill: Skill) => void
  deleteSkill: (id: string) => void
  addProject: () => void
  updateProject: (id: string, project: Project) => void
  deleteProject: (id: string) => void
  addContact: () => void
  updateContact: (id: string, contact: Contact) => void
  deleteContact: (id: string) => void
  setResume: (resume: ResumeData) => void
  resetResume: () => void
}

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      resume: fallbackResume,
      activeEditor: null,
      selectedTemplate: 'classic',

      setActiveEditor: (editor) => set({ activeEditor: editor }),

      setSelectedTemplate: (templateId) => {
        const template = getTemplateById(templateId)
        set({
          selectedTemplate: templateId,
          resume: template?.defaultResume ?? fallbackResume,
          activeEditor: null,
        })
      },

      updatePersonalInfo: (info) =>
        set((state) => ({
          resume: { ...state.resume, personalInfo: info },
        })),

      updateSelfIntroduction: (intro) =>
        set((state) => ({
          resume: { ...state.resume, selfIntroduction: intro },
        })),

      addExperience: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            experiences: [
              ...state.resume.experiences,
              {
                id: uuidv4(),
                period: '',
                company: '',
                position: '',
                responsibilities: [''],
              },
            ],
          },
        })),

      updateExperience: (id, experience) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experiences: state.resume.experiences.map((exp) =>
              exp.id === id ? experience : exp
            ),
          },
        })),

      deleteExperience: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experiences: state.resume.experiences.filter((exp) => exp.id !== id),
          },
        })),

      addEducation: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            educations: [
              ...state.resume.educations,
              {
                id: uuidv4(),
                school: '',
                degree: '',
                major: '',
                period: '',
              },
            ],
          },
        })),

      updateEducation: (id, education) =>
        set((state) => ({
          resume: {
            ...state.resume,
            educations: state.resume.educations.map((edu) =>
              edu.id === id ? education : edu
            ),
          },
        })),

      deleteEducation: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            educations: state.resume.educations.filter((edu) => edu.id !== id),
          },
        })),

      addSkill: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: [
              ...state.resume.skills,
              { id: uuidv4(), name: '', description: '' },
            ],
          },
        })),

      updateSkill: (id, skill) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: state.resume.skills.map((s) =>
              s.id === id ? skill : s
            ),
          },
        })),

      deleteSkill: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: state.resume.skills.filter((s) => s.id !== id),
          },
        })),

      addProject: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: [
              ...state.resume.projects,
              {
                id: uuidv4(),
                name: '',
                period: '',
                role: '',
                description: '',
                details: '',
                technologies: [''],
              },
            ],
          },
        })),

      updateProject: (id, project) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.map((p) =>
              p.id === id ? project : p
            ),
          },
        })),

      deleteProject: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.filter((p) => p.id !== id),
          },
        })),

      addContact: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            contacts: [
              ...state.resume.contacts,
              { id: uuidv4(), platform: '', value: '' },
            ],
          },
        })),

      updateContact: (id, contact) =>
        set((state) => ({
          resume: {
            ...state.resume,
            contacts: state.resume.contacts.map((c) =>
              c.id === id ? contact : c
            ),
          },
        })),

      deleteContact: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            contacts: state.resume.contacts.filter((c) => c.id !== id),
          },
        })),

      setResume: (resume) => set({ resume }),

      resetResume: () =>
        set((state) => {
          const template = getTemplateById(state.selectedTemplate)
          return { resume: template?.defaultResume ?? fallbackResume }
        }),
    }),
    {
      name: 'resume-storage',
    }
  )
)
