import React from 'react';
import { 
  Search, 
  FileText, 
  BookOpen, 
  Calendar, 
  Briefcase, 
  CheckCircle, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectCategoryShortcut: (category: string) => void;
  onNavigate: (section: string) => void;
  stats: {
    totalResources: number;
    totalEbooks: number;
    upcomingEvents: number;
    openOpportunities: number;
  };
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  onSelectCategoryShortcut,
  onNavigate,
  stats
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-indigo-50/50 via-white to-slate-50 border-b border-slate-200">
      
      {/* Decorative campus pattern grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#4f46e5 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-14 lg:pb-18">
        
        {/* Main 2-Column Split: Editorial Value Proposition & Campus Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Mission, Search, and Quick Action Rails */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Academic Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block" />
              <span>University Academic Commons & Life Portal</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] text-balance">
              Empowering Student Campus Life &amp; <span className="text-indigo-600">Academic Success</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Access peer-verified lecture notes, solved past exam archives, digital textbook libraries, campus club events, and exclusive undergraduate research fellowships.
            </p>

            {/* Unified Search Bar */}
            <div className="pt-2">
              <div className="relative flex items-center shadow-md rounded-2xl bg-white border border-slate-200 p-2 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all">
                <Search className="w-5 h-5 text-slate-400 ml-2.5 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search lecture notes, past exams, textbooks, hackathons, or internships..."
                  className="w-full px-3 py-2 text-sm sm:text-base text-slate-800 placeholder-slate-400 bg-transparent focus:outline-hidden"
                />
                <button
                  onClick={() => onNavigate('resources')}
                  className="shrink-0 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-xs"
                >
                  Explore Hub
                </button>
              </div>

              {/* Quick Jump Category Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-3 text-xs text-slate-500">
                <span className="font-medium text-slate-700">Quick Filters:</span>
                <button 
                  onClick={() => onSelectCategoryShortcut('past_exam')}
                  className="px-2.5 py-1 bg-white hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 rounded-md transition-colors"
                >
                  Past Midterms &amp; Finals
                </button>
                <button 
                  onClick={() => onSelectCategoryShortcut('lecture_notes')}
                  className="px-2.5 py-1 bg-white hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 rounded-md transition-colors"
                >
                  Raft / Distributed Systems
                </button>
                <button 
                  onClick={() => onSelectCategoryShortcut('study_guide')}
                  className="px-2.5 py-1 bg-white hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 rounded-md transition-colors"
                >
                  Linear Algebra Cram Sheet
                </button>
                <button 
                  onClick={() => onNavigate('campus-life')}
                  className="px-2.5 py-1 bg-white hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 rounded-md transition-colors"
                >
                  Hackathons
                </button>
              </div>
            </div>

            {/* Trust Markers */}
            <div className="flex items-center gap-6 pt-2 text-xs text-slate-500 border-t border-slate-200/60">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>100% Verified Faculty &amp; TA Materials</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Direct Academic Fair-Use Downloads</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-Fidelity Campus Photo + Floating Quick Context Banner */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Main Architectural Campus Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 aspect-16/10 lg:aspect-4/3 bg-slate-100">
                <img
                  src="/src/assets/images/campus_hero_banner_1794039452688.jpg"
                  alt="University Campus Library Commons"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                
                {/* Subtle scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
                
                {/* Overlay Badge at Bottom of Card */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-white/90 backdrop-blur-md border border-white/40 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900">Campus Commons Study Center</p>
                      <p className="text-[11px] text-slate-500">Open 24/7 during Midterm &amp; Final Weeks · Hall B</p>
                    </div>
                    <button 
                      onClick={() => onNavigate('campus-life')}
                      className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-semibold rounded-lg transition-colors flex items-center gap-1"
                    >
                      <span>Events</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Verified Quality Tag */}
              <div className="hidden sm:flex absolute -top-4 -left-4 bg-white rounded-xl shadow-lg border border-slate-200 p-3 items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Dean's Honor Syllabus</p>
                  <p className="text-[11px] text-slate-500">Peer reviewed by 12+ Depts</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4-Column Metric Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-200">
          
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Active Study Materials</span>
              <FileText className="w-4 h-4 text-indigo-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900 mt-2 tabular-nums">
              {stats.totalResources.toLocaleString()}+
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">Notes, past exams &amp; manuals</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Digital Textbooks</span>
              <BookOpen className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900 mt-2 tabular-nums">
              {stats.totalEbooks.toLocaleString()}+
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">Full open-licensed e-books</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Upcoming Campus Events</span>
              <Calendar className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900 mt-2 tabular-nums">
              {stats.upcomingEvents}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">Hackathons, fairs &amp; workshops</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Co-Ops &amp; Research</span>
              <Briefcase className="w-4 h-4 text-indigo-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900 mt-2 tabular-nums">
              {stats.openOpportunities}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">Funded research &amp; fellowships</p>
          </div>

        </div>

      </div>
    </div>
  );
};
