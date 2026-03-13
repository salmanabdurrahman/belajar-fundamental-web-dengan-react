import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import parser from "html-react-parser";
import ArchiveButton from "./ArchiveButton";
import DeleteButton from "./DeleteButton";
import { useLocale } from "../contexts/LocaleContext";
import showFormattedDate from "../utils/format-date";

function createExcerpt(body, maxLength = 150) {
  const plainText = body.replace(/<[^>]*>/g, "");

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return `${plainText.slice(0, maxLength)}...`;
}

function NoteItem({
  id,
  title,
  body,
  createdAt,
  archived,
  onDelete,
  onArchive,
  disabled = false,
  showActions = true,
}) {
  const { locale } = useLocale();

  return (
    <div className="note-item">
      <div className="note-item__content">
        <Link to={`/notes/${id}`} className="note-item__title">
          {title}
        </Link>
        <p className="note-item__date">
          {showFormattedDate(createdAt, locale)}
        </p>
        <div className="note-item__body">{parser(createExcerpt(body))}</div>
      </div>
      {showActions ? (
        <div className="note-item__actions">
          <ArchiveButton
            id={id}
            archived={archived}
            onArchive={onArchive}
            disabled={disabled}
          />
          <DeleteButton id={id} onDelete={onDelete} disabled={disabled} />
        </div>
      ) : null}
    </div>
  );
}

NoteItem.propTypes = {
  archived: PropTypes.bool.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  onArchive: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default NoteItem;
