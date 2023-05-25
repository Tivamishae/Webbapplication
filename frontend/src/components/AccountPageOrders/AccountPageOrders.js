import { useEffect, useState } from "react";
import "./AccountPageOrders.css";

function AccountPageOrders(props) {
  const [combinedQuantity, setCombinedQuantity] = useState(1);
  const [currentPartOfOrder, setCurrentPartOfOrder] = useState(0);

  useEffect(() => {
    let fullOrderQuantity = 0;
    props.orderProp.forEach((element) => {
      fullOrderQuantity = fullOrderQuantity + element.Quantity;
    });
    setCombinedQuantity(fullOrderQuantity);
  }, []);

  const backgroundImage = {
    backgroundImage: `${props.orderProp[currentPartOfOrder].WareImage}`,
  };

  const UpdateCurrentPartOfOrder = (x) => {
    if (currentPartOfOrder + x > props.orderProp.length - 1) {
      setCurrentPartOfOrder(0);
    } else if (currentPartOfOrder + x < 0) {
      setCurrentPartOfOrder(props.orderProp.length - 1);
    } else {
      setCurrentPartOfOrder(currentPartOfOrder + x);
    }
  };

  return (
    <div className="AccountPageOrders">
      <button className="AccountPageOrderContainer">
        <button
          style={backgroundImage}
          className="AccountPageOrderImage"
        ></button>
        <button className="AccountPageInformationAndButtons">
          <button className="AccountPageInformation">
            <div>OrderID: {props.orderProp[0].FullOrderID}</div>
            <div>Total quantity of objects: {combinedQuantity}</div>
          </button>
          <div>
            Amount of this type: {props.orderProp[currentPartOfOrder].Quantity}
          </div>
          <button
            onClick={() => {
              UpdateCurrentPartOfOrder(-1);
            }}
          >
            ←
          </button>
          <button
            onClick={() => {
              UpdateCurrentPartOfOrder(1);
            }}
          >
            →
          </button>
        </button>
      </button>
    </div>
  );
}

export default AccountPageOrders;
