export type UserRole = 'student' | 'admin' | 'faculty';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  university: string;
  major: string;
  gradYear: number;
  studentId: string;
  savedResourceIds: string[];
  rsvpdEventIds: string[];
}

export type ResourceCategory = 
  | 'lecture_notes' 
  | 'past_exam' 
  | 'study_guide' 
  | 'syllabus' 
  | 'assignment_solution'
  | 'lab_manual';

export interface Resource {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  department: string;
  category: ResourceCategory;
  fileType: 'PDF' | 'DOCX' | 'EPUB' | 'ZIP';
  fileSize: string;
  downloads: number;
  rating: number;
  reviewsCount: number;
  uploadDate: string;
  uploadedBy: {
    name: string;
    role: string;
    verified: boolean;
  };
  semester: string;
  pages: number;
  description: string;
  tags: string[];
  sampleContentSnippet?: string;
}

export interface EBook {
  id: string;
  title: string;
  author: string;
  edition: string;
  isbn: string;
  coverImage?: string;
  coverGradient: string;
  department: string;
  pages: number;
  rating: number;
  fileSize: string;
  downloads: number;
  publishedYear: number;
  overview: string;
  chapters: string[];
}

export type EventCategory = 'Academic' | 'Workshop' | 'Career' | 'Club' | 'Social' | 'Hackathon';

export interface CampusEvent {
  id: string;
  title: string;
  category: EventCategory;
  organizer: string;
  date: string;
  time: string;
  location: string;
  attendeesCount: number;
  maxCapacity?: number;
  description: string;
  isVirtual: boolean;
  tags: string[];
  image?: string;
}

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  type: 'Internship' | 'Research Assistantship' | 'Fellowship' | 'Campus Job';
  location: string;
  stipend: string;
  deadline: string;
  department: string;
  description: string;
  requirements: string[];
  applyLink: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'academic' | 'event' | 'opportunity' | 'system';
}
