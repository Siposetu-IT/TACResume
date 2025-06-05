import React from 'react';
import { ResumeData } from '../types';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Props {
  data: ResumeData['education'];
  onChange: (data: ResumeData['education']) => void;
}

export function Education({ data, onChange }: Props) {
  const addEducation = () => {
    onChange([
      ...data,
      {
        id: crypto.randomUUID(),
        school: '',
        degree: '',
        field: '',
        graduationDate: '',
      },
    ]);
  };

  const updateEducation = (id: string, updates: Partial<ResumeData['education'][0]>) => {
    onChange(
      data.map((edu) => (edu.id === id ? { ...edu, ...updates } : edu))
    );
  };

  const removeEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Education</h2>
        <button
          type="button"
          onClick={addEducation}
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Education
        </button>
      </div>
      
      {data.map((education) => (
        <div key={education.id} className="border rounded-lg p-4 space-y-4 relative">
          <button
            onClick={() => removeEducation(education.id)}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">School</label>
              <input
                type="text"
                value={education.school}
                onChange={(e) => updateEducation(education.id, { school: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Degree</label>
              <input
                type="text"
                value={education.degree}
                onChange={(e) => updateEducation(education.id, { degree: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Field of Study</label>
              <input
                type="text"
                value={education.field}
                onChange={(e) => updateEducation(education.id, { field: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Graduation Date</label>
              <input
                type="date"
                value={education.graduationDate}
                onChange={(e) => updateEducation(education.id, { graduationDate: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}