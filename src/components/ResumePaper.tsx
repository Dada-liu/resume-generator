import type { FC, ReactNode } from 'react'

interface ResumePaperProps {
  children: ReactNode
}

export const ResumePaper: FC<ResumePaperProps> = ({ children }) => {
  return (
    <div className="bg-white w-[210mm] min-h-[297mm] shadow-lg p-8 text-sm relative">
      {children}
    </div>
  )
}
