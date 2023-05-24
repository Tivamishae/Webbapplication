import "./Page.css";
import Ware from "../Ware/Ware";

function Page(props) {
  return (
    <div className="App">
      {props.pageContent.map((ware, index) => {
        return (
          <div key={index}>
            <Ware
              renderWarePageFunc={props.renderWarePageFunc}
              wareProp={ware}
            ></Ware>
          </div>
        );
      })}
      <button className="pageBottomPartContainer">
        <div className="currentPage">Page: {props.pageIndex}</div>
        {props.pageIndex > 1 && (
          <button onClick={() => props.changePage(-1)} className="goLeft">
            Page: {props.pageIndex - 1}
          </button>
        )}
        {props.pageIndex < props.amountOfPages && (
          <button onClick={() => props.changePage(+1)} className="goRight">
            Page: {props.pageIndex + 1}
          </button>
        )}
      </button>
    </div>
  );
}

export default Page;
