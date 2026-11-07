import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Calendar, 
  CheckCircle, 
  ArrowUpRight,
  Sparkles,
  Building2
} from 'lucide-react';
import { Opportunity } from '../types';

interface OpportunitiesSectionProps {
  opportunities: Opportunity[];
  onApply: (opp: Opportunity) => void;
}

export const OpportunitiesSection: React.FC<OpportunitiesSectionProps> = ({
  opportunities,
  onApply
}) => {
  const [selectedType, setSelectedType] = useState<string>('All');

  const types = ['All', 'Internship', 'Research Assistantship', 'Campus Job'];

  const filteredOpps = opportunities.filter((opp) => {
    return selectedType === 'All' || opp.type === selectedType;
  });

  return (
    <section id="opportunities" className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
              <span>Career &amp; Research Portal</span>
              <span aria-hidden="true">·</span>
              <span>Campus Affiliated</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Internships &amp; Research Openings
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Curated undergraduate co-ops, laboratory fellowships, and teaching assistant positions for upcoming semesters.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  selectedType === t
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Opportunities List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredOpps.map((opp) => (
            <div
              key={opp.id}
              className="bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-semibold text-indigo-600">{opp.type}</span>
                  <span className="text-[11px] text-rose-600 font-medium">Due: {opp.deadline}</span>
                </div>

                <h3 className="text-base font-semibold text-slate-900 leading-snug">
                  {opp.title}
                </h3>

                <p className="text-xs font-medium text-slate-600 mt-1 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{opp.organization}</span>
                </p>

                <div className="mt-3.5 space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{opp.location}</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium text-emerald-700">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{opp.stipend}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                  {opp.description}
                </p>

                {/* Requirements checklist */}
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                    Prerequisites:
                  </span>
                  <ul className="space-y-1">
                    {opp.requirements.map((req, i) => (
                      <li key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                        <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100">
                <button
                  onClick={() => onApply(opp)}
                  className="w-full py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 border border-indigo-200"
                >
                  <span>View Details &amp; Apply</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
