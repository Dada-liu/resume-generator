import type { ResumeTemplate } from '../types/template'
import { ClassicTemplate } from './classic/ClassicTemplate'

export const templates: ResumeTemplate[] = [
  {
    id: 'classic',
    name: '经典模板',
    component: ClassicTemplate,
  },
]

export function getTemplateById(id: string): ResumeTemplate | undefined {
  return templates.find((t) => t.id === id)
}
