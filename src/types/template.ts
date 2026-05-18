import type { FC } from 'react'
import type { ResumeData } from './resume'

export interface ResumeTemplate {
  id: string
  name: string
  component: FC<{ data: ResumeData }>
}

export type TemplateId = string
