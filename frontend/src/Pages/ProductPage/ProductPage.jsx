import "./ProductPage.css";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaCartPlus } from "react-icons/fa6";
import { RiHeartAddFill } from "react-icons/ri";
import { HiOutlineChat } from "react-icons/hi";
import Footer from "../../Components/Footer/Footer";
import Swal from "sweetalert2";
import { addToCart } from "../../Redux/Slice/cart";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { addFavorit } from "../../Redux/Slice/user";
import Meta from "../../Components/Helmet/Meta";
function ProductPage() {
  const { itemData } = useSelector((store) => store.getProduct);
  const { products } = useSelector((store) => store.cart);
  const { userLogin } = useSelector((store) => store.User);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addToCartHandler = () => {
    if (userLogin == false) {
      return (
        <>
          {Swal.fire({
            title: "اخطار",
            text: "لطفا اول ثبت نام کنید ",
            icon: "warning",
          })}
          {navigate("/Submit")}
        </>
      );
    }
    const alreadyInCart = products.some((p) => p.id === itemData._id);

    if (alreadyInCart) {
      Swal.fire({
        title: "محصول قبلاً به سبد خرید اضافه شده",
        icon: "warning",
      });
      return;
    }

    dispatch(
      addToCart({
        id: itemData._id,
        name: itemData.description,
        price: itemData.price,
        quantity: 1,
        image: itemData.imgurl,
        type: itemData.brand,
        category: itemData.category,
      })
    );

    Swal.fire({
      title: "کالا با موفقیت به سبد خرید اضافه شد ",
      icon: "success",
    });
  };
  const addtoFavorit = () => {
    if (userLogin !== true) {
      toast("ابتدا باید ثبت نام یه ورود کنید !", {
        icon: "⚠️⚠️",
      });
    } else {
      dispatch(
        addFavorit({
          id: itemData._id,
          name: itemData.title,
          price: itemData.price,
          image: itemData.imgurl,
          title: itemData.name,
          stock: itemData.stock,
        })
      );
    }
  };
  return (
    <>
     <Meta
        title="محصولات جدید گیمینگ | جدیدترین کالاهای PS5 و Xbox | GameSpot"
        description="جدیدترین کنسول‌ها، بازی‌ها، گیفت کارت‌ها و لوازم جانبی گیمینگ را در GameSpot ببینید. خرید سریع، امن و با گارانتی!"
      />
      <Container className="product-container">
        <Toaster position="top-center" reverseOrder={false} />
        <Row className="gy-5 ">
          <Col>
            <div>
              <img
                src={itemData.imgurl}
                alt={itemData.title}
                className="img-fluid"
              />
            </div>
          </Col>
          <Col>
            <div className="info-product-container">
              <p style={{ marginTop: "10px", color: "grey" }}>
                {itemData.name}
              </p>
              <h4>{itemData.description}</h4>
              <div className="option-product">
                <span>{itemData.category}</span>
                <span> {itemData.brand}</span>
              </div>
              <p className="price-text">
                {itemData.price.toLocaleString()} تومان
              </p>
              <button className="btn-addToCart" onClick={addToCartHandler}>
                خرید <FaCartPlus size={20} />
              </button>
              <div className="option-share">
                <div className="media-icon">
                  <RiHeartAddFill size={35} onClick={addtoFavorit} />
                </div>
                <div className="media-icon">
                  <HiOutlineChat size={35} />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
export default ProductPage;
