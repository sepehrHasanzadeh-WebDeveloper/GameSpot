import { useDispatch } from "react-redux";
import "./Gift_Card.css";
import { useNavigate } from "react-router-dom";
import { fetchGiftcardsData } from "../../Redux/Slice/GetProductByID";
function GiftCardsitem({ title, currency, imgurl, price, _id }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const GotoProductPage = () => {
    dispatch(fetchGiftcardsData(_id));
    navigate("/product-giftcard");
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
        <img src={imgurl} alt="خرید گیفت کارت برای کنسول " />
        <p className="text-style">{title}</p>
        <span style={{ color: "grey", fontSize: "12px", margin: "10px 0" }}>
          {currency}
        </span>
        <button className="btn-giftcard" onClick={GotoProductPage}>
          {price.toLocaleString("fa-IR")} تومان{" "}
        </button>
      </div>
    </>
  );
}
export default GiftCardsitem;
