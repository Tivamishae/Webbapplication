import "./SearchBar.css";

const SearchBar = (props) => {
  return (
    <div>
      <button className="searchBarContainerButton">
        <div className="searchText">Search</div>
        <input
          type="text"
          value={props.searchString}
          onChange={props.handleSearchChange}
          className="searchBar"
        ></input>
      </button>
    </div>
  );
};

export default SearchBar;
