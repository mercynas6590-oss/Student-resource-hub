import React, { useState } from 'react';
import { 
  X, 
  GraduationCap, 
  ShieldCheck, 
  User, 
  CheckCircle, 
  Lock, 
  Mail, 
  Building,
  KeyRound,
  ArrowRight
} from 'lucide-react';
import { User as UserType, UserRole } from '../types';
import { initialStudentUser, initialAdminUser } from '../data/mockData';

interface AuthModalProps {
  currentUser: UserType;
  isOpen: boolean;
  onClose: () => void;
  onSelectUser: (user: UserType) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  currentUser,
  isOpen,
  onClose,
  onSelectUser
}) => {
  const [tab, setTab] = useState<'switch' | 'login'>('switch');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');

  if (!isOpen) return null;

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const customUser: UserType = {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email: email,
      role: role,
      avatar: role === 'faculty' 
        ? initialAdminUser.avatar
        : initialStudentUser.avatar,
      university: 'Metropolitan Institute of Technology',
      major: role === 'faculty' ? 'Faculty of Sciences' : 'Undergraduate Studies',
      gradYear: role === 'faculty' ? 2012 : 2027,
      studentId: role === 'faculty' ? 'FAC-99120' : 'STU-440219',
      savedResourceIds: [],
      rsvpdEventIds: []
    };

    onSelectUser(customUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
      >
        {/* Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Campus SSO &amp; Role Identity
              </h3>
              <p className="text-xs text-slate-500">
                Manage your credentials or test Role-Based Access Control
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 bg-slate-100/60 p-1">
          <button
            onClick={() => setTab('switch')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              tab === 'switch'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Quick Role Switcher (Live Demo)
          </button>
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              tab === 'login'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            University SSO Sign In
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {tab === 'switch' ? (
            <div className="space-y-4">
              <p className="text-xs text-slate-600">
                Select an active persona below to experience the hub from the perspective of an undergraduate student or a verified faculty administrator:
              </p>

              {/* Persona 1: Student */}
              <div 
                onClick={() => {
                  onSelectUser(initialStudentUser);
                  onClose();
                }}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                  currentUser.role === 'student'
                    ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <img
                  src={initialStudentUser.avatar}
                  alt={initialStudentUser.name}
                  className="w-11 h-11 rounded-full object-cover shrink-0 ring-2 ring-indigo-500/20"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">{initialStudentUser.name}</span>
                    <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      Student Profile
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{initialStudentUser.major} · Class of {initialStudentUser.gradYear}</p>
                  <p className="text-[11px] text-slate-400 mt-1 font-mono">ID: {initialStudentUser.studentId} · {initialStudentUser.email}</p>
                  
                  <div className="mt-2 text-[11px] text-slate-500 border-t border-slate-200/60 pt-2 flex items-center gap-3">
                    <span>✓ Download Resources</span>
                    <span>✓ RSVP Events</span>
                    <span>✓ Save Bookmarks</span>
                  </div>
                </div>
              </div>

              {/* Persona 2: Faculty */}
              <div 
                onClick={() => {
                  onSelectUser(initialAdminUser);
                  onClose();
                }}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                  currentUser.role === 'faculty'
                    ? 'border-amber-600 bg-amber-50/50 ring-2 ring-amber-500/20'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <img
                  src={initialAdminUser.avatar}
                  alt={initialAdminUser.name}
                  className="w-11 h-11 rounded-full object-cover shrink-0 ring-2 ring-amber-500/20"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">{initialAdminUser.name}</span>
                    <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Faculty / Administrator
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{initialAdminUser.major}</p>
                  <p className="text-[11px] text-slate-400 mt-1 font-mono">ID: {initialAdminUser.studentId} · {initialAdminUser.email}</p>
                  
                  <div className="mt-2 text-[11px] text-slate-500 border-t border-slate-200/60 pt-2 flex items-center gap-3">
                    <span>✓ Upload Course Materials</span>
                    <span>✓ Verify Submissions</span>
                    <span>✓ Post Campus Events</span>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <form onSubmit={handleCustomLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  University Email (.edu)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@campus.edu"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Role Identity
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                      role === 'student'
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('faculty')}
                    className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                      role === 'faculty'
                        ? 'border-amber-600 bg-amber-50 text-amber-700 font-semibold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Faculty / Administrator
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors mt-2"
              >
                Sign In with Campus SSO
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>Protected with 256-bit Student Data Privacy</span>
          <button onClick={onClose} className="hover:underline text-slate-600">Close</button>
        </div>

      </div>
    </div>
  );
};
