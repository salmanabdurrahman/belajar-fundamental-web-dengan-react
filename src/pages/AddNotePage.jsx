import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "../components/LoadingIndicator";
import StatusMessage from "../components/StatusMessage";
import { useLocale } from "../contexts/LocaleContext";
import { addNote } from "../utils/network-data";

function AddNotePage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errorKey, setErrorKey] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { t } = useLocale();
  const titleCharLimit = 50;
  const remainingChars = titleCharLimit - title.length;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || !body.trim()) {
      setErrorKey("emptyNoteValidation");
      return;
    }

    setSubmitting(true);
    setErrorKey("");

    const response = await addNote({ title: title.trim(), body: body.trim() });

    if (response.error) {
      setErrorKey("addNoteFailed");
      setSubmitting(false);
      return;
    }

    navigate("/", { replace: true });
  };

  if (submitting) {
    return <LoadingIndicator message={t("savingNote")} />;
  }

  return (
    <div className="page">
      <div className="add-note-page">
        <h2 className="page__title">{t("createNote")}</h2>
        <StatusMessage message={errorKey ? t(errorKey) : ""} variant="error" />
        <form className="add-note-page__form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              {t("title")}{" "}
              <span className="char-limit">
                ({remainingChars} {t("remainingCharacters")})
              </span>
            </label>
            <input
              type="text"
              id="title"
              className="form-input"
              placeholder={t("titlePlaceholder")}
              value={title}
              onChange={(event) =>
                setTitle(event.target.value.slice(0, titleCharLimit))
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="body" className="form-label">
              {t("body")}
            </label>
            <textarea
              id="body"
              className="form-input form-input--textarea"
              value={body}
              onChange={(event) => setBody(event.target.value)}
              placeholder={t("bodyPlaceholder")}
              rows="10"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {t("saveNote")}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/", { replace: true })}
            >
              {t("cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNotePage;
