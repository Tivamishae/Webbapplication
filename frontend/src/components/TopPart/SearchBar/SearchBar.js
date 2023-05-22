import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div>
      <button className="searchBarContainerButton">
        <div className="searchText">Search</div>
        <input className="searchBar"></input>
      </button>
    </div>
  );
};

export default SearchBar;
