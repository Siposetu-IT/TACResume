import React from 'react';
import { ResumeData } from '../../types';

interface Props {
  data: ResumeData;
}

export function ModernTemplate({ data }: Props) {
  return (
    <div className="p-8 bg-gradient-to-br from-indigo-50 to-white">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-900">{data.personalInfo.name}</h1>
        <div className="mt-2 text-indigo-600">
          <p>{data.personalInfo.email} • {data.personalInfo.phone}</p>
          <p>{data.personalInfo.location}</p>
        </div>
      </div>

      {data.personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-indigo-900 mb-3 border-b-2 border-indigo-200 pb-2">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-indigo-900 mb-3 border-b-2 border-indigo-200 pb-2">
            Experience
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-indigo-800">{exp.position}</h3>
                  <p className="text-indigo-600">{exp.company}</p>
                </div>
                <p className="text-sm text-indigo-500">
                  {new Date(exp.startDate).toLocaleDateString()} - 
                  {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
                </p>
              </div>
              <p className="mt-2 text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-indigo-900 mb-3 border-b-2 border-indigo-200 pb-2">
            Education
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-indigo-800">{edu.school}</h3>
                  <p className="text-indigo-600">{edu.degree} in {edu.field}</p>
                </div>
                <p className="text-sm text-indigo-500">
                  {new Date(edu.graduationDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {data.skills.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-indigo-900 mb-3 border-b-2 border-indigo-200 pb-2">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}