import { useCallback, useEffect, useState } from "react";
import parser from "html-react-parser";
import { useNavigate, useParams } from "react-router-dom";
import ArchiveButton from "../components/ArchiveButton";
import DeleteButton from "../components/DeleteButton";
import LoadingIndicator from "../components/LoadingIndicator";
import StatusMessage from "../components/StatusMessage";
import { useLocale } from "../contexts/LocaleContext";
import showFormattedDate from "../utils/format-date";
import {
  archiveNote,
  deleteNote,
  getNote,
  unarchiveNote,
} from "../utils/network-data";

function DetailPage() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorKey, setErrorKey] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { locale, t } = useLocale();

  const loadNote = useCallback(
    async (showLoader = true) => {
      if (showLoader) {
        setLoading(true);
      }

      setErrorKey("");

      const response = await getNote(id);

      if (response.error) {
        setNote(null);
        setErrorKey("noteNotFound");
        setLoading(false);
        return;
      }

      setNote(response.data);
      setLoading(false);
    },
    [id]
  );

  useEffect(() => {
    // Initial page fetch is intentionally triggered from the route lifecycle.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadNote(false);
  }, [loadNote]);

  const handleDelete = async (noteId) => {
    setLoading(true);
    const response = await deleteNote(noteId);

    if (response.error) {
      alert(t("deleteFailed"));
      setLoading(false);
      return;
    }

    navigate(note?.archived ? "/archives" : "/", { replace: true });
  };

  const handleArchive = async (noteId) => {
    setLoading(true);
    const response = note?.archived
      ? await unarchiveNote(noteId)
      : await archiveNote(noteId);

    if (response.error) {
      alert(note?.archived ? t("unarchiveFailed") : t("archiveFailed"));
      setLoading(false);
      return;
    }

    navigate(note?.archived ? "/" : "/archives", { replace: true });
  };

  if (loading) {
    return <LoadingIndicator message={t("loadingNote")} />;
  }

  if (!note) {
    return (
      <div className="page">
        <div className="detail-page__not-found">
          <StatusMessage
            message={t(errorKey || "noteNotFound")}
            variant="error"
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/", { replace: true })}
          >
            {t("backToHome")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="detail-page">
        <h1 className="detail-page__title">{note.title}</h1>
        <p className="detail-page__date">
          {showFormattedDate(note.createdAt, locale)}
        </p>
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

export default DetailPage;
