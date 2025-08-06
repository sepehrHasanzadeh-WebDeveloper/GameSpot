import { useDispatch } from "react-redux";
import "./NewCard.css";
import { fetchProductData } from "../../Redux/Slice/GetProductByID";
import { useNavigate } from "react-router-dom";

function NewCard({ name, price, description, imgurl, _id }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const GotoProductPage = () => {
    dispatch(fetchProductData(_id));
    navigate("/product-Newitem");
  };
  return (
    <>
      <div className="div-container">
        <div className="cardF-body">
          <div>
            <p>
              تخفیف های ویژه{" "}
              <span style={{ fontSize: "11px" }}> (مشاهده همه ) </span>
            </p>
            <img className="img-style-card" src={imgurl} alt="خرید جدید ترین لوازم گیمینگ" />
          </div>
          <div>
            <span style={{ color: "aqua" }}>
              {" "}
              4%- <s style={{ color: "white" }}>6,000,000 تومان </s>{" "}
            </span>
            <div>
              <button className="buy-btn" onClick={GotoProductPage}>
                {price.toLocaleString("fa-IR")} تومان
              </button>
              <h5 style={{ fontSize: "16px" }}>{name}</h5>
              <p
                className="text-center"
                style={{ color: "grey", fontSize: "13px" }}
              >
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default NewCard;
