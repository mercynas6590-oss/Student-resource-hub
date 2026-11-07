import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Bookmark, 
  BookmarkCheck, 
  Star, 
  FileText, 
  FileCheck, 
  Plus, 
  Calendar,
  Layers,
  ArrowUpDown,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Resource, ResourceCategory, User } from '../types';

interface ResourceLibraryProps {
  resources: Resource[];
  currentUser: User;
  onPreviewResource: (resource: Resource) => void;
  onDownloadResource: (resource: Resource) => void;
  onToggleBookmark: (resourceId: string) => void;
  onOpenAddResource: () => void;
  initialCategory?: string;
}

export const ResourceLibrary: React.FC<ResourceLibraryProps> = ({
  resources,
  currentUser,
  onPreviewResource,
  onDownloadResource,
  onToggleBookmark,
  onOpenAddResource,
  initialCategory
}) => {
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [sortBy, setSortBy] = useState<'downloads' | 'rating' | 'newest'>('downloads');

  const departments = ['All', 'Computer Science', 'Mathematics', 'Bioengineering', 'Economics', 'Electrical Engineering'];
  
  const categoryFilters = [
    { id: 'all', label: 'All Resources' },
    { id: 'lecture_notes', label: 'Lecture Notes' },
    { id: 'past_exam', label: 'Past Exams & Keys' },
    { id: 'study_guide', label: 'Study Guides' },
    { id: 'lab_manual', label: 'Lab Manuals' },
    { id: 'syllabus', label: 'Syllabi & HW' }
  ];

  const filteredResources = useMemo(() => {
    return resources.filter((res) => {
      const matchesSearch = 
        res.title.toLowerCase().includes(search.toLowerCase()) ||
        res.courseCode.toLowerCase().includes(search.toLowerCase()) ||
        res.courseName.toLowerCase().includes(search.toLowerCase()) ||
        res.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));

      const matchesDept = selectedDept === 'All' || res.department === selectedDept;
      const matchesCat = selectedCategory === 'all' || res.category === selectedCategory;

      return matchesSearch && matchesDept && matchesCat;
    }).sort((a, b) => {
      if (sortBy === 'downloads') return b.downloads - a.downloads;
      if (sortBy === 'rating') return b.rating - a.rating;
      return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
    });
  }, [resources, search, selectedDept, selectedCategory, sortBy]);

  const getCategoryLabel = (cat: ResourceCategory) => {
    switch (cat) {
      case 'lecture_notes': return 'Lecture Notes';
      case 'past_exam': return 'Past Exam';
      case 'study_guide': return 'Study Guide';
      case 'lab_manual': return 'Lab Manual';
      case 'syllabus': return 'Syllabus';
      default: return 'Document';
    }
  };

  return (
    <section id="resources" className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
              <span>Academic Repository</span>
              <span aria-hidden="true">·</span>
              <span>Peer &amp; Faculty Verified</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Study Resources &amp; Exam Archives
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Search comprehensive course materials, annotated lecture notes, and solved past exam papers.
            </p>
          </div>

          {/* Admin / Contributor Upload Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAddResource}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>{currentUser.role === 'faculty' ? 'Upload Course Material' : 'Submit Study Notes'}</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-8 space-y-4">
          
          {/* Row 1: Search + Department + Sort */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
            
            {/* Search Input */}
            <div className="lg:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by course code (e.g. CS 301, MATH 240) or topic..."
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-800 placeholder-slate-400"
              />
            </div>

            {/* Department Dropdown */}
            <div className="lg:col-span-3">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === 'All' ? 'All Academic Departments' : dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="lg:col-span-3 flex items-center gap-2">
              <div className="relative w-full">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full pl-8 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="downloads">Sort by: Most Downloaded</option>
                  <option value="rating">Sort by: Highest Rated</option>
                  <option value="newest">Sort by: Most Recent</option>
                </select>
              </div>
            </div>

          </div>

          {/* Row 2: Category Filter Segmented Controls */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200/60">
            {categoryFilters.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
            
            <span className="ml-auto text-xs text-slate-500 tabular-nums">
              Showing {filteredResources.length} {filteredResources.length === 1 ? 'material' : 'materials'}
            </span>
          </div>

        </div>

        {/* Resources Cards Grid */}
        {filteredResources.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-8">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-800">No matching study resources found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search terms, changing the department filter, or clearing your category selection.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedDept('All');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-indigo-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((res) => {
              const isSaved = currentUser.savedResourceIds.includes(res.id);

              return (
                <div
                  key={res.id}
                  className="group bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between p-5"
                >
                  {/* Card Header & Kicker (No Pill Sandwich, unboxed metadata with separators) */}
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-indigo-600 tracking-tight">{res.courseCode}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-slate-600 truncate">{res.department}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium shrink-0">{res.semester}</span>
                    </div>

                    {/* Primary Title */}
                    <h3 className="text-base font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                      {res.title}
                    </h3>

                    {/* Unboxed Metadata Line */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                      <span className="capitalize">{getCategoryLabel(res.category)}</span>
                      <span aria-hidden="true">·</span>
                      <span>{res.pages} pages</span>
                      <span aria-hidden="true">·</span>
                      <span>{res.fileSize}</span>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                      {res.description}
                    </p>

                    {/* Contributor / Verification info */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-1.5 truncate">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{res.uploadedBy.name}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-600 font-semibold shrink-0 tabular-nums">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{res.rating.toFixed(2)}</span>
                        <span className="text-slate-400 font-normal">({res.reviewsCount})</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onPreviewResource(res)}
                        className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1"
                        title="Read sample preview & summary"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>

                      <button
                        onClick={() => onToggleBookmark(res.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isSaved 
                            ? 'bg-amber-50 text-amber-600 border-amber-200' 
                            : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50 border-slate-200'
                        }`}
                        title={isSaved ? 'Saved to bookmarks' : 'Bookmark this resource'}
                      >
                        {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                    </div>

                    <button
                      onClick={() => onDownloadResource(res)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                      <span className="text-[10px] opacity-80 tabular-nums">({res.downloads})</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
