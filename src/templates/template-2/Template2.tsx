import type { FC } from 'react'
import type { ResumeData } from '../../types/resume'

export const Template2: FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="w-full h-full bg-white p-8 font-sans">
      {/* 个人简历标题 */}
      <div className="text-center mb-6 pb-2 border-b border-gray-300">
        <h1 className="text-xl font-bold text-gray-800">个人简历</h1>
      </div>

      {/* 个人信息模块 */}
      <div className="flex justify-between mb-6">
        {/* 个人信息表格 */}
        <div className="flex-1">
          <table className="text-sm w-full">
            <tbody>
              <tr>
                <td className="py-1 font-medium text-gray-800 w-1/3">姓名</td>
                <td className="py-1 text-gray-600">{data.personalInfo.name || '姓名'}</td>
              </tr>
              <tr>
                <td className="py-1 font-medium text-gray-800">电话</td>
                <td className="py-1 text-gray-600">
                  {data.contacts.find(c => c.platform === '电话')?.value || '电话'}
                </td>
              </tr>
              <tr>
                <td className="py-1 font-medium text-gray-800">邮箱</td>
                <td className="py-1 text-gray-600">
                  {data.contacts.find(c => c.platform === '邮箱')?.value || '邮箱'}
                </td>
              </tr>
              <tr>
                <td className="py-1 font-medium text-gray-800">地址</td>
                <td className="py-1 text-gray-600">北京市朝阳区</td>
              </tr>
              <tr>
                <td className="py-1 font-medium text-gray-800">生日</td>
                <td className="py-1 text-gray-600">1995.06</td>
              </tr>
              <tr>
                <td className="py-1 font-medium text-gray-800">性别</td>
                <td className="py-1 text-gray-600">男</td>
              </tr>
              <tr>
                <td className="py-1 font-medium text-gray-800">现居地</td>
                <td className="py-1 text-gray-600">北京市</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 头像 */}
        {data.personalInfo.showAvatar !== false && (
          <div className="ml-6">
            {data.personalInfo.avatar ? (
              <img
                src={data.personalInfo.avatar}
                alt="头像"
                className={`w-16 h-16 object-cover ${data.personalInfo.avatarShape === 'circle' ? 'rounded-full' : 'rounded-none'}`}
              />
            ) : (
              <div className={`w-16 h-16 flex items-center justify-center ${data.personalInfo.avatarShape === 'circle' ? 'rounded-full bg-gray-200' : 'bg-gray-200'}`}>
                <span className="text-gray-400 text-xs">照片</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 教育背景模块 */}
      {data.educations.length > 0 && (
        <section className="mb-6">
          <h2 className="text-base font-bold text-gray-800 mb-2 pb-1 border-b border-gray-300">
            教育背景
          </h2>
          {data.educations.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-medium text-gray-700 text-sm">{edu.period || '时间段'}</p>
                  <p className="text-gray-600 text-sm">{edu.school || '学校'}</p>
                  <p className="text-gray-500 text-xs">
                    {edu.degree} | {edu.major}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* 工作经历模块 */}
      {data.experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-base font-bold text-gray-800 mb-2 pb-1 border-b border-gray-300">
            工作经历
          </h2>
          {data.experiences.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-medium text-gray-700 text-sm">{exp.period || '时间段'}</p>
                  <p className="text-gray-600 text-sm">{exp.company || '公司名称'}</p>
                  <p className="text-gray-500 text-xs">{exp.position}</p>
                </div>
              </div>
              {exp.responsibilities.length > 0 && (
                <ul className="list-disc list-inside text-gray-600 text-xs ml-2 mt-1">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="mb-0.5">{resp}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* 专业技能模块 */}
      {data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-base font-bold text-gray-800 mb-2 pb-1 border-b border-gray-300">
            专业技能
          </h2>
          <div className="grid grid-cols-1 gap-y-1">
            {data.skills.map((skill) => (
              <div key={skill.id} className="flex items-start">
                <span className="font-medium text-gray-700 text-sm flex-1">
                  {skill.name}
                </span>
                <span className="text-gray-600 text-xs">
                  {skill.description}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 自我评价模块 */}
      {data.selfIntroduction && (
        <section className="mb-6">
          <h2 className="text-base font-bold text-gray-800 mb-2 pb-1 border-b border-gray-300">
            自我评价
          </h2>
          <p className="text-gray-600 text-xs leading-relaxed indent-4">
            {data.selfIntroduction}
          </p>
        </section>
      )}
    </div>
  )
}
