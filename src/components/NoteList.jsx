import PropTypes from "prop-types";
import NoteItem from "./NoteItem";

function NoteList({
  notes,
  onDelete,
  onArchive,
  emptyMessage,
  actionDisabled = false,
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
          disabled={actionDisabled}
        />
      ))}
    </div>
  );
}

NoteList.propTypes = {
  actionDisabled: PropTypes.bool,
  emptyMessage: PropTypes.string.isRequired,
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      archived: PropTypes.bool.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onArchive: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NoteList;
