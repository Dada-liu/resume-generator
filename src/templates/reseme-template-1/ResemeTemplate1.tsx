import type { FC } from 'react'
import type { ResumeData } from '../../types/resume'

export const ResemeTemplate1: FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="bg-white w-[210mm] min-h-[297mm] shadow-lg p-8 text-sm relative">
      {/* 个人信息模块 */}
      <section className="mb-8">
        <div className="flex items-start gap-6">
          {/* 头像 */}
          {data.personalInfo.showAvatar !== false && (
            <div className="flex-shrink-0">
              {data.personalInfo.avatar ? (
                <img
                  src={data.personalInfo.avatar}
                  alt="头像"
                  className="w-20 h-20 rounded object-cover"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded">
                  <span className="text-gray-400 text-sm">照片</span>
                </div>
              )}
            </div>
          )}

          {/* 个人信息 */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-blue-600 mb-1">
              {data.personalInfo.name || '姓名'}
            </h1>
            <p className="text-gray-600 mb-2">
              {data.personalInfo.jobTitle || '求职岗位'}
            </p>

            {/* 联系方式 */}
            <div className="flex flex-wrap gap-4 text-xs text-gray-500">
              {data.contacts.length > 0 && data.contacts.map((contact) => (
                <p key={contact.id} className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                  {contact.platform}: {contact.value}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 求职意向模块 */}
      <section className="mb-8 p-4 border-l-4 border-blue-600 bg-blue-50">
        <h2 className="text-base font-bold text-blue-600 mb-3">求职意向</h2>
        <div className="space-y-2 text-xs text-gray-700">
          {data.personalInfo.jobTitle && (
            <div className="flex">
              <span className="w-24 font-medium">期望职位:</span>
              <span>{data.personalInfo.jobTitle}</span>
            </div>
          )}
          {data.personalInfo.workYears && (
            <div className="flex">
              <span className="w-24 font-medium">工作年限:</span>
              <span>{data.personalInfo.workYears}</span>
            </div>
          )}
        </div>
      </section>

      {/* 工作经历模块 */}
      {data.experiences.length > 0 && (
        <section className="mb-8">
          <h2 className="text-base font-bold text-blue-600 mb-3 pl-2 border-l-4 border-blue-600">
            工作经历
          </h2>
          {data.experiences.map((exp) => (
            <div key={exp.id} className="mb-5">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    {exp.company || '公司名称'}
                  </p>
                  <p className="text-xs text-blue-600">{exp.position}</p>
                </div>
                <span className="text-xs text-gray-500">{exp.period || '时间段'}</span>
              </div>
              {exp.responsibilities.length > 0 && (
                <ul className="list-disc list-inside text-xs text-gray-600 mt-1 space-y-0.5">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* 教育经历模块 */}
      {data.educations.length > 0 && (
        <section className="mb-8">
          <h2 className="text-base font-bold text-blue-600 mb-3 pl-2 border-l-4 border-blue-600">
            教育经历
          </h2>
          {data.educations.map((edu) => (
            <div key={edu.id} className="mb-5">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    {edu.school || '学校'}
                  </p>
                  <p className="text-xs text-blue-600">
                    {edu.degree} | {edu.major}
                  </p>
                </div>
                <span className="text-xs text-gray-500">{edu.period}</span>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* 项目经历模块 */}
      {data.projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-base font-bold text-blue-600 mb-3 pl-2 border-l-4 border-blue-600">
            项目经历
          </h2>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-5">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    {project.name || '项目名称'}
                  </p>
                  {project.role && (
                    <p className="text-xs text-gray-500">担任角色: {project.role}</p>
                  )}
                </div>
                <span className="text-xs text-gray-500">{project.period || '时间段'}</span>
              </div>
              {project.description && (
                <p className="text-xs text-gray-600 mb-1">{project.description}</p>
              )}
              {project.details && (
                <p className="text-xs text-gray-500 mb-1">{project.details}</p>
              )}
              {project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-blue-600"
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

      {/* 专业技能模块 */}
      {data.skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-base font-bold text-blue-600 mb-3 pl-2 border-l-4 border-blue-600">
            专业技能
          </h2>
          <div className="space-y-3">
            {data.skills.map((skill) => (
              <div key={skill.id}>
                <p className="text-sm font-bold text-gray-800 mb-1">{skill.name}</p>
                {skill.description && (
                  <p className="text-xs text-gray-600">{skill.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 自我介绍模块 */}
      {data.selfIntroduction && (
        <section className="mb-8">
          <h2 className="text-base font-bold text-blue-600 mb-3 pl-2 border-l-4 border-blue-600">
            自我介绍
          </h2>
          <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">
            {data.selfIntroduction}
          </p>
        </section>
      )}
    </div>
  )
}
