import "./TopPart.css";
import SearchBar from "./SearchBar/SearchBar";

const TopPart = (props) => {
  return (
    <div>
      <button className="containerButton">
        <button className="wholeDropDownContainer">
          <button
            onClick={() => props.changeRenderShoppingCart()}
            className="shoppingCartIcon"
          ></button>
        </button>
        <button
          onClick={() => props.renderAccountPageFunc()}
          className="yourAccontIcon"
        ></button>
        <SearchBar
          searchString={props.searchString}
          handleSearchChange={props.handleSearchChange}
        ></SearchBar>
      </button>
    </div>
  );
};

export default TopPart;
