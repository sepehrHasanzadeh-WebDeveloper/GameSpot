import { Col, Container, Row } from "react-bootstrap";
import "./Footer.css";
import brandimg from "../../assets/images/BrandV2.png";
import { IoCallOutline } from "react-icons/io5";
import zarinpal from "../../assets/images/zarinpanl.svg";
import Enamad from "../../assets/images/enamad.png";
import { VscGistSecret } from "react-icons/vsc";
import {
  FaInfoCircle,
  FaTelegramPlane,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
function Footer() {
  return (
    <>
      <Container className="footer-container">
        <Row className=" row-cols-1 row-cols-lg-3 row-cols-xl-4">
          <Col className="col-border ">
            <div className="brand-item-footer">
              <img
                src={brandimg}
                alt="اسپات گیم . خرید کنسول بازی با بهترین قیمت"
                
              />
              <p className="text-about-brand">
                یک مرجع تخصصی فروش محصولات گیمینگ در ایران است؛ از کنسول‌های نسل
                جدید گرفته تا لوازم جانبی و بازی‌های روز. 🚀 با تمرکز بر اصالت
                کالا، ارسال سریع، و قیمت‌های رقابتی، تجربه‌ای مطمئن و
                هیجان‌انگیز از خرید آنلاین را ارائه می‌دهیم.
              </p>
            </div>
          </Col>
          <Col className="col-border ">
            <div className="contact-us-footer">
              <p className="mt-3">دسترسی سریع </p>
              <p className="option-contact">
                {" "}
                <IoCallOutline size={20} /> ارتباط با ما
              </p>
              <p className="option-contact">
                {" "}
                <FaInfoCircle size={20} /> درباره ما
              </p>
              <p className="option-contact">
                {" "}
                <VscGistSecret size={20} /> قوانین و مقررات
              </p>
            </div>
          </Col>
          <Col className="col-border ">
            <p className="mt-4">صفحات </p>
            <div className="div-pages">
              <div className="page-col">
                <p className="option-contact-page"> درباره ما</p>
                <p className="option-contact-page"> تماس با ما</p>
                <p className="option-contact-page"> قوانین و مقررات</p>
              </div>
              <div className="page-col">
                <p className="option-contact-page"> فروشگاه گیم اسپات</p>
                <p className="option-contact-page"> سوالات معتدل</p>
                <p className="option-contact-page"> راهنما</p>
              </div>
            </div>
          </Col>
          <Col>
            <p className="mt-4">نماد ها</p>
            <div className="dive-page">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img className="img-etemad" src={Enamad} alt="Enamad Logo" />
                <img
                  className="img-etemad"
                  src={zarinpal}
                  alt="خرید امن م مطمعن از گیم اسپات"
                />
              </div>
            </div>
          </Col>
        </Row>
        <div className="link-footer">
          <div className="glass-card">
            <IoCallOutline size={20} /> 09393148674
          </div>
          <div className="glass-card">
            <FaLocationDot size={20} /> ادرس تمامی دفاتر گیم اسپات
          </div>
          <div style={{ display: "flex" }}>
            <div className="glass-card">
              <FaTelegramPlane size={20} />
            </div>
            <div className="glass-card me-2 ms-2">
              <FaWhatsapp size={20} />
            </div>
            <div className="glass-card">
              <FaInstagram size={20} />
            </div>
          </div>
        </div>
      </Container>
      <h5 className="text-center mt-5" style={{ lineHeight: "35px" }}>
        کلیه حقوق این وب‌سایت متعلق به سپهر حسن زاده (توسعه دهنده وبسایت) میباشد
      </h5>
    </>
  );
}
export default Footer;
