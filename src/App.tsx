import { Download, RotateCcw, Save, Upload, Star, LayoutTemplate, PanelRightClose, PanelRightOpen } from 'lucide-react'
import { useRef, useCallback, useState, useEffect } from 'react'
import { ResumePreview } from './components/ResumePreview'
import { EditorPanel } from './components/EditorPanel'
import { CustomSelect } from './components/CustomSelect'
import { useResumeStore } from './stores/resumeStore'
import { exportPdf } from './utils/exportPdf'
import type { ResumeData } from './types/resume'
import { templates } from './templates'

function App() {
  const { resume, resetResume, setResume, selectedTemplate, setSelectedTemplate } = useResumeStore()
  const previewRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [stars, setStars] = useState<number | null>(null)
  const [editorOpen, setEditorOpen] = useState(true)

  const GITHUB_URL = 'https://github.com/Dada-liu/resume-generator'

  useEffect(() => {
    fetch('https://api.github.com/repos/Dada-liu/resume-generator')
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count !== undefined) {
          setStars(data.stargazers_count)
        }
      })
      .catch(() => {
        // 静默失败，保持 stars 为 null
      })
  }, [])

  const handleExport = async () => {
    if (previewRef.current) {
      const { name, jobTitle } = resume.personalInfo
      const now = new Date()
      const pad = (n: number) => String(n).padStart(2, '0')
      const timestamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`
      const filename = `${name || '简历'}_${jobTitle || '岗位'}_${timestamp}.pdf`
      await exportPdf(previewRef.current, filename)
    }
  }

  const handleSave = () => {
    const { name, jobTitle } = resume.personalInfo
    const now = new Date()
    const pad = (n: number) => String(n).padStart(2, '0')
    const timestamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`
    const baseName = `${name || '简历'}_${jobTitle || '岗位'}_${timestamp}`

    const json = JSON.stringify(resume, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${baseName}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string) as ResumeData
        setResume(data)
      } catch {
        alert('文件格式错误，请选择有效的 JSON 文件')
      }
    }
    reader.readAsText(file)
    // Reset input so the same file can be selected again
    e.target.value = ''
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="min-h-14 bg-white border-b flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-3 py-2 md:px-4">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-base md:text-lg font-semibold text-gray-800 whitespace-nowrap">
            简历编辑器
          </h1>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-0.5 md:gap-1 px-1.5 md:px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
          >
            <svg
              className="w-3.5 h-3.5 md:w-4 md:h-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            {stars !== null && (
              <>
                <Star className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span className="text-xs md:text-sm font-medium">{stars}</span>
              </>
            )}
          </a>
          <div className="flex items-center gap-1 md:gap-1.5">
            <LayoutTemplate className="hidden sm:block w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400" />
            <span className="text-xs md:text-sm text-gray-500 hidden sm:inline">简历模板</span>
            <CustomSelect
              options={templates.map((t) => ({ value: t.id, label: t.name }))}
              value={selectedTemplate}
              onChange={setSelectedTemplate}
            />
          </div>
        </div>

        <div className="flex gap-1 md:gap-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 md:gap-2 p-1.5 md:px-3 md:py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <Save className="w-4 h-4" />
            <span className="hidden md:inline">保存</span>
          </button>
          <button
            onClick={handleImport}
            className="flex items-center gap-1.5 md:gap-2 p-1.5 md:px-3 md:py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <Upload className="w-4 h-4" />
            <span className="hidden md:inline">导入</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            onClick={resetResume}
            className="flex items-center gap-1.5 md:gap-2 p-1.5 md:px-3 md:py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden md:inline">重置</span>
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 md:gap-2 p-1.5 md:px-3 md:py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Download className="w-4 h-4" />
            <span className="hidden md:inline">导出 PDF</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative">
        <ResumePreview ref={previewRef} />
        {editorOpen ? (
          <div className="relative">
            <button
              onClick={() => setEditorOpen(false)}
              className="absolute top-2 -left-9 z-10 p-1.5 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors shadow-sm"
              title="收起编辑区"
            >
              <PanelRightClose className="w-4 h-4" />
            </button>
            <EditorPanel />
          </div>
        ) : (
          <button
            onClick={() => setEditorOpen(true)}
            className="absolute top-2 right-2 z-10 flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500 hover:text-gray-700 transition-colors shadow-sm"
            title="打开编辑区"
          >
            <PanelRightOpen className="w-4 h-4" />
            <span className="text-sm hidden sm:inline">编辑</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default App
