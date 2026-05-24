import type { ResumeTemplate } from '../types/template'
import { ClassicTemplate } from './classic/ClassicTemplate'
import { classicDefaultResume, classicEditorModules } from './classic/resumeConfig'
import { Template1 } from './template-1/Template1'
import { template1DefaultResume, template1EditorModules } from './template-1/resumeConfig'

export const templates: ResumeTemplate[] = [
  {
    id: 'classic',
    name: '经典模板',
    component: ClassicTemplate,
    defaultResume: classicDefaultResume,
    editorModules: classicEditorModules,
  },
  {
    id: 'template-1',
    name: '现代简约',
    component: Template1,
    defaultResume: template1DefaultResume,
    editorModules: template1EditorModules,
  },
]

export function getTemplateById(id: string): ResumeTemplate | undefined {
  return templates.find((t) => t.id === id)
}
