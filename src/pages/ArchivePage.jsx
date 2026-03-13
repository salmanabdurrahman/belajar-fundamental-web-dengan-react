import NotesCollectionPage from "../components/NotesCollectionPage";
import { useLocale } from "../contexts/LocaleContext";
import { getArchivedNotes } from "../utils/network-data";

function ArchivePage() {
  const { t } = useLocale();

  return (
    <NotesCollectionPage
      pageTitle={t("archivedNotes")}
      loadingMessage={t("loadingArchivedNotes")}
      searchPlaceholder={t("searchArchivesPlaceholder")}
      emptyMessage={t("noArchivedNotes")}
      emptySearchMessage={t("noArchivesFound")}
      loadErrorMessage={t("loadArchivedNotesFailed")}
      loadNotesFn={getArchivedNotes}
    />
  );
}

export default ArchivePage;
