// import logo from './logo.svg';
import { useEffect, useState } from "react";
import "./App.css";
import NoticeCard from "./Components/NoticeCard";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote() {
    setNotes([
      ...notes,
      {
        id: Date.now(),
      },
    ]);
  }

  function removeNote(noteId) {
    setNotes(notes.filter((item) => item.id !== noteId));
  }

  function handleSaveNoteContent(noteId, newContent) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId ? { ...note, content: newContent } : note
      )
    );
  }

  return (
    <div className="App">
      <nav>
        <h1>Notice Board</h1>
      </nav>
      <button className="add-btn" onClick={addNote}>
        +
      </button>
      {notes.map((item) => (
        <NoticeCard
          key={item.id}
          noteId={item.id}
          onClose={() => removeNote(item.id)}
          onSave={handleSaveNoteContent}
        />
      ))}
    </div>
  );
}

export default App;
