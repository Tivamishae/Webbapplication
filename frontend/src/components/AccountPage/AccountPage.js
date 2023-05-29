import "./AccountPage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import AccountPageOrders from "../AccountPageOrders/AccountPageOrders";

const AccountPage = (props) => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:8080/Webbapplication/backend/", {
        type: "getOrders",
        userID: props.userID,
      })
      .then((response) => {
        let sessionResponse = [];
        sessionResponse = response.data;
        if (sessionResponse !== undefined || sessionResponse === []) {
          const finalArray = sessionResponse.reduce((result, orderPart) => {
            const foundArray = result.find(
              (arr) => arr[0].FullOrderID === orderPart.FullOrderID
            );
            if (foundArray) {
              foundArray.push(orderPart);
            } else {
              result.push([orderPart]);
            }
            return result;
          }, []);
          setAllOrders(finalArray);
        }
      })
      .catch((error) => alert(error));
  }, []);

  return (
    <div>
      <button className="AccContainerButton">
        <div className="AccountDetailsText">Account details:</div>
        <button className="GoBackContainer">
          <button onClick={() => props.logOut()} className="GoBack">
            Log out
          </button>
          <button className="Seperator"></button>
          <button onClick={props.goBack} className="GoBack">
            Go back
          </button>
        </button>
        <button className="LowerContainer">
          <button className="ListOfOrdersTitleContainer">
            <div className="ListOfOrdersTitle">Your Orders:</div>
          </button>
          <button className="ListOfOrders">
            {allOrders.map((order, index) => {
              return (
                <div key={index}>
                  <AccountPageOrders orderProp={order}></AccountPageOrders>
                </div>
              );
            })}
          </button>
          <div className="UserInformationTitle">Your username:</div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className="UserInformation">{props.username}</div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className="UserInformationTitle">Your email:</div>
          <br></br>
          <br></br>
          <div className="UserInformation">{props.userEmail}</div>
        </button>
      </button>
    </div>
  );
};

export default AccountPage;
