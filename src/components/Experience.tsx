import React from 'react';
import { ResumeData } from '../types';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Props {
  data: ResumeData['experience'];
  onChange: (data: ResumeData['experience']) => void;
}

export function Experience({ data, onChange }: Props) {
  const addExperience = () => {
    onChange([
      ...data,
      {
        id: crypto.randomUUID(),
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ]);
  };

  const updateExperience = (id: string, updates: Partial<ResumeData['experience'][0]>) => {
    onChange(
      data.map((exp) => (exp.id === id ? { ...exp, ...updates } : exp))
    );
  };

  const removeExperience = (id: string) => {
    onChange(data.filter((exp) => exp.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Work Experience</h2>
        <button
          type="button"
          onClick={addExperience}
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Experience
        </button>
      </div>
      
      {data.map((experience) => (
        <div key={experience.id} className="border rounded-lg p-4 space-y-4 relative">
          <button
            onClick={() => removeExperience(experience.id)}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <input
                type="text"
                value={experience.company}
                onChange={(e) => updateExperience(experience.id, { company: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <input
                type="text"
                value={experience.position}
                onChange={(e) => updateExperience(experience.id, { position: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                value={experience.startDate}
                onChange={(e) => updateExperience(experience.id, { startDate: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                value={experience.endDate}
                onChange={(e) => updateExperience(experience.id, { endDate: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              rows={3}
              value={experience.description}
              onChange={(e) => updateExperience(experience.id, { description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      ))}
    </div>
  );
}