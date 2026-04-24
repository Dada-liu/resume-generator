export interface PersonalInfo {
  name: string
  jobTitle: string
  workYears?: string
  avatar?: string
  showAvatar?: boolean
}

export interface Experience {
  id: string
  period: string
  company: string
  position: string
  responsibilities: string[]
}

export interface Education {
  id: string
  school: string
  degree: string
  major: string
  period?: string
}

export interface Skill {
  id: string
  name: string
  description: string
}

export interface Project {
  id: string
  name: string
  period?: string
  role?: string
  description: string
  details: string
  technologies: string[]
}

export interface Contact {
  id: string
  platform: string
  value: string
}

export interface ResumeData {
  personalInfo: PersonalInfo
  selfIntroduction: string
  experiences: Experience[]
  educations: Education[]
  skills: Skill[]
  projects: Project[]
  contacts: Contact[]
}

export type EditorType = 'personalInfo' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'contact' | null
