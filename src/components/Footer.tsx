import React from 'react';
import { GraduationCap, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
  onOpenArchitectureModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenArchitectureModal
}) => {
  return (
    <footer className="bg-white border-t border-slate-200 py-12 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-slate-900 tracking-tight">
                Campus<span className="text-indigo-600">Core</span>
              </span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              Empowering student campus life &amp; academic success through open peer-verified course materials, exam archives, and university opportunities.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
              Academic Hub
            </h5>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-slate-900 transition-colors">
                  Lecture Notes Repository
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-slate-900 transition-colors">
                  Past Midterms &amp; Finals
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ebooks')} className="hover:text-slate-900 transition-colors">
                  Open Digital Textbooks
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-slate-900 transition-colors">
                  Lab Protocol Handbooks
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
              Campus Life &amp; Career
            </h5>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('campus-life')} className="hover:text-slate-900 transition-colors">
                  Upcoming Campus Events
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('campus-life')} className="hover:text-slate-900 transition-colors">
                  Student Clubs &amp; Hackathons
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('opportunities')} className="hover:text-slate-900 transition-colors">
                  Research Fellowships
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('opportunities')} className="hover:text-slate-900 transition-colors">
                  Undergraduate Co-Ops
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
              Architecture &amp; Data
            </h5>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenArchitectureModal} className="text-indigo-600 font-semibold hover:underline">
                  Step 1: UI/UX Wireframe &amp; Palette
                </button>
              </li>
              <li>
                <button onClick={onOpenArchitectureModal} className="text-indigo-600 font-semibold hover:underline">
                  Step 2: PostgreSQL Schema DDL
                </button>
              </li>
              <li>
                <span className="text-slate-400">FERPA &amp; Academic Fair Use Compliant</span>
              </li>
              <li>
                <span className="text-slate-400">Institutional SSO Enabled</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>© 2026 CampusCore Academic Commons. Built for University Students &amp; Faculty.</p>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Academic Integrity Guidelines</span>
            <span>·</span>
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Campus Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
