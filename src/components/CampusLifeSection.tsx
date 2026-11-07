import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Video, 
  Check, 
  Plus, 
  Sparkles,
  Tag,
  Clock,
  ExternalLink
} from 'lucide-react';
import { CampusEvent, EventCategory, User } from '../types';

interface CampusLifeSectionProps {
  events: CampusEvent[];
  currentUser: User;
  onToggleRSVP: (eventId: string) => void;
  onOpenAddEvent?: () => void;
}

export const CampusLifeSection: React.FC<CampusLifeSectionProps> = ({
  events,
  currentUser,
  onToggleRSVP,
  onOpenAddEvent
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Hackathon', 'Career', 'Academic', 'Social', 'Club'];

  const filteredEvents = events.filter((evt) => {
    return selectedCategory === 'All' || evt.category === selectedCategory;
  });

  return (
    <section id="campus-life" className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 uppercase tracking-wider">
              <span>Campus Pulse &amp; Student Unions</span>
              <span aria-hidden="true">·</span>
              <span>Live Feed</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              What’s Happening on Campus
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Stay connected with club showcases, tech hackathons, academic symposia, and career roundtables.
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  selectedCategory === cat
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => {
            const isRsvpd = currentUser.rsvpdEventIds.includes(evt.id);

            return (
              <div
                key={evt.id}
                className="group bg-white rounded-xl border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between p-5"
              >
                <div>
                  {/* Top unboxed metadata line */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-semibold text-amber-700 uppercase tracking-wider text-[11px]">
                      {evt.category}
                    </span>
                    {evt.isVirtual && (
                      <span className="flex items-center gap-1 text-indigo-600 text-[11px] font-medium">
                        <Video className="w-3 h-3" />
                        Virtual Hybrid
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-semibold text-slate-900 group-hover:text-amber-700 transition-colors leading-snug">
                    {evt.title}
                  </h3>

                  {/* Organizer */}
                  <p className="text-xs text-slate-500 mt-1">
                    Hosted by {evt.organizer}
                  </p>

                  {/* Date & Time Pill-free Details */}
                  <div className="mt-4 space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-medium text-slate-800">{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{evt.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                    {evt.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {evt.tags.map(tag => (
                      <span key={tag} className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer RSVP Action */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span className="tabular-nums font-medium text-slate-700">
                      {evt.attendeesCount + (isRsvpd && !currentUser.rsvpdEventIds.includes(evt.id) ? 1 : 0)} Attending
                    </span>
                    {evt.maxCapacity && (
                      <span className="text-[11px] text-slate-400">/ {evt.maxCapacity} cap</span>
                    )}
                  </div>

                  <button
                    onClick={() => onToggleRSVP(evt.id)}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                      isRsvpd
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
                        : 'bg-amber-600 hover:bg-amber-700 text-white shadow-2xs'
                    }`}
                  >
                    {isRsvpd ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>RSVP'd</span>
                      </>
                    ) : (
                      <span>RSVP Seat</span>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
