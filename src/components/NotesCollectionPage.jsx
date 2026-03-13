import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import { archiveNote, deleteNote, unarchiveNote } from "../utils/network-data";
import { useLocale } from "../contexts/LocaleContext";
import LoadingIndicator from "./LoadingIndicator";
import NoteList from "./NoteList";
import SearchBar from "./SearchBar";
import StatusMessage from "./StatusMessage";

function NotesCollectionPage({
  emptyMessage,
  emptySearchMessage,
  loadErrorMessage,
  loadNotesFn,
  loadingMessage,
  pageTitle,
  searchPlaceholder,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useLocale();

  const keyword = searchParams.get("keyword") || "";

  const loadNotes = useCallback(
    async (showLoader = true) => {
      if (showLoader) {
        setLoading(true);
      }

      setErrorMessage("");

      const response = await loadNotesFn();

      if (response.error) {
        setNotes([]);
        setErrorMessage(loadErrorMessage);
        setLoading(false);
        return;
      }

      setNotes(response.data);
      setLoading(false);
    },
    [loadErrorMessage, loadNotesFn]
  );

  useEffect(() => {
    // Initial page fetch is intentionally triggered from the route lifecycle.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadNotes(false);
  }, [loadNotes]);

  const handleKeywordChange = (value) => {
    if (value) {
      setSearchParams({ keyword: value });
      return;
    }

    setSearchParams({});
  };

  const handleDelete = async (id) => {
    setLoading(true);
    const response = await deleteNote(id);

    if (response.error) {
      alert(t("deleteFailed"));
      setLoading(false);
      return;
    }

    await loadNotes();
  };

  const handleArchive = async (id) => {
    setLoading(true);

    const targetNote = notes.find((note) => note.id === id);
    const response = targetNote?.archived
      ? await unarchiveNote(id)
      : await archiveNote(id);

    if (response.error) {
      alert(targetNote?.archived ? t("unarchiveFailed") : t("archiveFailed"));
      setLoading(false);
      return;
    }

    await loadNotes();
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  if (loading) {
    return <LoadingIndicator message={loadingMessage} />;
  }

  return (
    <div className="page">
      <div className="page__header">
        <h2 className="page__title">{pageTitle}</h2>
        <SearchBar
          keyword={keyword}
          onKeywordChange={handleKeywordChange}
          placeholder={searchPlaceholder}
        />
      </div>

      <StatusMessage message={errorMessage} variant="error" />

      <NoteList
        notes={filteredNotes}
        onDelete={handleDelete}
        onArchive={handleArchive}
        emptyMessage={keyword ? emptySearchMessage : emptyMessage}
      />
    </div>
  );
}

NotesCollectionPage.propTypes = {
  emptyMessage: PropTypes.string.isRequired,
  emptySearchMessage: PropTypes.string.isRequired,
  loadErrorMessage: PropTypes.string.isRequired,
  loadNotesFn: PropTypes.func.isRequired,
  loadingMessage: PropTypes.string.isRequired,
  pageTitle: PropTypes.string.isRequired,
  searchPlaceholder: PropTypes.string.isRequired,
};

export default NotesCollectionPage;
