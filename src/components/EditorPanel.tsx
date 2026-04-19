import { ChevronRight, User, FileText, Briefcase, GraduationCap, Wrench, FolderKanban, Contact } from 'lucide-react'
import { useResumeStore } from '../stores/resumeStore'
import type { EditorType } from '../types/resume'
import { PersonalInfoEditor } from './editors/PersonalInfoEditor'
import { SummaryEditor } from './editors/SummaryEditor'
import { ExperienceEditor } from './editors/ExperienceEditor'
import { EducationEditor } from './editors/EducationEditor'
import { SkillsEditor } from './editors/SkillsEditor'
import { ProjectsEditor } from './editors/ProjectsEditor'
import { ContactEditor } from './editors/ContactEditor'

const menuItems: { id: EditorType; label: string; icon: typeof User }[] = [
  { id: 'personalInfo', label: '个人信息', icon: User },
  { id: 'summary', label: '自我介绍', icon: FileText },
  { id: 'experience', label: '工作经历', icon: Briefcase },
  { id: 'education', label: '教育经历', icon: GraduationCap },
  { id: 'skills', label: '专业技能', icon: Wrench },
  { id: 'projects', label: '项目介绍', icon: FolderKanban },
  { id: 'contact', label: '联系方式', icon: Contact },
]

function EditorContent() {
  const { activeEditor } = useResumeStore()

  switch (activeEditor) {
    case 'personalInfo':
      return <PersonalInfoEditor />
    case 'summary':
      return <SummaryEditor />
    case 'experience':
      return <ExperienceEditor />
    case 'education':
      return <EducationEditor />
    case 'skills':
      return <SkillsEditor />
    case 'projects':
      return <ProjectsEditor />
    case 'contact':
      return <ContactEditor />
    default:
      return null
  }
}

export function EditorPanel() {
  const { activeEditor, setActiveEditor } = useResumeStore()

  const handleMenuClick = (id: EditorType) => {
    if (activeEditor === id) {
      setActiveEditor(null)
    } else {
      setActiveEditor(id)
    }
  }

  return (
    <div className="w-80 bg-white border-l flex flex-col h-screen">
      {/* Menu List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeEditor === item.id

            return (
              <div key={item.id}>
                <button
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isActive ? 'rotate-90' : ''
                    }`}
                  />
                </button>

                {/* Expanded Editor */}
                {isActive && (
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                    <EditorContent />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
