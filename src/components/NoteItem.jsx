import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import parser from "html-react-parser";
import DeleteButton from "./DeleteButton";
import ArchiveButton from "./ArchiveButton";

function NoteItem({
  id,
  title,
  body,
  createdAt,
  archived,
  onDelete,
  onArchive,
  showActions = true,
}) {
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const truncateBody = (text, maxLength = 150) => {
    if (text.length <= maxLength) {
      return parser(text);
    }

    return parser(text.substring(0, maxLength) + "...");
  };

  return (
    <div className="note-item">
      <div className="note-item__content">
        <Link to={`/notes/${id}`} className="note-item__title">
          {title}
        </Link>
        <p className="note-item__date">{formatDate(createdAt)}</p>
        <div className="note-item__body">{truncateBody(body)}</div>
      </div>
      {showActions && (
        <div className="note-item__actions">
          <ArchiveButton id={id} archived={archived} onArchive={onArchive} />
          <DeleteButton id={id} onDelete={onDelete} />
        </div>
      )}
    </div>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
};

export default NoteItem;
