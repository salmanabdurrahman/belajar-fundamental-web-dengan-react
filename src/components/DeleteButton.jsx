import PropTypes from "prop-types";
import { useLocale } from "../contexts/LocaleContext";

function DeleteButton({ id, onDelete, disabled = false }) {
  const { t } = useLocale();

  return (
    <button
      type="button"
      className="btn btn-delete"
      onClick={() => onDelete(id)}
      title={t("deleteNote")}
      disabled={disabled}
    >
      {t("delete")}
    </button>
  );
}

DeleteButton.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteButton;
