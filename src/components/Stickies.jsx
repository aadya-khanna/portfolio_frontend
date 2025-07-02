import React, { useState } from 'react';

const StickyNote = ({ note, onPost, onDelete }) => {
  const [noteText, setNoteText] = useState(note ? note.text : '');

  const handlePost = () => {
    if (noteText.trim()) {
      onPost(noteText);
      setNoteText(''); 
    }
  };

  const handleDelete = () => {
    if (note && note.id) {
      onDelete(note.id);
    }
  };

  if (note) {
    return (
        <div className="bg-accent font-plein p-4 rounded shadow relative">
          <div className="text-foreground">{note.text}</div> {}
        </div>
    );
  } else {
    return (
      <div className="sticky-note pt-10 font-plein">
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="comments, recs, reminders, anything!"
          className="text-foreground p-5 text-center rounded-md"
        />
        <div className="pt-3">
          <button className="border rounded-full w-16 hover:cursor-pointer border-foreground dark:border-foreground-dark" onClick={handlePost}>Post</button>
        </div>
      </div>
    );
  }
};

export default StickyNote;