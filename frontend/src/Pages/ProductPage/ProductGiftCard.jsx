import { Container, Row, Col } from "react-bootstrap";
import Footer from "../../Components/Footer/Footer";
import "./ProductPage.css";
import { useDispatch, useSelector } from "react-redux";
import { RiHeartAddFill } from "react-icons/ri";
import { HiOutlineChat } from "react-icons/hi";
import { FaCartPlus, FaShippingFast } from "react-icons/fa";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { TiPin } from "react-icons/ti";
import Loading from "../../Components/LoadingCard/LoadingCard";
import { GiMoneyStack } from "react-icons/gi";
import { FcSafe } from "react-icons/fc";
import Swal from "sweetalert2";
import { addToCart } from "../../Redux/Slice/cart";
import { useNavigate } from "react-router-dom";
import { addFavorit } from "../../Redux/Slice/user";
import toast, { Toaster } from "react-hot-toast";
import Meta from "../../Components/Helmet/Meta";

function ProductGiftCard() {
  const { itemData, loading, error } = useSelector((store) => store.getProduct);
  const { products } = useSelector((store) => store.cart);
  const { userLogin } = useSelector((store) => store.User);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (loading) return <Loading />;
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
          title: itemData.category,
          stock: itemData.stock,
          option1: itemData.option1,
          option2: itemData.option2,
          option3: itemData.option3,
        })
      );
    }
  };
  const titleMeta = `خرید ${itemData.title} | GameSpot`;
  const descriptionMeta = `${itemData.title} با تحویل فوری، قیمت مناسب و پشتیبانی کامل در GameSpot.`;
  return (
    <>
      <Meta title={titleMeta} description={descriptionMeta} />
      <Container className="product-container">
        <Toaster position="top-center" reverseOrder={false} />
        <Row className="gy-3">
          <Col xs={12} lg={3} className="order-1 p-5">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={itemData.imgurl}
                alt={itemData.title}
                className="product-image"
              />
            </div>
          </Col>
          <Col xs={12} lg={7} className="order-2">
            <div className="info-product-container">
              <h4>{itemData.title} خرید گیفت کارت</h4>
              <div className="option-product">
                <span>{itemData.currency}</span>
                <span>{itemData.type}</span>
              </div>
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
              <p>
                نکته این محصول تا {itemData.expiry_date} قابل استقاده میباشد و
                بعد از ان منقضی میشود. <TiPin size={30} color="orange" />
              </p>

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

export default ProductGiftCard;
