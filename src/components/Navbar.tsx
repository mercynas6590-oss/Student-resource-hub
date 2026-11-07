import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  Bell, 
  BookOpen, 
  Calendar, 
  Briefcase, 
  Layers, 
  UserCheck, 
  ShieldAlert, 
  Menu, 
  X,
  CheckCircle2,
  Database
} from 'lucide-react';
import { User, NotificationItem } from '../types';

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  currentUser: User;
  onSwitchRole: () => void;
  onOpenAuthModal: () => void;
  onOpenArchitectureModal: () => void;
  notifications: NotificationItem[];
  onMarkNotificationsRead: () => void;
  onSearchClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  currentUser,
  onSwitchRole,
  onOpenAuthModal,
  onOpenArchitectureModal,
  notifications,
  onMarkNotificationsRead,
  onSearchClick
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'resources', label: 'Study Resources' },
    { id: 'ebooks', label: 'E-Books' },
    { id: 'campus-life', label: 'Campus Life' },
    { id: 'opportunities', label: 'Opportunities' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16">
          
          {/* Zone 1: Single text element Brand Zone with collegiate crest */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => onNavigate('home')} 
              className="flex items-center gap-2.5 text-left group focus:outline-hidden"
            >
              <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs group-hover:bg-indigo-700 transition-colors">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap">
                Campus<span className="text-indigo-600">Core</span>
              </span>
            </button>
          </div>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                  activeSection === link.id
                    ? 'border-indigo-600 text-indigo-600 font-semibold'
                    : 'border-transparent hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={onOpenArchitectureModal}
              className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors whitespace-nowrap shrink-0"
              title="View UI/UX Wireframes & SQL Database Schema"
            >
              <Database className="w-3.5 h-3.5 text-indigo-600" />
              <span>Specs & Schema</span>
            </button>
          </nav>

          {/* Zone 3: Primary Actions (Search trigger, Role Switcher, Notifications, Profile) */}
          <div className="flex items-center gap-2.5 shrink-0">
            
            {/* Quick Spotlight Search Trigger */}
            <button
              onClick={onSearchClick}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-500 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors border border-slate-200"
              aria-label="Quick search resources and events"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Search...</span>
            </button>

            {/* Role Switcher Pill for Testing Student vs Faculty */}
            <button
              onClick={onSwitchRole}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                currentUser.role === 'faculty'
                  ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                  : 'bg-indigo-50 text-indigo-900 border-indigo-200 hover:bg-indigo-100'
              }`}
              title="Click to toggle between Student and Faculty / Admin permissions"
            >
              {currentUser.role === 'faculty' ? (
                <>
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                  <span className="hidden sm:inline">Role: Faculty/Admin</span>
                  <span className="sm:hidden">Faculty</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="hidden sm:inline">Role: Student</span>
                  <span className="sm:hidden">Student</span>
                </>
              )}
            </button>

            {/* Notifications Popover */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
                )}
              </button>

              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Campus Alerts</span>
                    {unreadCount > 0 && (
                      <button 
                        onClick={() => {
                          onMarkNotificationsRead();
                        }}
                        className="text-xs text-indigo-600 hover:underline flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        Mark read
                      </button>
                    )}
                  </div>
                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        className={`px-4 py-3 hover:bg-slate-50 transition-colors ${!notif.read ? 'bg-indigo-50/40' : ''}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-semibold text-slate-900">{notif.title}</p>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">{notif.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{notif.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Avatar / Auth Modal Trigger */}
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-slate-100 transition-colors group"
              title="Click to view Account / Switch Credentials"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20 group-hover:ring-indigo-500/50"
              />
              <span className="hidden xl:inline text-xs font-semibold text-slate-700 max-w-[100px] truncate">
                {currentUser.name}
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                activeSection === link.id
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                onOpenArchitectureModal();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-2"
            >
              <Database className="w-4 h-4 text-indigo-600" />
              <span>Specs & SQL Database Schema</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
