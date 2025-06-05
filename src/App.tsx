import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { DocumentDuplicateIcon, EyeIcon } from '@heroicons/react/24/outline';
import { PersonalInfo } from './components/PersonalInfo';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Skills } from './components/Skills';
import { Preview } from './components/Preview';
import { ResumeData } from './types';

const initialData: ResumeData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
  },
  experience: [],
  education: [],
  skills: [],
};

function App() {
  const [data, setData] = useState<ResumeData>(initialData);

  const exportToPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
          <button
            onClick={exportToPDF}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <DocumentDuplicateIcon className="h-5 w-5 mr-2" />
            Export PDF
          </button>
        </div>

        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-indigo-900/20 p-1 mb-8">
            <Tab className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${selected
                ? 'bg-white text-indigo-700 shadow'
                : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'
              }`
            }>
              Edit
            </Tab>
            <Tab className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${selected
                ? 'bg-white text-indigo-700 shadow'
                : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'
              }`
            }>
              <span className="flex items-center justify-center">
                <EyeIcon className="h-5 w-5 mr-2" />
                Preview
              </span>
            </Tab>
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <div className="space-y-8">
                <div className="bg-white shadow rounded-lg p-6">
                  <PersonalInfo
                    data={data.personalInfo}
                    onChange={(personalInfo) => setData({ ...data, personalInfo })}
                  />
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                  <Experience
                    data={data.experience}
                    onChange={(experience) => setData({ ...data, experience })}
                  />
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                  <Education
                    data={data.education}
                    onChange={(education) => setData({ ...data, education })}
                  />
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                  <Skills
                    data={data.skills}
                    onChange={(skills) => setData({ ...data, skills })}
                  />
                </div>
              </div>
            </Tab.Panel>

            <Tab.Panel>
              <Preview data={data} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}

export default App;