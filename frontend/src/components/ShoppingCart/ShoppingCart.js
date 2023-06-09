import { useState } from "react";
import "./ShoppingCart.css";
import axios from "axios";
import ShoppingCartWare from "./ShoppingCartWare/ShoppingCartWare";

const ShoppingCart = (props) => {
  const [quantityArray, setQuantityArray] = useState([]);

  const handleQuantityChange = (index, quantity) => {
    setQuantityArray((prevQuantityArray) => {
      const updatedArray = [...prevQuantityArray];
      updatedArray[index] = quantity;
      return updatedArray;
    });
  };

  const createOrder = () => {
    if (!(props.shoppingCartWares.length === 0)) {
      const combinedArray = Array.from(
        props.shoppingCartWares,
        (shoppingCartWare, index) => [
          shoppingCartWare.wareImage.backgroundImage,
          quantityArray[index],
        ]
      );
      console.log(combinedArray);
      const orderObject = {
        type: "insertOrder",
        orderPartsArray: combinedArray,
        userID: props.userID,
      };
      axios
        .post("http://localhost:8080/Webbapplication/backend/", orderObject)
        .then((response) => {
          const sessionResponse = response.data;
          alert(sessionResponse);
          if (sessionResponse === "Your order was successful") {
            props.emptyShoppingCart();
          }
        })
        .catch((error) => alert(error));
    } else {
      alert("Please put atleast one item in the shoppingcart before ordering");
    }
  };

  return (
    <div>
      <button className="ShoppingCartScreen">
        <div className="YourShoppingCart">Your shopping cart</div>
        <br></br>
        <br></br>
        <button className="ShoppingCartWareContainer">
          {props.shoppingCartWares.map((ware, index) => {
            return (
              <div key={index}>
                <ShoppingCartWare
                  onQuantityChange={(quantity) =>
                    handleQuantityChange(index, quantity)
                  }
                  removeWareFromShoppingCart={props.removeWareFromShoppingCart}
                  wareProp={ware}
                ></ShoppingCartWare>
              </div>
            );
          })}
        </button>
        <button onClick={() => createOrder()}>Order</button>
      </button>
    </div>
  );
};

export default ShoppingCart;
