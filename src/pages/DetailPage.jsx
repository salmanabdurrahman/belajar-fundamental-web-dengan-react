import { Component } from "react";
import PropTypes from "prop-types";
import parser from "html-react-parser";
import withRouter from "../utils/withRouter";
import DeleteButton from "../components/DeleteButton";
import ArchiveButton from "../components/ArchiveButton";

class DetailPage extends Component {
  formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  handleDelete = (id) => {
    this.props.onDelete(id);
    this.props.navigate("/");
  };

  handleArchive = (id) => {
    this.props.onArchive(id);
    this.props.navigate("/");
  };

  render() {
    const { id } = this.props.params;
    const { notes } = this.props;

    const note = notes.find((note) => note.id === id);

    if (!note) {
      return (
        <div className="page">
          <div className="detail-page__not-found">
            <h2>Catatan tidak ditemukan</h2>
            <button
              className="btn btn-primary"
              onClick={() => this.props.navigate("/")}
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="page">
        <div className="detail-page">
          <h1 className="detail-page__title">{note.title}</h1>
          <p className="detail-page__date">{this.formatDate(note.createdAt)}</p>
          <div className="detail-page__body">{parser(note.body)}</div>
          <div className="detail-page__actions">
            <ArchiveButton
              id={note.id}
              archived={note.archived}
              onArchive={this.handleArchive}
            />
            <DeleteButton id={note.id} onDelete={this.handleDelete} />
          </div>
        </div>
      </div>
    );
  }
}

DetailPage.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired,
};

const DetailPageWithRouter = withRouter(DetailPage);
export default DetailPageWithRouter;
