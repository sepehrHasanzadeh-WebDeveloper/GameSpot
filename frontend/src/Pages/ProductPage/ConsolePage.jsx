import { Col, Container, Row } from "react-bootstrap";
import "./ProductPage.css";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { FaCartPlus, FaShippingFast } from "react-icons/fa";
import { RiHeartAddFill } from "react-icons/ri";
import { HiOutlineChat } from "react-icons/hi";
import Footer from "../../Components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import LoadingCard from "../../Components/LoadingCard/LoadingCard";
import { GiMoneyStack } from "react-icons/gi";
import { FcSafe } from "react-icons/fc";
import Swal from "sweetalert2";
import { addToCart } from "../../Redux/Slice/cart";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { addFavorit } from "../../Redux/Slice/user";
import Meta from "../../Components/Helmet/Meta";
function ConsolePage() {
  const { itemData, error, loading } = useSelector((store) => store.getProduct);
  const { products } = useSelector((store) => store.cart);
  const { userLogin } = useSelector((store) => store.User);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (loading) return <LoadingCard />;
  if (error)
    return <p className="text-danger text-center mt-5">خطا: {error}</p>;
  if (!itemData)
    return <p className="text-center mt-5">محصولی برای نمایش وجود ندارد</p>;

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
        name: itemData.title,
        price: itemData.price,
        quantity: 1,
        image: itemData.imgurl,
        type: itemData.type,
        value: itemData.value,
        option1: itemData.option1,
        option2: itemData.option2,
        option3: itemData.option3,
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
          option1: itemData.option1,
          option2: itemData.option2,
          option3: itemData.option3,
        })
      );
    }
  };
  const title = `خرید ${itemData.title} | GameSpot`;
  const description = `${itemData.title} با گارانتی، قیمت مناسب و ارسال فوری در فروشگاه GameSpot.`;
  return (
    <>
      <Meta title={title} description={description} />
      <Container className="product-container">
        <Toaster position="top-center" reverseOrder={false} />
        <Row className="gy-5">
          <Col xs={12} lg={3} className="order-1 p-5">
            <div>
              <img
                src={itemData.imgurl}
                alt={itemData.title}
                className="img-fluid"
              />
            </div>
          </Col>

          <Col xs={12} lg={7} className="order-2">
            <div className="info-product-container">
              <p style={{ marginTop: "10px", color: "grey" }}>
                {itemData.name}
              </p>
              <h4>{itemData.title}</h4>
              <span>
                تولید کننده:{" "}
                <b style={{ color: "var(--primary)" }}>{itemData.brand}</b>
              </span>

              <div style={{ marginTop: "30px" }}>
                <p>
                  <IoCheckmarkDoneCircle
                    size={30}
                    color="green"
                    style={{ marginLeft: "5px" }}
                  />
                  {itemData.option3}
                </p>
                <p>
                  <IoCheckmarkDoneCircle
                    size={30}
                    color="green"
                    style={{ marginLeft: "5px" }}
                  />
                  {itemData.option1}
                </p>
                <p>
                  <IoCheckmarkDoneCircle
                    size={30}
                    color="green"
                    style={{ marginLeft: "5px" }}
                  />
                  {itemData.option2}
                </p>
              </div>

              <p className="price-text">
                {itemData.price.toLocaleString("fa-IR")} تومان
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

          <Col
            xs={12}
            lg={2}
            className="order-3 d-flex flex-column align-items-center justify-content-center"
          >
            <span>
              <GiMoneyStack
                size={35}
                color="grey"
                style={{ marginLeft: "10px" }}
              />
              بازگشت مبلغ
            </span>
            <span style={{ margin: "35px 0" }}>
              <FaShippingFast
                size={35}
                color="grey"
                style={{ marginLeft: "10px" }}
              />
              ارسال سریع
            </span>
            <span>
              <FcSafe size={35} color="grey" style={{ marginLeft: "10px" }} />
              پرداخت امن و مطمئن
            </span>
          </Col>
        </Row>
      </Container>

      {itemData.description && (
        <Container className="Articels-giftcard-style p-3">
          <hr />
          <h4 className="text-right fw-bold mt-5">معرفی محصول </h4>
          <p
            className="p-descroption fw-bold "
            style={{ color: "grey", fontSize: "20px" }}
          >
            {itemData.description.title}
          </p>
          <p className="p-descroption">{itemData.description.content}</p>
          <p
            className="p-descroption fw-bold "
            style={{ color: "grey", fontSize: "20px" }}
          >
            {itemData.description.title2}
          </p>
          <p className="p-descroption">{itemData.description.content2}</p>
          <p
            className="p-descroption fw-bold "
            style={{ color: "grey", fontSize: "20px" }}
          >
            {itemData.description.title3}
          </p>
          <p className="p-descroption">{itemData.description.content3}</p>
          <div className="GiftImg-style">
            <img
              src={itemData.imgDesc}
              className="img-fluid"
              alt="خرید نسخه محدود اسپایدر من ps5"
            />
          </div>
          <p
            className="p-descroption fw-bold "
            style={{ color: "grey", fontSize: "20px" }}
          >
            {itemData.description.title4}
          </p>
          <p className="p-descroption">{itemData.description.content4}</p>
        </Container>
      )}
      <Footer />
    </>
  );
}
export default ConsolePage;
