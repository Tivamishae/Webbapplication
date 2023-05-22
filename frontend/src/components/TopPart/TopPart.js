import "./TopPart.css";
import { useState } from "react";
import SearchBar from "./SearchBar/SearchBar";
import DropDown from "./DropDown/DropDown";

const TopPart = () => {
  const [renderDropDown, setRenderDropDown] = useState(false);

  const changeRenderDropDown = () => {
    setRenderDropDown(!renderDropDown);
  };

  return (
    <div>
      <button className="containerButton">
        <button className="wholeDropDownContainer">
          <button
            onClick={() => changeRenderDropDown()}
            className="menuIcon"
          ></button>
          {renderDropDown ? <DropDown></DropDown> : null}
        </button>
        <button className="yourAccontIcon"></button>
        <SearchBar></SearchBar>
      </button>
    </div>
  );
};

export default TopPart;
