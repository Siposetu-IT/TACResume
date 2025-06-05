import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ResumeData } from '../types';

interface Props {
  data: ResumeData;
  onUpdate: (field: keyof ResumeData['personalInfo'], value: string) => void;
}

export function AIAssistant({ data, onUpdate }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateAIContent = async (prompt: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return text;
    } catch (err) {
      setError('Failed to generate content. Please try again.');
      console.error('Gemini API Error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const enhanceSummary = async () => {
    const prompt = `Please enhance this professional summary while maintaining its core message. Make it more impactful and professional: "${data.personalInfo.summary}"`;
    const enhanced = await generateAIContent(prompt);
    if (enhanced) {
      onUpdate('summary', enhanced);
    }
  };

  const suggestSkills = async () => {
    const prompt = `Based on this work experience, suggest relevant technical and soft skills:
      ${data.experience.map(exp => `
        Position: ${exp.position}
        Company: ${exp.company}
        Description: ${exp.description}
      `).join('\n')}`;
    
    const suggestions = await generateAIContent(prompt);
    if (suggestions) {
      // Parse and add suggested skills
      const skillsList = suggestions
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => !data.skills.includes(skill));
      
      // Update skills through parent component
      const updatedSkills = [...data.skills, ...skillsList];
      onUpdate('skills', updatedSkills.join(','));
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">AI Assistant</h2>
      
      <div className="flex flex-col gap-3">
        <button
          onClick={enhanceSummary}
          disabled={loading || !data.personalInfo.summary}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300"
        >
          {loading ? 'Enhancing...' : 'Enhance Summary'}
        </button>
        
        <button
          onClick={suggestSkills}
          disabled={loading || data.experience.length === 0}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300"
        >
          {loading ? 'Suggesting...' : 'Suggest Skills'}
        </button>
      </div>
      
      {error && (
        <div className="text-red-600 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}