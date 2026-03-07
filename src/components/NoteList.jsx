import PropTypes from "prop-types";
import NoteItem from "./NoteItem";

function NoteList({
  notes,
  onDelete,
  onArchive,
  emptyMessage = "Tidak ada catatan",
}) {
  if (notes.length === 0) {
    return <div className="notes-list__empty">{emptyMessage}</div>;
  }

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          {...note}
          onDelete={onDelete}
          onArchive={onArchive}
        />
      ))}
    </div>
  );
}

NoteList.propTypes = {
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
  emptyMessage: PropTypes.string,
};

export default NoteList;
