import { Component } from "react";
import PropTypes from "prop-types";
import withRouter from "../utils/withRouter";

class AddNotePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      titleCharLimit: 50,
    };
    this.bodyInputRef = null;
  }

  handleTitleChange = (e) => {
    const value = e.target.value.slice(0, this.state.titleCharLimit);
    this.setState({ title: value });
  };

  handleBodyInput = (e) => {
    this.setState({ body: e.currentTarget.innerHTML });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.title.trim() === "" || this.state.body.trim() === "") {
      alert("Judul dan isi catatan tidak boleh kosong!");
      return;
    }

    this.props.onAddNote({
      title: this.state.title,
      body: this.state.body,
    });
    this.props.navigate("/");
  };

  render() {
    const { title, titleCharLimit } = this.state;
    const remainingChars = titleCharLimit - title.length;

    return (
      <div className="page">
        <div className="add-note-page">
          <h2 className="page__title">Buat Catatan Baru</h2>
          <form className="add-note-page__form" onSubmit={this.handleSubmit}>
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
                onChange={this.handleTitleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="body" className="form-label">
                Isi Catatan
              </label>
              <div
                id="body"
                ref={(el) => {
                  this.bodyInputRef = el;
                }}
                className="form-input form-input--editable"
                contentEditable
                onInput={this.handleBodyInput}
                data-placeholder="Tuliskan catatan Anda di sini... (Anda bisa gunakan bold, italic, dll)"
                suppressContentEditableWarning
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Simpan Catatan
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => this.props.navigate("/")}
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

AddNotePage.propTypes = {
  onAddNote: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
};

const AddNotePageWithRouter = withRouter(AddNotePage);
export default AddNotePageWithRouter;
