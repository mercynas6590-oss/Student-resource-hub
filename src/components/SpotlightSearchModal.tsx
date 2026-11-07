import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  FileText, 
  BookOpen, 
  Calendar, 
  Briefcase, 
  ArrowRight 
} from 'lucide-react';
import { Resource, EBook, CampusEvent, Opportunity } from '../types';

interface SpotlightSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  resources: Resource[];
  ebooks: EBook[];
  events: CampusEvent[];
  opportunities: Opportunity[];
  onSelectResource: (res: Resource) => void;
  onSelectEbook: (ebk: EBook) => void;
  onSelectEvent: (evt: CampusEvent) => void;
}

export const SpotlightSearchModal: React.FC<SpotlightSearchModalProps> = ({
  isOpen,
  onClose,
  resources,
  ebooks,
  events,
  opportunities,
  onSelectResource,
  onSelectEbook,
  onSelectEvent
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase();

  const matchedResources = q ? resources.filter(r => 
    r.title.toLowerCase().includes(q) || 
    r.courseCode.toLowerCase().includes(q) || 
    r.department.toLowerCase().includes(q)
  ).slice(0, 4) : [];

  const matchedEbooks = q ? ebooks.filter(b => 
    b.title.toLowerCase().includes(q) || 
    b.author.toLowerCase().includes(q)
  ).slice(0, 3) : [];

  const matchedEvents = q ? events.filter(e => 
    e.title.toLowerCase().includes(q) || 
    e.category.toLowerCase().includes(q) ||
    e.location.toLowerCase().includes(q)
  ).slice(0, 3) : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-indigo-600 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Quick search across notes, exams, books, events, or co-ops..."
            className="w-full text-sm sm:text-base bg-transparent focus:outline-hidden text-slate-900 placeholder-slate-400"
          />
          <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] font-mono bg-white rounded border border-slate-300 text-slate-400">ESC</kbd>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Area */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
          {!query ? (
            <div className="py-8 text-center text-xs text-slate-400">
              <p>Type to search across all campus academic resources, e-books, and club events...</p>
              <div className="flex justify-center gap-2 mt-3">
                <button 
                  onClick={() => setQuery('CS 301')} 
                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-600"
                >
                  Try "CS 301"
                </button>
                <button 
                  onClick={() => setQuery('Algorithms')} 
                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-600"
                >
                  Try "Algorithms"
                </button>
                <button 
                  onClick={() => setQuery('Hackathon')} 
                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-600"
                >
                  Try "Hackathon"
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {matchedResources.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-2">
                    Study Resources &amp; Exams ({matchedResources.length})
                  </span>
                  <div className="space-y-1">
                    {matchedResources.map((res) => (
                      <div
                        key={res.id}
                        onClick={() => {
                          onSelectResource(res);
                          onClose();
                        }}
                        className="p-2.5 rounded-lg hover:bg-indigo-50/60 cursor-pointer transition-colors flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                          <div>
                            <p className="text-xs font-semibold text-slate-900 group-hover:text-indigo-600">
                              <span className="font-bold text-indigo-600 mr-1.5">{res.courseCode}</span>
                              {res.title}
                            </p>
                            <p className="text-[11px] text-slate-400">{res.department} · {res.category.replace('_', ' ')} · {res.fileSize}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchedEbooks.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-2">
                    E-Books ({matchedEbooks.length})
                  </span>
                  <div className="space-y-1">
                    {matchedEbooks.map((bk) => (
                      <div
                        key={bk.id}
                        onClick={() => {
                          onSelectEbook(bk);
                          onClose();
                        }}
                        className="p-2.5 rounded-lg hover:bg-emerald-50/60 cursor-pointer transition-colors flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <BookOpen className="w-4 h-4 text-emerald-600 shrink-0" />
                          <div>
                            <p className="text-xs font-semibold text-slate-900 group-hover:text-emerald-700">
                              {bk.title}
                            </p>
                            <p className="text-[11px] text-slate-400">{bk.author} · {bk.edition}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchedEvents.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-2">
                    Campus Events ({matchedEvents.length})
                  </span>
                  <div className="space-y-1">
                    {matchedEvents.map((evt) => (
                      <div
                        key={evt.id}
                        onClick={() => {
                          onSelectEvent(evt);
                          onClose();
                        }}
                        className="p-2.5 rounded-lg hover:bg-amber-50/60 cursor-pointer transition-colors flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                          <div>
                            <p className="text-xs font-semibold text-slate-900 group-hover:text-amber-700">
                              {evt.title}
                            </p>
                            <p className="text-[11px] text-slate-400">{evt.date} · {evt.location}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-700 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchedResources.length === 0 && matchedEbooks.length === 0 && matchedEvents.length === 0 && (
                <div className="py-8 text-center text-xs text-slate-500">
                  No matching results for "{query}".
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-400">
          Press <kbd className="font-mono bg-white px-1 py-0.5 rounded border border-slate-300">ESC</kbd> to close spotlight
        </div>

      </div>
    </div>
  );
};
