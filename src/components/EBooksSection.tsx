import React, { useState } from 'react';
import { 
  BookOpen, 
  Download, 
  Eye, 
  Star, 
  Bookmark, 
  BookmarkCheck,
  Check, 
  Sparkles,
  Search,
  BookMarked
} from 'lucide-react';
import { EBook, User } from '../types';

interface EBooksSectionProps {
  ebooks: EBook[];
  currentUser: User;
  onPreviewEbook: (ebook: EBook) => void;
  onDownloadEbook: (ebook: EBook) => void;
  onToggleBookmark: (ebookId: string) => void;
}

export const EBooksSection: React.FC<EBooksSectionProps> = ({
  ebooks,
  currentUser,
  onPreviewEbook,
  onDownloadEbook,
  onToggleBookmark
}) => {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const filteredBooks = ebooks.filter((bk) => {
    const matchesDept = selectedDept === 'All' || bk.department === selectedDept;
    const matchesSearch = 
      bk.title.toLowerCase().includes(search.toLowerCase()) ||
      bk.author.toLowerCase().includes(search.toLowerCase()) ||
      bk.department.toLowerCase().includes(search.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <section id="ebooks" className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 uppercase tracking-wider">
              <span>Campus Digital Library</span>
              <span aria-hidden="true">·</span>
              <span>Open Academic License</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Curated E-Books &amp; Textbooks
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Core academic textbooks, reference manuals, and open access literature licensed for enrolled students.
            </p>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Computer Science', 'Mathematics', 'Economics'].map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  selectedDept === dept
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Ebooks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => {
            const isSaved = currentUser.savedResourceIds.includes(book.id);

            return (
              <div
                key={book.id}
                className="group bg-white rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
              >
                {/* Book Cover Visual with Gradient Spine */}
                <div className={`p-6 bg-gradient-to-br ${book.coverGradient} text-white flex flex-col justify-between h-48 relative overflow-hidden`}>
                  <div className="flex items-center justify-between text-xs font-medium opacity-85">
                    <span>{book.department}</span>
                    <span className="font-mono">{book.publishedYear}</span>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold leading-snug line-clamp-2">
                      {book.title}
                    </h4>
                    <p className="text-xs text-white/80 mt-1 line-clamp-1">
                      {book.author}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-white/70 pt-2 border-t border-white/20">
                    <span>{book.edition}</span>
                    <span>{book.pages} pages</span>
                  </div>
                </div>

                {/* Book Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata Line */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                      <span className="font-mono text-[11px] text-slate-400">ISBN: {book.isbn.split('-')[1]}...</span>
                      <span aria-hidden="true">·</span>
                      <span>{book.fileSize}</span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {book.overview}
                    </p>

                    {/* Chapters preview count */}
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                      <BookMarked className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{book.chapters.length} Key Syllabus Chapters</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onPreviewEbook(book)}
                        className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1"
                        title="Read chapter breakdown & table of contents"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Chapters</span>
                      </button>

                      <button
                        onClick={() => onToggleBookmark(book.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isSaved 
                            ? 'bg-amber-50 text-amber-600 border-amber-200' 
                            : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50 border-slate-200'
                        }`}
                        title={isSaved ? 'Saved to library' : 'Save book'}
                      >
                        {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                    </div>

                    <button
                      onClick={() => onDownloadEbook(book)}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-2xs transition-colors flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>E-Pub</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
