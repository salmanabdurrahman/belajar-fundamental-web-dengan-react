import { Component } from "react";
import PropTypes from "prop-types";
import withSearch from "../utils/withSearch";

class SearchBar extends Component {
  handleSearch = (e) => {
    const value = e.target.value;
    if (value) {
      this.props.setSearchParams({ keyword: value });
    } else {
      this.props.setSearchParams({});
    }
  };

  render() {
    const { placeholder = "Cari catatan berdasarkan judul..." } = this.props;
    const keyword = this.props.searchParams.get("keyword") || "";

    return (
      <div className="search-bar">
        <input
          type="text"
          className="search-bar__input"
          placeholder={placeholder}
          value={keyword}
          onChange={this.handleSearch}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  searchParams: PropTypes.object.isRequired,
  setSearchParams: PropTypes.func.isRequired,
};

const SearchBarWithSearch = withSearch(SearchBar);
export default SearchBarWithSearch;
