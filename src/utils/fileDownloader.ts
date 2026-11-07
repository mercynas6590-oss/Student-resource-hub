import { Resource, EBook } from '../types';

export function triggerDirectDownload(resource: Resource | EBook): Promise<{ success: boolean; filename: string }> {
  return new Promise((resolve) => {
    const isEbook = 'isbn' in resource;
    const titleClean = resource.title.replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `${isEbook ? 'EBook' : (resource as Resource).courseCode}_${titleClean}.txt`;

    let content = `========================================================================\n`;
    content += `CAMPUSCORE ACADEMIC REPOSITORY - OFFICIAL DIGITAL DISTRIBUTION\n`;
    content += `Empowering Student Campus Life & Academic Success\n`;
    content += `========================================================================\n\n`;
    content += `TITLE: ${resource.title}\n`;
    content += `DEPARTMENT: ${resource.department}\n`;
    
    if (isEbook) {
      const ebk = resource as EBook;
      content += `AUTHOR: ${ebk.author}\n`;
      content += `EDITION: ${ebk.edition}\n`;
      content += `ISBN: ${ebk.isbn}\n`;
      content += `PUBLISHED YEAR: ${ebk.publishedYear}\n`;
      content += `PAGES: ${ebk.pages}\n\n`;
      content += `OVERVIEW:\n${ebk.overview}\n\n`;
      content += `TABLE OF CONTENTS:\n`;
      ebk.chapters.forEach((ch, idx) => {
        content += `  ${idx + 1}. ${ch}\n`;
      });
    } else {
      const res = resource as Resource;
      content += `COURSE: ${res.courseCode} - ${res.courseName}\n`;
      content += `SEMESTER: ${res.semester}\n`;
      content += `CATEGORY: ${res.category.replace('_', ' ').toUpperCase()}\n`;
      content += `UPLOADED BY: ${res.uploadedBy.name} (${res.uploadedBy.role})\n`;
      content += `VERIFIED STATUS: ${res.uploadedBy.verified ? 'Verified Campus Faculty/TA' : 'Community Submission'}\n`;
      content += `TOTAL PAGES: ${res.pages} Pages | FORMAT: ${res.fileType}\n\n`;
      content += `COURSE SYLLABUS & DOCUMENT SUMMARY:\n${res.description}\n\n`;
      if (res.sampleContentSnippet) {
        content += `VERIFIED EXCERPT & STUDY CONTENT:\n${res.sampleContentSnippet}\n\n`;
      }
    }

    content += `\n------------------------------------------------------------------------\n`;
    content += `Downloaded from CampusCore Student Portal on: ${new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}\n`;
    content += `Academic Fair Use License: For enrolled university students & faculty review only.\n`;
    content += `========================================================================\n`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);

    resolve({ success: true, filename });
  });
}
