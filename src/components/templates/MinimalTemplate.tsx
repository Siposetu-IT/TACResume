import React from 'react';
import { ResumeData } from '../../types';

interface Props {
  data: ResumeData;
}

export function MinimalTemplate({ data }: Props) {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-gray-900">{data.personalInfo.name}</h1>
        <div className="mt-2 text-gray-600 text-sm">
          <p>{data.personalInfo.email} • {data.personalInfo.phone}</p>
          <p>{data.personalInfo.location}</p>
        </div>
      </div>

      {data.personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-lg font-light text-gray-900 uppercase tracking-wider mb-3">
            Professional Summary
          </h2>
          <p className="text-gray-700">{data.personalInfo.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-light text-gray-900 uppercase tracking-wider mb-3">
            Experience
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{exp.position}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                </div>
                <p className="text-sm text-gray-500">
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
          <h2 className="text-lg font-light text-gray-900 uppercase tracking-wider mb-3">
            Education
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{edu.school}</h3>
                  <p className="text-gray-600">{edu.degree} in {edu.field}</p>
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(edu.graduationDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {data.skills.length > 0 && (
        <div>
          <h2 className="text-lg font-light text-gray-900 uppercase tracking-wider mb-3">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span key={skill} className="text-gray-700">
                {skill}
                {skill !== data.skills[data.skills.length - 1] && " •"}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}