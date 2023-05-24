import "./AccountPage.css";
import { useState, useEffect } from "react";
import axios from "axios";

const AccountPage = (props) => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:8080/Webbapplication/backend/", {
        type: "getOrders",
        userID: props.userID,
      })
      .then((response) => {
        const sessionResponse = response.data;
        if (sessionResponse.success) {
          console.log(sessionResponse);
          setAllOrders(sessionResponse.data);
        } else {
          console.log(sessionResponse);
        }
      })
      .catch((error) => alert(error));
  }, []);

  return (
    <div>
      <button className="AccContainerButton">
        <div className="AccountDetailsText">Account details:</div>
        <button className="GoBackContainer">
          <button onClick={props.goBack} className="GoBack">
            Go back
          </button>
        </button>
        <button className="LowerContainer">
          <button className="ListOfOrders"></button>
          <div className="UserInformationTitle">Your username:</div>
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
