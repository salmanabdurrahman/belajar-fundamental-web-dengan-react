import PropTypes from "prop-types";
import { useLocale } from "../contexts/LocaleContext";

function ArchiveButton({ id, archived, onArchive, disabled = false }) {
  const { t } = useLocale();

  return (
    <button
      type="button"
      className="btn btn-archive"
      onClick={() => onArchive(id)}
      title={archived ? t("activateNote") : t("archive")}
      disabled={disabled}
    >
      {archived ? t("unarchive") : t("archive")}
    </button>
  );
}

ArchiveButton.propTypes = {
  archived: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default ArchiveButton;
