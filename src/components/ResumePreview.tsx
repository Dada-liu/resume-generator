import { forwardRef, type ForwardedRef, useState, useEffect, useRef, useCallback } from 'react'
import { useResumeStore } from '../stores/resumeStore'
import { getTemplateById } from '../templates'

const RESUME_WIDTH = 794

export const ResumePreview = forwardRef<HTMLDivElement>((_, ref: ForwardedRef<HTMLDivElement>) => {
  const { resume, selectedTemplate } = useResumeStore()
  const template = getTemplateById(selectedTemplate)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  const updateScale = useCallback(() => {
    const container = containerRef.current
    if (!container) return
    const style = getComputedStyle(container)
    const paddingX = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight)
    const availableWidth = container.clientWidth - paddingX
    setScale(availableWidth < RESUME_WIDTH ? availableWidth / RESUME_WIDTH : 1)
  }, [])

  useEffect(() => {
    updateScale()
    const observer = new ResizeObserver(updateScale)
    if (containerRef.current) {
      observer.observe(containerRef.current)
    }
    return () => observer.disconnect()
  }, [updateScale])

  if (!template) {
    return (
      <div className="flex-1 bg-gray-200 p-2 sm:p-4 lg:p-8 flex justify-center items-center">
        <p className="text-gray-500">模板未找到</p>
      </div>
    )
  }

  const TemplateComponent = template.component
  const needsScale = scale < 1

  return (
    <div
      ref={containerRef}
      className="flex-1 bg-gray-200 p-2 sm:p-4 lg:p-8 flex justify-center overflow-auto min-w-0"
    >
      <div style={needsScale ? { width: RESUME_WIDTH * scale, overflow: 'hidden' } : undefined}>
        <div
          style={
            needsScale
              ? { transform: `scale(${scale})`, transformOrigin: 'top left', width: RESUME_WIDTH }
              : undefined
          }
        >
          <div ref={ref}>
            <TemplateComponent data={resume} />
          </div>
        </div>
      </div>
    </div>
  )
})
