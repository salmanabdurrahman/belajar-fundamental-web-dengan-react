import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import AddNotePage from "./pages/AddNotePage";
import ArchivePage from "./pages/ArchivePage";
import NotFoundPage from "./pages/NotFoundPage";
import {
  getAllNotes,
  getActiveNotes,
  getArchivedNotes,
  addNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "./utils/local-data";

function App() {
  const [notes, setNotes] = useState(getAllNotes());

  const handleAddNote = ({ title, body }) => {
    addNote({ title, body });
    setNotes(getAllNotes());
  };

  const handleDeleteNote = (id) => {
    deleteNote(id);
    setNotes(getAllNotes());
  };

  const handleArchiveNote = (id) => {
    const note = notes.find((note) => note.id === id);
    if (note.archived) {
      unarchiveNote(id);
    } else {
      archiveNote(id);
    }
    setNotes(getAllNotes());
  };

  const activeNotes = getActiveNotes();
  const archivedNotes = getArchivedNotes();

  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  notes={activeNotes}
                  onDelete={handleDeleteNote}
                  onArchive={handleArchiveNote}
                />
              }
            />
            <Route
              path="/notes/:id"
              element={
                <DetailPage
                  notes={notes}
                  onDelete={handleDeleteNote}
                  onArchive={handleArchiveNote}
                />
              }
            />
            <Route
              path="/notes/new"
              element={<AddNotePage onAddNote={handleAddNote} />}
            />
            <Route
              path="/archives"
              element={
                <ArchivePage
                  notes={archivedNotes}
                  onDelete={handleDeleteNote}
                  onArchive={handleArchiveNote}
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
