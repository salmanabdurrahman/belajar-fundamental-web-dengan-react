import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";

function HomePage({ notes, onDelete, onArchive }) {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="page">
      <div className="page__header">
        <h2 className="page__title">Catatan Aktif</h2>
        <SearchBar />
      </div>
      <NoteList
        notes={filteredNotes}
        onDelete={onDelete}
        onArchive={onArchive}
        emptyMessage={
          keyword ? "Tidak ada catatan yang ditemukan" : "Tidak ada catatan"
        }
      />
    </div>
  );
}

HomePage.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default HomePage;
