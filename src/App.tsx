import { Download, RotateCcw, Save, Upload, Star } from 'lucide-react'
import { useRef, useCallback, useState, useEffect } from 'react'
import { ResumePreview } from './components/ResumePreview'
import { EditorPanel } from './components/EditorPanel'
import { useResumeStore } from './stores/resumeStore'
import { exportPdf } from './utils/exportPdf'
import type { ResumeData } from './types/resume'

function App() {
  const { resume, resetResume, setResume } = useResumeStore()
  const previewRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [stars, setStars] = useState<number | null>(null)

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
      <header className="h-14 bg-white border-b flex items-center justify-between px-4">
        <h1 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          简历编辑器
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            {stars !== null && (
              <>
                <Star className="w-4 h-4" />
                <span className="text-sm font-medium">{stars}</span>
              </>
            )}
          </a>
        </h1>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <Save className="w-4 h-4" />
            保存
          </button>
          <button
            onClick={handleImport}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <Upload className="w-4 h-4" />
            导入
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
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <RotateCcw className="w-4 h-4" />
            重置
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Download className="w-4 h-4" />
            导出 PDF
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <ResumePreview ref={previewRef} />
        <EditorPanel />
      </div>
    </div>
  )
}

export default App
