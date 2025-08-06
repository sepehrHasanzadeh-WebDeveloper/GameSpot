import { fetchProductData } from "../../Redux/Slice/GetProductByID";
import "./Product-card.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function Productcard({ name, price, description, imgurl, _id }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const GotoProductPage = () => {
    dispatch(fetchProductData(_id));
    navigate("/product-Newitem");
  };
  return (
    <>
      <div className="container-card" onClick={GotoProductPage}>
        <div className="card-swiper">
          <img src={imgurl} alt="خرید جدید ترین لوازم کنسول بازی" />
          <p className="text-center" style={{ fontSize: "12px" }}>
            {name}
          </p>
          <p
            className="text-center"
            style={{ color: "grey", fontSize: "10px" }}
          >
            {description}
          </p>
          <button className="btn-swiperCard">
            {price.toLocaleString("fa-IR")} تومان
          </button>
        </div>
      </div>
    </>
  );
}

export default Productcard;
