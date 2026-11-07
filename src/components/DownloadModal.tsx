import React, { useState } from 'react';
import { 
  X, 
  Download, 
  FileText, 
  CheckCircle2, 
  Calendar, 
  Star, 
  Eye, 
  ShieldCheck, 
  Loader2,
  Share2,
  Sparkles
} from 'lucide-react';
import { Resource } from '../types';
import { triggerDirectDownload } from '../utils/fileDownloader';

interface DownloadModalProps {
  resource: Resource | null;
  onClose: () => void;
  onDownloaded: (filename: string) => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  resource,
  onClose,
  onDownloaded
}) => {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  if (!resource) return null;

  const handleDownload = async () => {
    setDownloading(true);
    setProgress(15);
    
    // Simulate real network retrieval / signature verification
    const timer1 = setTimeout(() => setProgress(55), 250);
    const timer2 = setTimeout(() => setProgress(90), 500);

    setTimeout(async () => {
      setProgress(100);
      const res = await triggerDirectDownload(resource);
      setDownloading(false);
      setProgress(0);
      onDownloaded(res.filename);
    }, 850);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-1">
              <span>{resource.courseCode}</span>
              <span aria-hidden="true">·</span>
              <span>{resource.courseName}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500">{resource.semester}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              {resource.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* File Verification & Details Pill-free strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Format</span>
              <span className="font-bold text-slate-800">{resource.fileType} Document</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">File Size</span>
              <span className="font-bold text-slate-800 tabular-nums">{resource.fileSize}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Pages</span>
              <span className="font-bold text-slate-800 tabular-nums">{resource.pages} Pages</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Downloads</span>
              <span className="font-bold text-indigo-600 tabular-nums">{resource.downloads.toLocaleString()}</span>
            </div>
          </div>

          {/* Uploader & Verification Badge */}
          <div className="flex items-center justify-between text-xs text-slate-600 p-3 rounded-lg bg-indigo-50/50 border border-indigo-100">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Uploaded by <strong className="text-slate-800">{resource.uploadedBy.name}</strong> ({resource.uploadedBy.role})</span>
            </div>
            <div className="flex items-center gap-1 font-semibold text-amber-700 tabular-nums">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{resource.rating.toFixed(2)} / 5.0</span>
            </div>
          </div>

          {/* Description & Overview */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Material Summary
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {resource.description}
            </p>
          </div>

          {/* Sample Snippet / Content Excerpt */}
          {resource.sampleContentSnippet && (
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Verified Document Excerpt &amp; Key Formulae
              </h4>
              <div className="bg-slate-900 text-slate-100 p-3.5 rounded-xl font-mono text-[11px] leading-relaxed max-h-40 overflow-y-auto border border-slate-800 select-all">
                <pre className="whitespace-pre-wrap">{resource.sampleContentSnippet}</pre>
              </div>
            </div>
          )}

          {/* Download Progress Bar if downloading */}
          {downloading && (
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                  Generating verified academic download package...
                </span>
                <span className="font-mono text-indigo-600 font-bold">{progress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <p className="text-[11px] text-slate-500">
            Licensed under Campus Academic Fair Use Policy.
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200/70 rounded-lg transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleDownload}
              disabled={downloading}
              className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              {downloading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Preparing...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Direct Download ({resource.fileSize})</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
