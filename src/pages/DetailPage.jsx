import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";
import parser from "html-react-parser";
import DeleteButton from "../components/DeleteButton";
import ArchiveButton from "../components/ArchiveButton";

function DetailPage({ notes, onDelete, onArchive }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const note = notes.find((note) => note.id === id);

  if (!note) {
    return (
      <div className="page">
        <div className="detail-page__not-found">
          <h2>Catatan tidak ditemukan</h2>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const handleDelete = (id) => {
    onDelete(id);
    navigate("/");
  };

  const handleArchive = (id) => {
    onArchive(id);
    navigate("/");
  };

  return (
    <div className="page">
      <div className="detail-page">
        <h1 className="detail-page__title">{note.title}</h1>
        <p className="detail-page__date">{formatDate(note.createdAt)}</p>
        <div className="detail-page__body">{parser(note.body)}</div>
        <div className="detail-page__actions">
          <ArchiveButton
            id={note.id}
            archived={note.archived}
            onArchive={handleArchive}
          />
          <DeleteButton id={note.id} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}

DetailPage.propTypes = {
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

export default DetailPage;
