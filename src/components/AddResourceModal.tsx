import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  FileText, 
  PlusCircle, 
  Check, 
  ShieldCheck,
  BookOpen
} from 'lucide-react';
import { Resource, ResourceCategory, User } from '../types';

interface AddResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onAddResource: (newResource: Resource) => void;
}

export const AddResourceModal: React.FC<AddResourceModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onAddResource
}) => {
  const [title, setTitle] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [department, setDepartment] = useState('Computer Science');
  const [category, setCategory] = useState<ResourceCategory>('lecture_notes');
  const [description, setDescription] = useState('');
  const [pages, setPages] = useState('18');
  const [semester, setSemester] = useState('Fall 2026');
  const [fileType, setFileType] = useState<'PDF' | 'DOCX' | 'ZIP'>('PDF');
  const [sampleSnippet, setSampleSnippet] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !courseCode) return;

    const newRes: Resource = {
      id: `res_${Date.now()}`,
      title,
      courseCode: courseCode.toUpperCase(),
      courseName: courseName || 'Academic Course Material',
      department,
      category,
      fileType,
      fileSize: `${(Math.random() * 4 + 1.2).toFixed(1)} MB`,
      downloads: 1,
      rating: 5.0,
      reviewsCount: 1,
      uploadDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      uploadedBy: {
        name: currentUser.name,
        role: currentUser.role === 'faculty' ? 'Faculty Contributor' : 'Verified Student Contributor',
        verified: currentUser.role === 'faculty'
      },
      semester,
      pages: parseInt(pages) || 12,
      description: description || 'Comprehensive academic study materials and notes submitted for campus repository.',
      tags: [department, courseCode.toUpperCase(), category.replace('_', ' ')],
      sampleContentSnippet: sampleSnippet || `OFFICIAL REPOSITORY CONTRIBUTION\nCourse: ${courseCode}\nSemester: ${semester}\nVerified notes and formula sets.`
    };

    onAddResource(newRes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
      >
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {currentUser.role === 'faculty' ? 'Publish Faculty Course Material' : 'Submit Student Study Material'}
              </h3>
              <p className="text-xs text-slate-500">
                Uploaded as {currentUser.name} ({currentUser.role.toUpperCase()})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Course Code *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. CS 301, MATH 240"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-mono uppercase"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Semester *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Fall 2026"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Document Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Distributed Consensus & Raft Exam Review Sheet"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Bioengineering">Bioengineering</option>
                <option value="Economics">Economics</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Resource Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              >
                <option value="lecture_notes">Lecture Notes</option>
                <option value="past_exam">Past Exam & Solutions</option>
                <option value="study_guide">Study Guide / Formula Sheet</option>
                <option value="lab_manual">Lab Manual</option>
                <option value="syllabus">Syllabus & Problem Sets</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Course Material Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain key topics covered, problem sets, and review advice..."
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Sample Excerpt / Key Solution Notes
            </label>
            <textarea
              rows={3}
              value={sampleSnippet}
              onChange={(e) => setSampleSnippet(e.target.value)}
              placeholder="Paste sample theorem, formula, or exam solution excerpt..."
              className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-800"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-[11px] text-slate-500 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Auto-verified with campus institutional checksum
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs"
              >
                Publish Material
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};
