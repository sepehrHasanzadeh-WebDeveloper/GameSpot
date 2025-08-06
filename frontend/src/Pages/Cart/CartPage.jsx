import { useDispatch, useSelector } from "react-redux";
import "./CartPage.css";
import { Col, Container, Row } from "react-bootstrap";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { decreaseCount, increaseCount } from "../../Redux/Slice/cart";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoadingCard from "../../Components/LoadingCard/LoadingCard";
import emptyCart from "../../assets/images/emptyCart.png";
import Meta from "../../Components/Helmet/Meta";
function CartPage() {
  
  const [rendering, setRendering] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, totalPrice, countofProduct } = useSelector(
    (store) => store.cart
  );

  const handleCheckout = async () => {
    if (products.length === 0) {
      Swal.fire({
        title: "سبد خرید خالی است!",
        icon: "warning",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:6500/api/cart/validate",
        {
          items: products,
        }
      );

      Swal.fire({
        title: "✅ سفارش شما با موفقیت ثبت شد",
        text: response.data.message,
        icon: "success",
      }).then(() => {
        setRendering(true);

        setTimeout(() => {
          navigate("/api/Paymentgateway");
        }, 8000);
      });
    } catch (err) {
      if (err.response?.status === 400) {
        const failed = err.response.data.failedItems
          .map((item) => `${item.name || "کالا"}: ${item.reason}`)
          .join("\n");
        Swal.fire({
          title: "❌ خطا در موجودی",
          text: failed,
          icon: "error",
          width: 600,
        });
      } else {
        Swal.fire({
          title: "خطای سرور",
          text: "مشکلی پیش آمده، دوباره امتحان کنید",
          icon: "error",
        });
      }
    }
  };

  if (rendering) {
    return (
      <>
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <LoadingCard />
          <p className="mt-4">درحال انتقال به درگاه پرداخت ... </p>
        </Container>
      </>
    );
  }
  const backToHome = () => {
    navigate("/");
  };
  return (
    <>
      <Meta
        title="سبد خرید شما | مرور و نهایی‌سازی سفارش | GameSpot"
        description="محصولات انتخابی خود را در سبد خرید GameSpot مرور کرده و خرید خود را نهایی کنید. ارسال سریع و پرداخت امن."
      />
      {countofProduct == 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div>
            <img src={emptyCart} alt="خرید مطمعن و بی دقدقه از اسپات گیم" />
          </div>
          <p>سبد خرید شما خالی است !</p>
          <button onClick={backToHome} className="btn btn-info">
            ادامه
          </button>
        </div>
      ) : (
        <Container className="container-cart">
          <Row className="gy-5">
            <Col className="col-lg-4">
              <h5 className="title-col-product">مشخصات کالا</h5>
              {products.map((item) => (
                <div key={item.id} className="content-product mt-4">
                  <ul>
                    <li>
                      {" "}
                      {item.option1}{" "}
                      <IoCheckmarkDoneCircle color="green" size={25} />{" "}
                    </li>
                    <li>
                      {" "}
                      {item.option2}{" "}
                      <IoCheckmarkDoneCircle color="green" size={25} />{" "}
                    </li>
                    <li>
                      {" "}
                      {item.option3}{" "}
                      <IoCheckmarkDoneCircle color="green" size={25} />{" "}
                    </li>
                  </ul>
                </div>
              ))}
            </Col>
            <Col className="col-lg-2">
              <h5 className="title-col-product">تعداد</h5>
              {products.map((item) => (
                <div key={item.id} className="content-product mt-4">
                  <div className="counter-box">
                    <CiSquarePlus
                      size={40}
                      color="gray"
                      style={{ cursor: "pointer" }}
                      onClick={() => dispatch(increaseCount(item.id))}
                    />
                    <p style={{ fontSize: "25px" }}>{item.quantity}</p>
                    <CiSquareMinus
                      size={40}
                      color="gray"
                      style={{ cursor: "pointer" }}
                      onClick={() => dispatch(decreaseCount(item.id))}
                    />
                  </div>
                </div>
              ))}
            </Col>
            <Col className="col-lg-2">
              <h5 className="title-col-product">قیمت کالا</h5>
              {products.map((item) => (
                <div key={item.id} className="content-product mt-4">
                  <p>{item.price.toLocaleString()} تومان</p>
                </div>
              ))}
            </Col>
            <Col className="col-lg-4">
              <h5 className="title-col-product">اسم کالا</h5>
              <div>
                {products.map((item) => (
                  <div key={item.id} className="content-product mt-4">
                    <div>
                      <p className="fs-4">{item.title}</p>
                      <p
                        style={{
                          color: "gray",
                          fontSize: "12px",
                          textAlign: "center",
                        }}
                      >
                        مقدار {item.value} دلار{" "}
                      </p>
                    </div>
                    <img src={item.image} alt="" />
                  </div>
                ))}
              </div>
            </Col>
          </Row>
          <div className="final-result-cart">
            <p>مجموع سبد خرید : {totalPrice.toLocaleString()} </p>
            <p>مبلغ قابل پرداخت : {totalPrice.toLocaleString()} </p>
            <div className="discount-sec">
              <input
                className="input-discount-code"
                type="text"
                placeholder="کد تخفیف خود را اعمال کنید "
              />
              <button className="btn-discount-code">اعمال کد</button>
            </div>
            <div className="btn-checkout">
              <button onClick={handleCheckout}>تسویه حساب</button>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
export default CartPage;
