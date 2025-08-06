import { Col, Container, Row } from "react-bootstrap";
import Footer from "../../Components/Footer/Footer";
import "./ProductPage.css";
import { FaCartPlus, FaShippingFast } from "react-icons/fa";
import { RiHeartAddFill } from "react-icons/ri";
import { HiOutlineChat } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import LoadingCard from "../../Components/LoadingCard/LoadingCard";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { GiMoneyStack } from "react-icons/gi";
import { FcSafe } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../Redux/Slice/cart";
import Swal from "sweetalert2";
import { addFavorit } from "../../Redux/Slice/user";
import toast, { Toaster } from "react-hot-toast";
import Meta from "../../Components/Helmet/Meta";
function DisksPage() {
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
  const title = `خرید دیسک بازی ${itemData.title} | GameSpot`;
  const description = `دیسک اورجینال بازی ${itemData.title} با قیمت مناسب و ارسال سریع از فروشگاه GameSpot.`;
  return (
    <>
      <Meta title={title} description={description} />
      <Container className="product-container">
        <Toaster position="top-center" reverseOrder={false} />
        <Row className="gy-5 ">
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
                  {" "}
                  <IoCheckmarkDoneCircle
                    size={30}
                    color="green"
                    style={{ marginLeft: "5px" }}
                  />
                  {itemData.option3}{" "}
                </p>
                <p>
                  {" "}
                  <IoCheckmarkDoneCircle
                    size={30}
                    color="green"
                    style={{ marginLeft: "5px" }}
                  />
                  {itemData.option1}
                </p>
                <p>
                  {" "}
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
              پرداخت امن و مطمعن{" "}
            </span>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
export default DisksPage;
