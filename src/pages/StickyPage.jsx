import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StickyNote from '../components/Stickies';

export default function StickyPage() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_BACKEND_URL || "http://localhost:8888"}/api/notes`;
      console.log('Frontend: Fetching notes from:', apiUrl);
      const response = await fetch(apiUrl);
      console.log('Frontend: Fetch notes response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Frontend: Fetched notes data:', data);
        setNotes(data);
      } else {
        console.error('Frontend: Failed to fetch notes:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Frontend: Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []); 

  const handlePostNote = async (noteText) => {
    try {
      const apiUrl = `${import.meta.env.VITE_BACKEND_URL || "http://localhost:8888"}/api/notes`;
      console.log('Frontend: Posting note to:', apiUrl, 'with text:', noteText);
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: noteText }),
      });
      console.log('Frontend: Post note response status:', response.status);

      if (response.ok) {
        console.log('Frontend: Note posted successfully.');
        fetchNotes();
      } else {
        console.error('Frontend: Failed to post note:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Frontend: Error posting note:', error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      const apiUrl = `${import.meta.env.VITE_BACKEND_URL || "http://localhost:8888"}/api/notes/${noteId}`;
      console.log('Frontend: Deleting note with ID:', noteId, 'from:', apiUrl);
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deleteSecret: import.meta.env.VITE_DELETE_SECRET }),
      });
      console.log('Frontend: Delete note response status:', response.status);

      if (response.ok) {
        console.log('Frontend: Note deleted successfully.');
        fetchNotes();
      } else {
        console.error('Frontend: Failed to delete note:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Frontend: Error deleting note:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-background-dark dark:text-foreground-dark">
      <Header />
      <main className="flex flex-col min-h-[calc(100vh-header-height)]">
        <div className="items-center md:items-start text-center justify-center">
          <p className="text-lg sm:text-lg md:text-xl 2xl:text-2xl font-plein">
            <a href="about" className="hover:text-accent"> about </a> |
            <a href="projects" className="hover:text-accent"> projects </a> |
            <a href="experience" className='hover:text-accent'> experience </a> |
            <a href="misc" className='text-accent'> misc. </a>
          </p>

          <h1 className="font-gambetta font-semibold pt-3 text-2xl sm:text-2xl md:text-3xl lg:text-3xl">
            stickies!
          </h1>

          <StickyNote onPost={handlePostNote} />

          <div className="pt-10 px-4 md:px-0 pb-10"> 
            <div className="sticky-note-wall px-10 md:px-40 mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {notes.map((note) => (
                <StickyNote key={note.id} note={note} onDelete={handleDeleteNote} />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
