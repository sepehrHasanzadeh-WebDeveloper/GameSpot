import { Col, Container, Row } from "react-bootstrap";
import "./Whyus.css";
import { FaShippingFast, FaGamepad } from "react-icons/fa";
import { BsShieldCheck } from "react-icons/bs";
import { MdPayment } from "react-icons/md";
function Whyus() {
  return (
    <>
      <Container style={{ marginTop: "150px" }}>
        <h3 className="fw-bold text-center mt-5 ">با خیال راحت خرید کن!</h3>
        <p className="text-center mt-4">
          ما فقط کنسول نمی‌فروشیم، تجربه حرفه‌ای خرید ارائه می‌دیم
        </p>

        <Row className="row-cols-2 row-cols-md-3 row-cols-lg-4 gy-5 align-items-center justify-content-center">
          <Col>
            <div className="item-us" style={{ height: "190px" }}>
              <div className="item-us-icon">
                <FaShippingFast size={40} color="aqua" />
              </div>
              <div className="item-us-text">
                <h5 className="text-center my-3">ارسال سریع</h5>
                <p className="text-center">ارسال سریع و مطمئن به سراسر کشور</p>
              </div>
            </div>
          </Col>
          <Col>
            <div className="item-us">
              <div className="item-us-icon">
                <BsShieldCheck size={40} color="aqua" />
              </div>
              <div className="item-us-text">
                <h5 className="text-center my-3">ضمانت اصالت کالا</h5>
                <p className="text-center">
                  همه محصولات با گارانتی و پلمپ رسمی عرضه می‌شن
                </p>
              </div>
            </div>
          </Col>
          <Col>
            <div className="item-us">
              <div className="item-us-icon">
                <MdPayment size={40} color="aqua" />
              </div>
              <div className="item-us-text">
                <h5 className="text-center my-3">پرداخت امن</h5>
                <p className="text-center">
                  اتصال به درگاه‌های رسمی بانکی با رمز دوم پویا
                </p>
              </div>
            </div>
          </Col>
          <Col>
            <div className="item-us">
              <div className="item-us-icon">
                <FaGamepad size={40} color="aqua" />
              </div>
              <div className="item-us-text">
                <h5 className="text-center my-3">پشتیبانی حرفه‌ای</h5>
                <p className="text-center">
                  تیم پشتیبانی واقعی در واتساپ و تلفن پاسخگو هست
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default Whyus;
