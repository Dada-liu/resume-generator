import type { ResumeTemplate } from '../types/template'
import { ClassicTemplate } from './classic/ClassicTemplate'
import { classicDefaultResume, classicEditorModules } from './classic/resumeConfig'
import { ResemeTemplate1 } from './reseme-template-1/ResemeTemplate1'
import { resemeTemplate1DefaultResume, resemeTemplate1EditorModules } from './reseme-template-1/resumeConfig'

export const templates: ResumeTemplate[] = [
  {
    id: 'classic',
    name: '经典模板',
    component: ClassicTemplate,
    defaultResume: classicDefaultResume,
    editorModules: classicEditorModules,
  },
  {
    id: 'reseme-template-1',
    name: '简历模板1',
    component: ResemeTemplate1,
    defaultResume: resemeTemplate1DefaultResume,
    editorModules: resemeTemplate1EditorModules,
  },
]

export function getTemplateById(id: string): ResumeTemplate | undefined {
  return templates.find((t) => t.id === id)
}
