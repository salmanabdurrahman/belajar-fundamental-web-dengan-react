import PropTypes from "prop-types";

function ArchiveButton({ id, archived, onArchive }) {
  return (
    <button
      className="btn btn-archive"
      onClick={() => onArchive(id)}
      title={archived ? "Pindahkan ke catatan aktif" : "Arsipkan catatan"}
    >
      {archived ? "Aktifkan" : "Arsipkan"}
    </button>
  );
}

ArchiveButton.propTypes = {
  id: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default ArchiveButton;
