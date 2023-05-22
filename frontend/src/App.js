import TopPart from "./components/TopPart/TopPart.js";
import Page from "./components/Page/Page.js";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [pageProps, setPageProps] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
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
              "X-RapidAPI-Key":
                "332b186032msh77228ab8e6548ecp11d03ejsne635174b50d5",
              "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
            },
          }
        )
        .then(function (response) {
          console.log(response);
          const retrievedData = response.data.results;
          const processedData = createPagePropsArray(retrievedData);
          setPageProps(processedData);
        });
    };
    retrieveHM_API();
  }, []);

  const changePage = (change) => {
    setCurrentPage(currentPage + change);
  };

  const renderedPages = pageProps.map((pageContent, index) => (
    <div
      key={index}
      style={{ display: currentPage === index ? "block" : "none" }}
    >
      <Page
        amountOfPages={pageProps.length}
        changePage={changePage}
        pageIndex={index + 1}
        pageContent={pageContent}
      />
    </div>
  ));

  return (
    <div className="App">
      <TopPart></TopPart>
      <button className="behindTopPart"></button>
      {renderedPages}
      <button className="behindTopPart"></button>
    </div>
  );
}

export default App;
