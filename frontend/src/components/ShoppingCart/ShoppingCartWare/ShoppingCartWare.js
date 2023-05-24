import "./ShoppingCartWare.css";
import { useState, useEffect } from "react";

const ShoppingCartWare = (props) => {
  const [quantity, setQuantity] = useState(1);

  const handleUpdateQuantity = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity < 1) {
      setQuantity(1);
      props.onQuantityChange(1);
    } else {
      setQuantity(newQuantity);
      props.onQuantityChange(newQuantity);
    }
  };

  useEffect(() => {
    props.onQuantityChange(1);
  }, []);

  return (
    <div>
      <button className="InsideShoppingCartWareContainer">
        <button
          style={props.wareProp.wareImage}
          className="InsideShoppingCartWareImage"
        ></button>
        <button className="InsideShoppingCartWareInformationAndButtons">
          <button className="InsideShoppingCartWareInformation">
            <div>{props.wareProp.wareName}</div>
            <br></br>
            <div>{props.wareProp.warePrice} USD</div>
          </button>
          <button className="InsideShoppingCartWareButtons">
            <input
              type="number"
              onChange={handleUpdateQuantity}
              value={quantity}
              className="WareQuantity"
            ></input>
            <br></br>
            <br></br>
            <button
              onClick={() =>
                props.removeWareFromShoppingCart(props.wareProp.wareImage)
              }
              className="RemoveWareButton"
            >
              Remove
            </button>
          </button>
        </button>
      </button>
    </div>
  );
};

export default ShoppingCartWare;
