import { ChevronRight } from 'lucide-react'
import { useResumeStore } from '../stores/resumeStore'
import { getTemplateById } from '../templates'

export function EditorPanel() {
  const { activeEditor, setActiveEditor, selectedTemplate } = useResumeStore()
  const template = getTemplateById(selectedTemplate)
  const editorModules = template?.editorModules ?? []

  return (
    <div className="w-80 bg-white border-l flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-1">
          {editorModules.map((mod) => {
            const Icon = mod.icon
            const isActive = activeEditor === mod.id

            return (
              <div key={mod.id}>
                <button
                  onClick={() =>
                    setActiveEditor(isActive ? null : mod.id)
                  }
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{mod.label}</span>
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isActive ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {isActive && (
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                    <mod.component />
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
