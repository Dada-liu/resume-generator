import { User, FileText, Briefcase, GraduationCap, Wrench, FolderKanban, Contact } from 'lucide-react'
import { PersonalInfoEditor } from './editors/PersonalInfoEditor'
import { SummaryEditor } from './editors/SummaryEditor'
import { ExperienceEditor } from './editors/ExperienceEditor'
import { EducationEditor } from './editors/EducationEditor'
import { SkillsEditor } from './editors/SkillsEditor'
import { ProjectsEditor } from './editors/ProjectsEditor'
import { ContactEditor } from './editors/ContactEditor'
import type { EditorModule } from '../../types/template'
import type { ResumeData } from '../../types/resume'

export const classicDefaultResume: ResumeData = {
  personalInfo: {
    name: '张三',
    jobTitle: '前端工程师',
    workYears: '3年',
  },
  selfIntroduction: '热爱前端开发，熟练使用 React、Vue 等主流框架，有丰富的项目实践经验。',
  experiences: [
    {
      id: 'default-exp-1',
      period: '2022.03 - 至今',
      company: '某互联网公司',
      position: '前端工程师',
      responsibilities: ['负责公司核心产品前端开发', '参与技术架构设计与优化'],
    },
  ],
  educations: [
    {
      id: 'default-edu-1',
      school: '某某大学',
      degree: '本科',
      major: '计算机科学与技术',
      period: '2018.09 - 2022.06',
    },
  ],
  skills: [
    { id: 'default-skill-1', name: 'React', description: '熟练掌握' },
    { id: 'default-skill-2', name: 'TypeScript', description: '熟练掌握' },
    { id: 'default-skill-3', name: 'Node.js', description: '熟练掌握' },
  ],
  projects: [
    {
      id: 'default-proj-1',
      name: '在线简历编辑器',
      period: '2024.01 - 2024.03',
      role: '前端负责人',
      description: '一个所见即所得的简历编辑器',
      details: '使用 React + TypeScript 开发，支持实时预览、PDF 导出等功能',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    },
  ],
  contacts: [
    { id: 'default-contact-1', platform: 'Email', value: 'zhangsan@example.com' },
    { id: 'default-contact-2', platform: 'Phone', value: '138****8888' },
  ],
}

export const classicEditorModules: EditorModule[] = [
  { id: 'personalInfo', label: '个人信息', icon: User, component: PersonalInfoEditor },
  { id: 'summary', label: '自我介绍', icon: FileText, component: SummaryEditor },
  { id: 'experience', label: '工作经历', icon: Briefcase, component: ExperienceEditor },
  { id: 'education', label: '教育经历', icon: GraduationCap, component: EducationEditor },
  { id: 'skills', label: '专业技能', icon: Wrench, component: SkillsEditor },
  { id: 'projects', label: '项目介绍', icon: FolderKanban, component: ProjectsEditor },
  { id: 'contact', label: '联系方式', icon: Contact, component: ContactEditor },
]
