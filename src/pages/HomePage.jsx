import NotesCollectionPage from "../components/NotesCollectionPage";
import { useLocale } from "../contexts/LocaleContext";
import { getActiveNotes } from "../utils/network-data";

function HomePage() {
  const { t } = useLocale();

  return (
    <NotesCollectionPage
      pageTitle={t("activeNotes")}
      loadingMessage={t("loadingNotes")}
      searchPlaceholder={t("searchNotesPlaceholder")}
      emptyMessage={t("noNotes")}
      emptySearchMessage={t("noNotesFound")}
      loadErrorMessage={t("loadNotesFailed")}
      loadNotesFn={getActiveNotes}
    />
  );
}

export default HomePage;
