import { useNavigate } from "react-router-dom";
import "../../Components/PsCollection/PsCollection.css";
import "./AllGames.css";
import { useDispatch } from "react-redux";
import { fetchDisksData } from "../../Redux/Slice/GetProductByID";
function GameCard({ imgurl, name, title, price, _id, stock }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const GotoProductPage = () => {
    dispatch(fetchDisksData(_id));
    navigate("/product-disk");
  };
  return (
    <>
      <div
        className="giftCard-item glass-card "
        style={{
          height: "100%",
          minHeight: "370px",
          background: "none",
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
          alt={title}  
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
export default GameCard;
