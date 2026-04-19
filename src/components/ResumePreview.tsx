import { forwardRef, type ForwardedRef } from 'react'
import { useResumeStore } from '../stores/resumeStore'

export const ResumePreview = forwardRef<HTMLDivElement>((_, ref: ForwardedRef<HTMLDivElement>) => {
  const { resume } = useResumeStore()

  return (
    <div className="flex-1 bg-gray-200 p-8 flex justify-center overflow-auto">
      <div
        ref={ref}
        className="bg-white w-[210mm] min-h-[297mm] shadow-lg p-8 text-sm relative"
      >
        {/* Left Column - 1/3 */}
        <div className="w-1/3 absolute top-4 left-0 h-[calc(100%-32px)] pt-6 pb-6 rounded-r-lg flex flex-col">
          {/* Avatar - Outside gray background */}
          <div className="mb-12 flex justify-center relative">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-10 bg-gray-200" />
            <div className="relative">
              
              {resume.personalInfo.avatar ? (
                <img
                  src={resume.personalInfo.avatar}
                  alt="头像"
                  className="w-36 h-36 rounded-full object-cover mb-4"
                />
              ) : (
                <div className="w-36 h-36 rounded-full bg-gray-200 flex items-center justify-center mb-4 outline-2 outline-gray-300">
                  <span className="text-gray-400 text-2xl">照片</span>
                </div>
              )}
            </div>
          </div>

          {/* Gray background for rest */}
          <div className="bg-gray-100 p-4 pt-10 -mt-2 grow">

            {/* Self Introduction */}
            {resume.selfIntroduction && (
              <section className="mb-16">
                <h2 className="text-base font-semibold text-gray-800 mb-2">
                  自我介绍
                </h2>
                <p className="text-gray-600 text-xs leading-relaxed whitespace-pre-wrap">
                  {resume.selfIntroduction}
                </p>
              </section>
            )}

            {/* Education */}
            {resume.educations.length > 0 && (
              <section className="mb-16">
                <h2 className="text-base font-semibold text-gray-800 mb-2">
                  教育经历
                </h2>
                {resume.educations.map((edu) => (
                  <div key={edu.id} className="mb-3">
                    <p className="font-medium text-gray-700 text-xs">
                      {edu.school || '学校'}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {edu.degree} | {edu.major}
                    </p>
                    {edu.period && (
                      <p className="text-gray-400 text-xs">{edu.period}</p>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Contact */}
            {resume.contacts.length > 0 && (
              <section className="mb-16">
                <h2 className="text-base font-semibold text-gray-800 mb-2">
                  联系方式
                </h2>
                {resume.contacts.map((contact) => (
                  <p key={contact.id} className="text-gray-600 text-xs mb-1">
                    {contact.platform}: {contact.value}
                  </p>
                ))}
              </section>
            )}
          </div>
        </div>

        {/* Right Column - 2/3 */}
        <div className="w-2/3 absolute top-20 right-0 h-[calc(100%-32px)] pr-8 pt-6 pl-12">
          {/* Name and Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              {resume.personalInfo.name || '姓名'}
            </h1>
            <div className="flex">
              <p className="text-gray-600 mb-1 flex-1">
                {resume.personalInfo.jobTitle || '求职岗位'}
              </p>
              {resume.personalInfo.workYears && (
                <p className="text-gray-500 text-xs flex-1">
                  工作年限: {resume.personalInfo.workYears}
                </p>
              )}
            </div>

          </div>

          {/* Experience */}
          {resume.experiences.length > 0 && (
            <section className="mb-10">
              <h2 className="text-base font-semibold text-gray-800 mb-2">
                工作经历
              </h2>
              {resume.experiences.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="font-medium text-gray-700 text-xs">
                        {exp.company || '公司名称'}
                      </p>
                      <p className="text-gray-500 text-xs">{exp.position}</p>
                    </div>
                    <span className="text-gray-400 text-xs">
                      {exp.period || '时间段'}
                    </span>
                  </div>
                  {exp.responsibilities.length > 0 && (
                    <ul className="list-disc list-inside text-gray-600 text-xs">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {resume.skills.length > 0 && (
            <section className="mb-10">
              <h2 className="text-base font-semibold text-gray-800 mb-2">
                专业技能
              </h2>
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                  >
                    {skill.name}
                    {skill.description && ` - ${skill.description}`}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {resume.projects.length > 0 && (
            <section className="mb-10">
              <h2 className="text-base font-semibold text-gray-800 mb-2">
                项目介绍
              </h2>
              {resume.projects.map((project) => (
                <div key={project.id} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="font-medium text-gray-700 text-xs">
                        {project.name || '项目名称'}
                      </p>
                      {project.role && (
                        <p className="text-gray-500 text-xs">
                          担任角色: {project.role}
                        </p>
                      )}
                    </div>
                    <span className="text-gray-400 text-xs">
                      {project.period || '时间段'}
                    </span>
                  </div>
                  {project.description && (
                    <p className="text-gray-600 text-xs mb-1">
                      {project.description}
                    </p>
                  )}
                  {project.details && (
                    <p className="text-gray-500 text-xs mb-1">
                      {project.details}
                    </p>
                  )}
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  )
})
