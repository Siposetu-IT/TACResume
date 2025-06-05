export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  experience: {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    id: string;
    school: string;
    degree: string;
    field: string;
    graduationDate: string;
  }[];
  skills: string[];
}