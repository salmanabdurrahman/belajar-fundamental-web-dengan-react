import { Component } from "react";
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getAllNotes(),
    };
  }

  handleAddNote = ({ title, body }) => {
    addNote({ title, body });
    this.setState({ notes: getAllNotes() });
  };

  handleDeleteNote = (id) => {
    deleteNote(id);
    this.setState({ notes: getAllNotes() });
  };

  handleArchiveNote = (id) => {
    const note = this.state.notes.find((note) => note.id === id);
    if (note.archived) {
      unarchiveNote(id);
    } else {
      archiveNote(id);
    }
    this.setState({ notes: getAllNotes() });
  };

  render() {
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
                    onDelete={this.handleDeleteNote}
                    onArchive={this.handleArchiveNote}
                  />
                }
              />
              <Route
                path="/notes/:id"
                element={
                  <DetailPage
                    notes={this.state.notes}
                    onDelete={this.handleDeleteNote}
                    onArchive={this.handleArchiveNote}
                  />
                }
              />
              <Route
                path="/notes/new"
                element={<AddNotePage onAddNote={this.handleAddNote} />}
              />
              <Route
                path="/archives"
                element={
                  <ArchivePage
                    notes={archivedNotes}
                    onDelete={this.handleDeleteNote}
                    onArchive={this.handleArchiveNote}
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
}

export default App;
