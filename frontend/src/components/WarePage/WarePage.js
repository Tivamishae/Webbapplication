import { useState, useEffect } from "react";
import "./WarePage.css";

function WarePage(props) {
  const [currentWareIndex, setCurrentWareImageIndex] = useState(0);
  const [currentWareImage, setCurrentWareImage] = useState({
    backgroundImage: `url(${props.wareProp.allArticleBaseImages[currentWareIndex]})`,
  });

  useEffect(() => {
    setCurrentWareImage({
      backgroundImage: `url(${props.wareProp.allArticleBaseImages[currentWareIndex]})`,
    });
  }, [currentWareImage]);

  const changeWareImage = (x) => {
    const allImagesArrayLength = props.wareProp.allArticleBaseImages.length;
    if (currentWareIndex === allImagesArrayLength - 1) {
      setCurrentWareImageIndex(0);
      setCurrentWareImage({
        backgroundImage: `url(${props.wareProp.allArticleBaseImages[0]})`,
      });
    } else if (currentWareIndex === 0 && x === -1) {
      setCurrentWareImageIndex(allImagesArrayLength - 1);
      setCurrentWareImage({
        backgroundImage: `url(${
          props.wareProp.allArticleBaseImages[allImagesArrayLength - 1]
        })`,
      });
    } else {
      setCurrentWareImageIndex(currentWareIndex + x);
      setCurrentWareImage({
        backgroundImage: `url(${
          props.wareProp.allArticleBaseImages[currentWareIndex + x]
        })`,
      });
    }
  };

  console.log(props.wareProp);

  return (
    <div className="WarePageWrapper">
      <button className="WarePageContainer">
        <button
          onClick={() => props.removeWarePage()}
          className="GoBackButtonWarePage"
        >
          X
        </button>
        <div className="CurrentWareName">{props.wareProp.name}</div>
        <button className="PushUpWarePage"></button>
        <button style={currentWareImage} className="WarePageImages"></button>
        <button className="WarePageInformationContainer">
          <div className="WarePageInformation">
            {props.wareProp.price.value} USD
          </div>
          <br></br>
          <br></br>
        </button>
        <button className="WarePageLowerContainer">
          <button
            onClick={() => changeWareImage(-1)}
            className="WareImageMinus1"
          >
            ←
          </button>
          <button
            onClick={() => changeWareImage(+1)}
            className="WareImagePlus1"
          >
            →
          </button>
        </button>
      </button>
    </div>
  );
}

export default WarePage;
