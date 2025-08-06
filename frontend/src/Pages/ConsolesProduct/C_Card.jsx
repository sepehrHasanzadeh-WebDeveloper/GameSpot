import { useDispatch } from "react-redux";
import "../../Components/Gift_Card/Gift_Card.css";
import { useNavigate } from "react-router-dom";
import { fetchConsoleData } from "../../Redux/Slice/GetProductByID";
import "./Consoles.css";
function CCard({ imgurl, title, name, price, _id, stock }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const GotoProductPage = () => {
    dispatch(fetchConsoleData(_id));
    navigate("/product-console");
  };
  return (
    <>
      <div
        className="giftCard-item"
        style={{
          height: "100%",
          minHeight: "370px",
          backgroundColor: "var(--secondary)",
          borderRadius: "16px",
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        <img
          src={imgurl}
          alt="خرید کنسول ایکس باکس  | ps5"
          className={stock == 5 ? "noStock" : ""}
          style={{
            height: "160px",
            objectFit: "contain",
            marginBottom: "10px",
          }}
        />

        <p className="card-title-fixed">{title}</p>

        <span style={{ color: "grey", fontSize: "12px", margin: "5px 0" }}>
          {name}
        </span>

        <button
          className="btn-gift-buy"
          style={{ width: "150px", fontSize: "15px" }}
          onClick={GotoProductPage}
        >
          {price.toLocaleString("fa-IR")} تومان
        </button>
      </div>
    </>
  );
}
export default CCard;
