import "./StockPage.css";
import { FaCircle } from "react-icons/fa";

function StockCard({ title, imgurl, stock }) {
  let iconColor;
  if (stock === 0) {
    iconColor = "red";
  } else if (stock < 3) {
    iconColor = "orange";
  } else {
    iconColor = "green";
  }

  const imgStyle = {
    filter: stock === 0 ? "grayscale(100%)" : "none",
    transition: "0.3s",
    width: "100%",
    height: "180px",
    objectFit: "contain",
    marginBottom: "10px",
  };

  return (
    <div className="cart-prodduct text-center p-3 shadow rounded">
      <img src={imgurl} alt="product" style={imgStyle} />
      <p className="fw-bold" style={{ fontSize: "15px" }}>
        {title}
      </p>
      <p className="d-flex justify-content-center align-items-center gap-2">
        <span>{stock}</span>
        <FaCircle size={20} color={iconColor} />
      </p>
    </div>
  );
}

export default StockCard;
