import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function AddNotePage({ onAddNote }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [titleCharLimit] = useState(50);
  const navigate = useNavigate();

  const handleBodyInput = (event) => {
    setBody(event.target.innerHTML);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title.trim() === "" || body.trim() === "") {
      alert("Judul dan isi catatan tidak boleh kosong!");
      return;
    }

    onAddNote({ title, body });
    navigate("/");
  };

  const remainingChars = titleCharLimit - title.length;

  return (
    <div className="page">
      <div className="add-note-page">
        <h2 className="page__title">Buat Catatan Baru</h2>
        <form className="add-note-page__form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Judul{" "}
              <span className="char-limit">
                ({remainingChars} karakter tersisa)
              </span>
            </label>
            <input
              type="text"
              id="title"
              className="form-input"
              placeholder="Contoh: Catatan penting hari ini"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value.slice(0, titleCharLimit))
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="body" className="form-label">
              Isi Catatan
            </label>
            <div
              id="body"
              className="form-input form-input--editable"
              contentEditable
              onInput={handleBodyInput}
              data-placeholder="Tuliskan catatan Anda di sini... (Anda bisa gunakan bold, italic, dll)"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Simpan Catatan
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/")}
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddNotePage.propTypes = {
  onAddNote: PropTypes.func.isRequired,
};

export default AddNotePage;
