import React, { useState } from 'react';
import { 
  X, 
  Palette, 
  Database, 
  Layers, 
  Copy, 
  Check, 
  FileCode,
  LayoutGrid,
  Shield,
  Sparkles
} from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'uiux' | 'schema'>('uiux');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const colorPalette = [
    { name: 'Collegiate Indigo (Primary Brand)', hex: '#4F46E5', role: '60-30-10 Focus Accent, Primary CTAs, Active States', rgb: 'rgb(79, 70, 229)' },
    { name: 'Deep Academic Slate (Canvas Text)', hex: '#0F172A', role: 'Primary Typography, High Contrast Headings', rgb: 'rgb(15, 23, 42)' },
    { name: 'Pure Canvas Neutral (Background)', hex: '#F8FAFC', role: '60% Main Viewport Canvas & Ground Surface', rgb: 'rgb(248, 250, 252)' },
    { name: 'Structural Card Surface', hex: '#FFFFFF', role: 'Elevated Cards, Hairline Dividers, Modals', rgb: 'rgb(255, 255, 255)' },
    { name: 'Academic Emerald (Verified/E-Books)', hex: '#059669', role: 'Peer Verification Badges, E-Book Library Spine', rgb: 'rgb(5, 150, 105)' },
    { name: 'Campus Amber (Events & Hackathons)', hex: '#D97706', role: 'Events Feed, Workshop Badges, Ratings', rgb: 'rgb(217, 119, 6)' },
    { name: 'Hairline Structural Border', hex: '#E2E8F0', role: '1px hairline dividers, subtle boundaries', rgb: 'rgb(226, 232, 240)' }
  ];

  const sqlSchemaCode = `-- ============================================================================
-- CAMPUSCORE STUDENT RESOURCE & CAMPUS LIFE HUB - PRODUCTION RELATIONAL SCHEMA
-- Database: PostgreSQL 15+ / Supabase / Neon
-- ============================================================================

-- 1. EXTENSIONS & ENUMS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE user_role AS ENUM ('student', 'faculty', 'admin', 'alumni');
CREATE TYPE resource_category AS ENUM (
  'lecture_notes', 
  'past_exam', 
  'study_guide', 
  'syllabus', 
  'lab_manual', 
  'assignment_solution'
);
CREATE TYPE event_category AS ENUM (
  'Academic', 
  'Workshop', 
  'Career', 
  'Club', 
  'Social', 
  'Hackathon'
);
CREATE TYPE file_format AS ENUM ('PDF', 'DOCX', 'EPUB', 'ZIP');

-- 2. USERS TABLE
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_or_faculty_id VARCHAR(32) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(120) NOT NULL,
  role user_role NOT NULL DEFAULT 'student',
  avatar_url TEXT,
  university_name VARCHAR(160) NOT NULL DEFAULT 'Metropolitan Institute of Technology',
  department VARCHAR(120) NOT NULL,
  graduation_year INT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. COURSES TABLE
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_code VARCHAR(16) UNIQUE NOT NULL, -- e.g. 'CS 301'
  course_name VARCHAR(200) NOT NULL,       -- e.g. 'Distributed Operating Systems'
  department VARCHAR(120) NOT NULL,
  credits INT NOT NULL DEFAULT 4,
  description TEXT
);

-- 4. ACADEMIC RESOURCES (Notes, Past Exams, Study Guides)
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  uploader_id UUID REFERENCES users(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  category resource_category NOT NULL,
  file_url TEXT NOT NULL,
  file_format file_format NOT NULL DEFAULT 'PDF',
  file_size_bytes BIGINT NOT NULL,
  semester VARCHAR(32) NOT NULL, -- e.g. 'Fall 2026'
  page_count INT NOT NULL DEFAULT 1,
  download_count INT NOT NULL DEFAULT 0,
  rating_avg NUMERIC(3,2) NOT NULL DEFAULT 5.00,
  reviews_count INT NOT NULL DEFAULT 0,
  description TEXT,
  verified_by_faculty BOOLEAN DEFAULT FALSE,
  sample_excerpt TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. DIGITAL E-BOOKS & TEXTBOOKS
CREATE TABLE ebooks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  isbn VARCHAR(32) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  authors TEXT NOT NULL,
  edition VARCHAR(64) NOT NULL,
  department VARCHAR(120) NOT NULL,
  published_year INT NOT NULL,
  page_count INT NOT NULL,
  file_url TEXT NOT NULL,
  file_size_bytes BIGINT NOT NULL,
  download_count INT NOT NULL DEFAULT 0,
  cover_gradient VARCHAR(64) DEFAULT 'from-blue-600 to-indigo-900',
  overview TEXT NOT NULL,
  chapters JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. CAMPUS EVENTS & ACTIVITIES
CREATE TABLE campus_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  category event_category NOT NULL,
  organizer VARCHAR(160) NOT NULL,
  event_date DATE NOT NULL,
  start_time TIME NOT NULL,
  location VARCHAR(200) NOT NULL,
  is_virtual BOOLEAN DEFAULT FALSE,
  virtual_meeting_url TEXT,
  max_capacity INT,
  attendees_count INT DEFAULT 0,
  description TEXT NOT NULL,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. EVENT RSVPs (Many-to-Many with Unique Constraint)
CREATE TABLE event_rsvps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES campus_events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rsvpd_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

-- 8. BOOKMARKS & SAVED RESOURCES
CREATE TABLE user_saved_resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  resource_id UUID REFERENCES resources(id) ON DELETE CASCADE,
  ebook_id UUID REFERENCES ebooks(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT check_at_least_one CHECK (
    (resource_id IS NOT NULL AND ebook_id IS NULL) OR 
    (resource_id IS NULL AND ebook_id IS NOT NULL)
  )
);

-- 9. PERFORMANCE INDEXES
CREATE INDEX idx_resources_course_id ON resources(course_id);
CREATE INDEX idx_resources_category ON resources(category);
CREATE INDEX idx_resources_download_count ON resources(download_count DESC);
CREATE INDEX idx_events_date ON campus_events(event_date);
CREATE INDEX idx_events_category ON campus_events(category);
CREATE INDEX idx_rsvps_user ON event_rsvps(user_id);
CREATE INDEX idx_saved_resources_user ON user_saved_resources(user_id);`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlSchemaCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        role="dialog"
      >
        {/* Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Technical Deliverables &amp; Architectural Blueprint
              </h3>
              <p className="text-xs text-slate-500">
                Step 1: UI/UX Wireframe &amp; Palette · Step 2: Relational PostgreSQL Schema
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

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 bg-slate-100/60 p-1 shrink-0">
          <button
            onClick={() => setActiveTab('uiux')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'uiux'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Step 1: UI/UX Wireframe &amp; Palette Spec</span>
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'schema'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Step 2: Relational Database Schema (SQL)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'uiux' ? (
            <div className="space-y-6">
              
              {/* Wireframe Hierarchy */}
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4 text-indigo-600" />
                  <span>UI/UX Wireframe Structure &amp; Layout Blueprint</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
                  <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1.5">
                    <span className="font-bold text-indigo-600 block">1. Sticky Navigation (Top Bar Contract)</span>
                    <p className="text-slate-600 leading-relaxed">
                      Single-line brand wordmark + 5 primary section links + spotlight search shortcut (⌘K) + unread campus alerts popover + live Student vs Faculty persona toggle.
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1.5">
                    <span className="font-bold text-indigo-600 block">2. Academic Commons Hero Section</span>
                    <p className="text-slate-600 leading-relaxed">
                      12-column balanced split layout: mission statement, unified instant search bar with quick jump chips, and architectural library photography + 4-column live KPI strip.
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1.5">
                    <span className="font-bold text-indigo-600 block">3. Multi-Faceted Resource Library</span>
                    <p className="text-slate-600 leading-relaxed">
                      Segmented category filter (Lecture Notes, Past Exams, Study Guides, Lab Manuals) + Department selector + Card grid with unboxed metadata (no pill sandwiches) and direct downloads.
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1.5">
                    <span className="font-bold text-indigo-600 block">4. Campus Life &amp; Opportunities Feed</span>
                    <p className="text-slate-600 leading-relaxed">
                      Dynamic event cards with real-time RSVP state tracking, virtual hybrid flags, venue specs, and undergraduate co-ops/fellowships with hourly stipends.
                    </p>
                  </div>
                </div>
              </div>

              {/* Color Palette Spec */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-indigo-600" />
                  <span>Color Palette &amp; Contrast System (60-30-10 Rule)</span>
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {colorPalette.map((col) => (
                    <div key={col.hex} className="p-3 rounded-xl border border-slate-200 bg-white flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-lg shadow-inner shrink-0 border border-slate-200" 
                        style={{ backgroundColor: col.hex }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 truncate">{col.name}</span>
                          <span className="text-xs font-mono font-semibold text-indigo-600">{col.hex}</span>
                        </div>
                        <span className="text-[11px] text-slate-500 block truncate">{col.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <h5 className="font-bold text-slate-900">Typography Scale Pairing</h5>
                <p>
                  <strong>Display &amp; Headings:</strong> <em>Plus Jakarta Sans</em> (SemiBold 600, Bold 700, ExtraBold 800) for energetic academic authority.<br />
                  <strong>Body Copy:</strong> <em>Plus Jakarta Sans</em> (Regular 400, Medium 500) at 15–16px with 1.6 line height.<br />
                  <strong>Data &amp; Code:</strong> <em>JetBrains Mono</em> (Tabular Numerals, ISBNs, Course Codes, JSON/SQL).
                </p>
              </div>

            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    PostgreSQL Production DDL (Step 2)
                  </h4>
                  <p className="text-xs text-slate-500">
                    Relational data models covering Users, Courses, Resources, E-Books, Campus Events, and RSVPs.
                  </p>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors flex items-center gap-1.5 border border-indigo-200"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied to Clipboard' : 'Copy SQL Schema'}</span>
                </button>
              </div>

              <div className="bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-xs overflow-x-auto max-h-[460px] border border-slate-800 leading-relaxed select-all">
                <pre>{sqlSchemaCode}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            Engineered in accordance with the Frontend Design Constitution &amp; Full-Stack Guidelines.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
          >
            Close Blueprint
          </button>
        </div>

      </div>
    </div>
  );
};
