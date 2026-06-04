import type { FC } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { ResumeData } from './resume'

export interface EditorModule {
  id: string
  label: string
  icon: LucideIcon
  component: FC
}

export interface ResumeTemplate {
  id: string
  name: string
  component: FC<{ data: ResumeData }>
  defaultResume: ResumeData
  editorModules: EditorModule[]
}

export type TemplateId = string
