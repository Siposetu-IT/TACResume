import React from 'react';
import { ResumeData } from '../types';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Props {
  data: ResumeData['skills'];
  onChange: (data: ResumeData['skills']) => void;
}

export function Skills({ data, onChange }: Props) {
  const [newSkill, setNewSkill] = React.useState('');

  const addSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    onChange(data.filter((s) => s !== skill));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Skills</h2>
      
      <form onSubmit={addSkill} className="flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add a skill..."
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add
        </button>
      </form>
      
      <div className="flex flex-wrap gap-2">
        {data.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="ml-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-indigo-600 hover:bg-indigo-200 hover:text-indigo-500 focus:bg-indigo-500 focus:text-white focus:outline-none"
            >
              <XMarkIcon className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}