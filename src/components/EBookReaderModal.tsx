import React, { useState } from 'react';
import { 
  X, 
  Download, 
  BookOpen, 
  Bookmark, 
  ChevronRight, 
  CheckCircle2, 
  Loader2 
} from 'lucide-react';
import { EBook } from '../types';
import { triggerDirectDownload } from '../utils/fileDownloader';

interface EBookReaderModalProps {
  ebook: EBook | null;
  onClose: () => void;
  onDownloaded: (filename: string) => void;
}

export const EBookReaderModal: React.FC<EBookReaderModalProps> = ({
  ebook,
  onClose,
  onDownloaded
}) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [downloading, setDownloading] = useState(false);

  if (!ebook) return null;

  const handleDownload = async () => {
    setDownloading(true);
    setTimeout(async () => {
      const res = await triggerDirectDownload(ebook);
      setDownloading(false);
      onDownloaded(res.filename);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
      >
        {/* Top Header */}
        <div className={`p-6 bg-gradient-to-r ${ebook.coverGradient} text-white flex items-start justify-between gap-4`}>
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold opacity-80 mb-1">
              Campus Open Textbook · {ebook.department}
            </div>
            <h3 className="text-xl font-bold leading-snug">
              {ebook.title}
            </h3>
            <p className="text-xs text-white/90 mt-1">
              {ebook.author} · {ebook.edition}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Split Layout with Table of Contents & Reading Pane */}
        <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          
          {/* Left Column: Chapters / Table of contents */}
          <div className="md:col-span-5 p-4 bg-slate-50 max-h-96 overflow-y-auto">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2 px-2">
              Table of Contents ({ebook.chapters.length})
            </span>
            <div className="space-y-1">
              {ebook.chapters.map((ch, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveChapterIndex(idx)}
                  className={`w-full text-left p-2.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    activeChapterIndex === idx
                      ? 'bg-white text-emerald-800 shadow-xs border border-emerald-200 font-semibold'
                      : 'text-slate-600 hover:bg-slate-200/60'
                  }`}
                >
                  <span className="truncate">
                    <span className="text-slate-400 mr-1.5 font-mono">0{idx + 1}.</span>
                    {ch}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Syllabus Context & Chapter Brief */}
          <div className="md:col-span-7 p-6 space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <span>Selected Module:</span>
                <span className="font-mono text-emerald-700 font-semibold">Chapter {activeChapterIndex + 1}</span>
              </div>
              <h4 className="text-base font-bold text-slate-900">
                {ebook.chapters[activeChapterIndex]}
              </h4>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {ebook.overview}
            </p>

            <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-3.5 text-xs text-emerald-950 space-y-1">
              <span className="font-semibold block text-emerald-900">Academic Reading Goals:</span>
              <p className="text-[11px] leading-relaxed text-emerald-800">
                Master core theoretical concepts, examine solved worked examples in section problem sets, and review practice algorithmic drills for midterm evaluation.
              </p>
            </div>

            <div className="pt-2 text-[11px] text-slate-500 space-y-1">
              <div><strong>ISBN:</strong> <span className="font-mono">{ebook.isbn}</span></div>
              <div><strong>Digital Size:</strong> {ebook.fileSize} ({ebook.pages} Total Pages)</div>
              <div><strong>Global University Downloads:</strong> {ebook.downloads.toLocaleString()}</div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <span className="text-[11px] text-slate-500">
            Complimentary access provided by University Libraries Consortium.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200/70 rounded-lg transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              {downloading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Preparing E-Book...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download E-Pub &amp; Notes</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
