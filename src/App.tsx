import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ResourceLibrary } from './components/ResourceLibrary';
import { EBooksSection } from './components/EBooksSection';
import { CampusLifeSection } from './components/CampusLifeSection';
import { OpportunitiesSection } from './components/OpportunitiesSection';
import { DownloadModal } from './components/DownloadModal';
import { EBookReaderModal } from './components/EBookReaderModal';
import { AuthModal } from './components/AuthModal';
import { AddResourceModal } from './components/AddResourceModal';
import { ArchitectureModal } from './components/ArchitectureModal';
import { SpotlightSearchModal } from './components/SpotlightSearchModal';
import { Footer } from './components/Footer';

import { 
  User, 
  Resource, 
  EBook, 
  CampusEvent, 
  Opportunity, 
  NotificationItem 
} from './types';
import { 
  initialStudentUser, 
  initialAdminUser, 
  sampleResources, 
  sampleEBooks, 
  sampleEvents, 
  sampleOpportunities, 
  sampleNotifications 
} from './data/mockData';
import { triggerDirectDownload } from './utils/fileDownloader';
import { CheckCircle2, Bookmark, Download, Sparkles } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User>(initialStudentUser);
  const [resources, setResources] = useState<Resource[]>(sampleResources);
  const [ebooks, setEbooks] = useState<EBook[]>(sampleEBooks);
  const [events, setEvents] = useState<CampusEvent[]>(sampleEvents);
  const [opportunities] = useState<Opportunity[]>(sampleOpportunities);
  const [notifications, setNotifications] = useState<NotificationItem[]>(sampleNotifications);
  
  const [activeSection, setActiveSection] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategoryShortcut, setSelectedCategoryShortcut] = useState<string>('all');

  // Modal States
  const [previewResource, setPreviewResource] = useState<Resource | null>(null);
  const [readerEbook, setReaderEbook] = useState<EBook | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [addResourceModalOpen, setAddResourceModalOpen] = useState<boolean>(false);
  const [architectureModalOpen, setArchitectureModalOpen] = useState<boolean>(false);
  const [spotlightOpen, setSpotlightOpen] = useState<boolean>(false);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  // Keyboard shortcut for Cmd+K spotlight search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSpotlightOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Role toggle quick switch
  const handleSwitchRole = () => {
    if (currentUser.role === 'student') {
      setCurrentUser(initialAdminUser);
      showToast('Switched to Faculty / Administrator Persona (Upload & verification permissions granted)');
    } else {
      setCurrentUser(initialStudentUser);
      showToast('Switched to Student Persona (Undergraduate learning mode)');
    }
  };

  // Navigation handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Bookmark toggle
  const handleToggleBookmark = (resourceId: string) => {
    setCurrentUser(prev => {
      const isSaved = prev.savedResourceIds.includes(resourceId);
      const newSaved = isSaved 
        ? prev.savedResourceIds.filter(id => id !== resourceId)
        : [...prev.savedResourceIds, resourceId];
      
      showToast(isSaved ? 'Removed from saved items' : 'Saved to personal student library!');
      return { ...prev, savedResourceIds: newSaved };
    });
  };

  // RSVP toggle
  const handleToggleRSVP = (eventId: string) => {
    const isAlreadyRsvpd = currentUser.rsvpdEventIds.includes(eventId);
    
    setCurrentUser(prev => {
      const newRsvps = isAlreadyRsvpd
        ? prev.rsvpdEventIds.filter(id => id !== eventId)
        : [...prev.rsvpdEventIds, eventId];
      return { ...prev, rsvpdEventIds: newRsvps };
    });

    setEvents(prev => prev.map(evt => {
      if (evt.id === eventId) {
        return {
          ...evt,
          attendeesCount: isAlreadyRsvpd ? evt.attendeesCount - 1 : evt.attendeesCount + 1
        };
      }
      return evt;
    }));

    showToast(isAlreadyRsvpd ? 'Cancelled event RSVP' : 'Seat confirmed! Added to your campus schedule.');
  };

  // Direct download handler from cards
  const handleDirectDownload = async (resource: Resource) => {
    const res = await triggerDirectDownload(resource);
    setResources(prev => prev.map(r => r.id === resource.id ? { ...r, downloads: r.downloads + 1 } : r));
    showToast(`Downloaded verified file: ${res.filename}`);
  };

  // Direct download for EBook
  const handleEbookDownload = async (ebook: EBook) => {
    const res = await triggerDirectDownload(ebook);
    setEbooks(prev => prev.map(b => b.id === ebook.id ? { ...b, downloads: b.downloads + 1 } : b));
    showToast(`Downloaded digital e-book package: ${res.filename}`);
  };

  // Add new resource from modal
  const handleAddResource = (newRes: Resource) => {
    setResources(prev => [newRes, ...prev]);
    showToast(`Published: "${newRes.title}" is now live in the repository!`);
  };

  // Apply to opportunity
  const handleApplyOpportunity = (opp: Opportunity) => {
    showToast(`Opening institutional application portal for ${opp.title} (${opp.organization})`);
  };

  // Mark all notifications read
  const handleMarkNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      
      {/* Sticky Navigation conforming to Top Bar Contract */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onSwitchRole={handleSwitchRole}
        onOpenAuthModal={() => setAuthModalOpen(true)}
        onOpenArchitectureModal={() => setArchitectureModalOpen(true)}
        notifications={notifications}
        onMarkNotificationsRead={handleMarkNotificationsRead}
        onSearchClick={() => setSpotlightOpen(true)}
      />

      {/* Main Content Layout */}
      <main className="flex-1">
        
        {/* School-Themed Academic Hero Section */}
        <HeroSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectCategoryShortcut={(cat) => {
            setSelectedCategoryShortcut(cat);
            handleNavigate('resources');
          }}
          onNavigate={handleNavigate}
          stats={{
            totalResources: resources.reduce((acc, r) => acc + r.downloads, 0),
            totalEbooks: ebooks.length,
            upcomingEvents: events.length,
            openOpportunities: opportunities.length
          }}
        />

        {/* Study Resource Library & Exam Archives */}
        <ResourceLibrary
          resources={resources}
          currentUser={currentUser}
          onPreviewResource={(res) => setPreviewResource(res)}
          onDownloadResource={handleDirectDownload}
          onToggleBookmark={handleToggleBookmark}
          onOpenAddResource={() => setAddResourceModalOpen(true)}
          initialCategory={selectedCategoryShortcut}
        />

        {/* Curated E-Books & Open Textbooks */}
        <EBooksSection
          ebooks={ebooks}
          currentUser={currentUser}
          onPreviewEbook={(bk) => setReaderEbook(bk)}
          onDownloadEbook={handleEbookDownload}
          onToggleBookmark={handleToggleBookmark}
        />

        {/* Campus Life & What's Happening feed */}
        <CampusLifeSection
          events={events}
          currentUser={currentUser}
          onToggleRSVP={handleToggleRSVP}
          onOpenAddEvent={() => setAddResourceModalOpen(true)}
        />

        {/* Opportunities, Research & Co-Ops */}
        <OpportunitiesSection
          opportunities={opportunities}
          onApply={handleApplyOpportunity}
        />

      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenArchitectureModal={() => setArchitectureModalOpen(true)}
      />

      {/* Interactive Modals */}

      {/* 1. Document Download & Preview Modal */}
      <DownloadModal
        resource={previewResource}
        onClose={() => setPreviewResource(null)}
        onDownloaded={(filename) => {
          showToast(`File "${filename}" saved successfully to downloads.`);
        }}
      />

      {/* 2. E-Book Reader & Chapter Preview Modal */}
      <EBookReaderModal
        ebook={readerEbook}
        onClose={() => setReaderEbook(null)}
        onDownloaded={(filename) => {
          showToast(`E-Book "${filename}" saved successfully.`);
        }}
      />

      {/* 3. Auth & Persona Switcher Modal */}
      <AuthModal
        currentUser={currentUser}
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSelectUser={(u) => {
          setCurrentUser(u);
          showToast(`Active Profile: Signed in as ${u.name} (${u.role.toUpperCase()})`);
        }}
      />

      {/* 4. Add Resource / Publish Modal */}
      <AddResourceModal
        isOpen={addResourceModalOpen}
        onClose={() => setAddResourceModalOpen(false)}
        currentUser={currentUser}
        onAddResource={handleAddResource}
      />

      {/* 5. Architectural Blueprint & Relational Schema Modal */}
      <ArchitectureModal
        isOpen={architectureModalOpen}
        onClose={() => setArchitectureModalOpen(false)}
      />

      {/* 6. Spotlight Search Modal (⌘K) */}
      <SpotlightSearchModal
        isOpen={spotlightOpen}
        onClose={() => setSpotlightOpen(false)}
        resources={resources}
        ebooks={ebooks}
        events={events}
        opportunities={opportunities}
        onSelectResource={(res) => setPreviewResource(res)}
        onSelectEbook={(bk) => setReaderEbook(bk)}
        onSelectEvent={(evt) => {
          handleNavigate('campus-life');
        }}
      />

      {/* Live Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-800 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200 max-w-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs leading-relaxed">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
