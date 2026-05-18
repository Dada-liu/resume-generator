import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
import type { ResumeData, EditorType, Experience, Education, Skill, Project, Contact } from '../types/resume'
import type { TemplateId } from '../types/template'

const defaultResume: ResumeData = {
  personalInfo: {
    name: '张三',
    jobTitle: '前端工程师',
    workYears: '3年',
  },
  selfIntroduction: '热爱前端开发，熟练使用 React、Vue 等主流框架，有丰富的项目实践经验。',
  experiences: [
    {
      id: uuidv4(),
      period: '2022.03 - 至今',
      company: '某互联网公司',
      position: '前端工程师',
      responsibilities: ['负责公司核心产品前端开发', '参与技术架构设计与优化'],
    },
  ],
  educations: [
    {
      id: uuidv4(),
      school: '某某大学',
      degree: '本科',
      major: '计算机科学与技术',
      period: '2018.09 - 2022.06',
    },
  ],
  skills: [
    { id: uuidv4(), name: 'React', description: '熟练掌握' },
    { id: uuidv4(), name: 'TypeScript', description: '熟练掌握' },
    { id: uuidv4(), name: 'Node.js', description: '熟练掌握' },
  ],
  projects: [
    {
      id: uuidv4(),
      name: '在线简历编辑器',
      period: '2024.01 - 2024.03',
      role: '前端负责人',
      description: '一个所见即所得的简历编辑器',
      details: '使用 React + TypeScript 开发，支持实时预览、PDF 导出等功能',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    },
  ],
  contacts: [
    { id: uuidv4(), platform: 'Email', value: 'zhangsan@example.com' },
    { id: uuidv4(), platform: 'Phone', value: '138****8888' },
  ],
}

interface ResumeState {
  resume: ResumeData
  activeEditor: EditorType
  selectedTemplate: TemplateId
  setActiveEditor: (editor: EditorType) => void
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
      resume: defaultResume,
      activeEditor: null,
      selectedTemplate: 'classic',

      setActiveEditor: (editor) => set({ activeEditor: editor }),
      setSelectedTemplate: (templateId) => set({ selectedTemplate: templateId }),

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
      resetResume: () => set({ resume: defaultResume }),
    }),
    {
      name: 'resume-storage',
    }
  )
)
