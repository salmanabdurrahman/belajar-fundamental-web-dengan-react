import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";

function SearchBar({ placeholder = "Cari catatan berdasarkan judul..." }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const handleSearch = (event) => {
    const value = event.target.value;
    if (value) {
      setSearchParams({ keyword: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-bar__input"
        placeholder={placeholder}
        value={keyword}
        onChange={handleSearch}
      />
    </div>
  );
}

SearchBar.propTypes = {
  placeholder: PropTypes.string,
};

export default SearchBar;
