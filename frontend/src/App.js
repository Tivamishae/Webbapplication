import TopPart from "./components/TopPart/TopPart.js";
import Page from "./components/Page/Page.js";
import WarePage from "./components/WarePage/WarePage.js";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart.js";
import LoginPage from "./components/LoginPage/LoginPage.js";
import AccountPage from "./components/AccountPage/AccountPage.js";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [pageProps, setPageProps] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [renderWarePage, setRenderWarePage] = useState(false);
  const [warePageProp, setWarePageProp] = useState();
  const [fullWareObjectArray, setFullWareObjectArray] = useState([]);
  const [searchString, setSearchString] = useState([]);
  const [renderShoppingCart, setRenderShoppingCart] = useState(false);
  const [shoppingCartWares, setShoppingCartWares] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState();
  const [userID, setUserID] = useState();
  const [userEmail, setUserEmail] = useState();
  const [renderAccountPage, setRenderAccountPage] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    const filterWares = () => {
      setPageProps(
        createPagePropsArray(
          fullWareObjectArray.filter((ware) =>
            ware.name.toLowerCase().includes(searchString.toLowerCase())
          )
        )
      );
    };
    filterWares();
  }, [searchString]);

  useEffect(() => {
    const processedData = createPagePropsArray(fullWareObjectArray);
    setPageProps(processedData);
  }, [fullWareObjectArray]);

  useEffect(() => {
    const retrieveHM_API = () => {
      axios
        .get(
          "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list",
          {
            params: {
              country: "us",
              lang: "en",
              currentpage: "0",
              pagesize: "30",
              categories: "men_all",
              concepts: "H&M MAN",
            },
            headers: {
              "X-RapidAPI-Key": "",
              "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
            },
          }
        )
        .then(function (response) {
          console.log(response);
          setFullWareObjectArray(response.data.results);
        });
    };
    retrieveHM_API();
  }, []);

  const attemptLogin = (loginObject) => {
    axios
      .post("http://localhost:8080/Webbapplication/backend/", loginObject)
      .then((response) => {
        const sessionResponse = response.data;
        if (sessionResponse.success) {
          console.log(sessionResponse.success);
          setIsLoggedIn(true);
          setUsername(sessionResponse.user);
          setUserID(sessionResponse.userID);
          setUserEmail(sessionResponse.userEmail);
        } else {
          alert(sessionResponse);
        }
      })
      .catch((error) => alert(error));
  };

  const createPagePropsArray = (input) => {
    let secondLoopConst = 0;
    let counter = 0;
    let finalArray = [];
    while (input.length > counter) {
      let temporaryArray = [];
      while (6 > secondLoopConst && input.length > counter) {
        temporaryArray.push(input[counter]);
        counter += 1;
        secondLoopConst += 1;
      }
      secondLoopConst = 0;
      finalArray.push(temporaryArray);
    }
    return finalArray;
  };

  const changePage = (change) => {
    setCurrentPage(currentPage + change);
  };

  const renderWarePageFunc = (wareState) => {
    setWarePageProp(wareState);
    setRenderWarePage(true);
  };

  const removeWarePage = () => {
    setRenderWarePage(false);
  };

  const handleSearchChange = (event) => {
    setSearchString(event.target.value);
  };

  const changeRenderShoppingCart = () => {
    setRenderShoppingCart(!renderShoppingCart);
  };

  const addWareToShoppingCart = (newWare) => {
    const isImageAlreadyInCart = shoppingCartWares.some(
      (wareInCart) => wareInCart.wareImage === newWare.wareImage
    );

    if (isImageAlreadyInCart) {
      alert("Ware is already inside cart");
    } else {
      setShoppingCartWares([...shoppingCartWares, newWare]);
    }
  };

  const renderedPages = pageProps.map((pageContent, index) => (
    <div
      key={index}
      style={{ display: currentPage === index ? "block" : "none" }}
    >
      <Page
        renderWarePageFunc={renderWarePageFunc}
        amountOfPages={pageProps.length}
        changePage={changePage}
        pageIndex={index + 1}
        pageContent={pageContent}
      />
    </div>
  ));

  const removeWareFromShoppingCart = (wareImage) => {
    const updatedShoppingCartArray = shoppingCartWares.filter(
      (ware) => ware.wareImage !== wareImage
    );
    setShoppingCartWares(updatedShoppingCartArray);
  };

  const renderAccountPageFunc = () => {
    setRenderAccountPage(true);
  };

  const falsifyRenderAccountPageFunc = () => {
    setRenderAccountPage(false);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <div>
          {renderAccountPage ? (
            <AccountPage
              userID={userID}
              goBack={falsifyRenderAccountPageFunc}
              userEmail={userEmail}
              username={username}
            ></AccountPage>
          ) : (
            <div>
              {renderShoppingCart ? (
                <ShoppingCart
                  userID={userID}
                  removeWareFromShoppingCart={removeWareFromShoppingCart}
                  shoppingCartWares={shoppingCartWares}
                ></ShoppingCart>
              ) : null}
              {renderWarePage ? (
                <WarePage
                  addWareToShoppingCart={addWareToShoppingCart}
                  removeWarePage={removeWarePage}
                  wareProp={warePageProp}
                ></WarePage>
              ) : null}
              <div>
                <TopPart
                  renderAccountPageFunc={renderAccountPageFunc}
                  changeRenderShoppingCart={changeRenderShoppingCart}
                  searchString={searchString}
                  handleSearchChange={handleSearchChange}
                ></TopPart>
                <button className="behindTopPart"></button>
                {renderedPages}
              </div>
            </div>
          )}
        </div>
      ) : (
        <LoginPage attemptLogin={attemptLogin}></LoginPage>
      )}
    </div>
  );
}

export default App;
