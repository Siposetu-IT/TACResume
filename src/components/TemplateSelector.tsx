import React from 'react';
import { ResumeData } from '../types';

interface Props {
  selectedTemplate: ResumeData['template'];
  onSelect: (template: ResumeData['template']) => void;
}

export function TemplateSelector({ selectedTemplate, onSelect }: Props) {
  const templates: { id: ResumeData['template']; name: string; description: string }[] = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and contemporary design with bold headings and accent colors',
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional layout with a timeless, professional appearance',
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Streamlined design focusing on content with subtle styling',
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Structured layout with clear sections and balanced typography',
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Choose Template</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
              selectedTemplate === template.id
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
            onClick={() => onSelect(template.id)}
          >
            <h3 className="font-medium text-gray-900">{template.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{template.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}