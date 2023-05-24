import "./Ware.css";

function Ware(props) {
  const wareImage = {
    backgroundImage: `url(${props.wareProp.allArticleBaseImages[0]})`,
  };

  return (
    <div className="Ware">
      <button className="WareWrapper">
        <button
          onClick={() => console.log(props.wareProp)}
          style={wareImage}
          className="WareImage"
        ></button>
        <button
          onClick={() => props.renderWarePageFunc(props.wareProp)}
          className="ShowWare"
        >
          <div className="ShowWareText">Show more</div>
        </button>
        <button className="WareInformation">
          <div className="WareName">{props.wareProp.name}</div>
          <button className="PushUpSmall"></button>
          <button className="WarePriceContainer">
            <div className="WarePrice">{props.wareProp.price.value} USD</div>
          </button>
        </button>
      </button>
    </div>
  );
}

export default Ware;
