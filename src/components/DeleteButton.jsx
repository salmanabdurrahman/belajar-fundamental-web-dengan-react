import PropTypes from "prop-types";

function DeleteButton({ id, onDelete }) {
  return (
    <button
      className="btn btn-delete"
      onClick={() => onDelete(id)}
      title="Hapus catatan"
    >
      Hapus
    </button>
  );
}

DeleteButton.propTypes = {
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteButton;
