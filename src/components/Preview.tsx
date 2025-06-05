import React from 'react';
import { ResumeData } from '../types';
import { ModernTemplate } from './templates/ModernTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { ProfessionalTemplate } from './templates/ProfessionalTemplate';

interface Props {
  data: ResumeData;
}

export function Preview({ data }: Props) {
  const templates = {
    modern: ModernTemplate,
    classic: ClassicTemplate,
    minimal: MinimalTemplate,
    professional: ProfessionalTemplate,
  };

  const SelectedTemplate = templates[data.template];

  return (
    <div className="resume-preview max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <SelectedTemplate data={data} />
    </div>
  );
}