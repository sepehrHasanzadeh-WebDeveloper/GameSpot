import "./Hero.css";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { Container, Row, Col, Button } from "react-bootstrap";
import HeroModel from "../../assets/images/consoles-removebg-preview.png";

function Hero3D() {
  return (
    <div className="hero-bg py-5" dir="rtl">
      <Container>
        <Row className="align-items-center">
          <Col
            xs={12}
            md={6}
            className="text-light text-section text-center text-md-end mb-4 mb-md-0"
          >
            <TypeAnimation
              sequence={[
                "خرید انواع کنسول بازی با قیمت مناسب و ضمانت اصالت کالا",
                1000,
              ]}
              wrapper="h1"
              cursor={true}
              speed={50}
              className="hero-title"
            />
            <p className="hero-subtitle mt-3">
              دسته بازی، هدست، شارژر و بازی‌های جدید نسل نهم را همین حالا با
              ارسال سریع و ضمانت تهیه کن.
            </p>

            <div className="d-none d-md-flex gap-3 mt-4 justify-content-md-end">
              <Button variant="outline-info" className="hero-btn">
                مشاهده محصولات
              </Button>
              <Button variant="outline-light" className="hero-btn-sec">
                نیاز به مشاوره داری؟
              </Button>
            </div>
          </Col>

          <Col xs={12} md={6} className="text-center image-section">
            <motion.img
              src={HeroModel}
              alt="خرید دسته بازی برای کنسول"
              className="hero-image-floating img-fluid mb-3"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="d-flex d-md-none flex-column gap-2 align-items-center  mt-3">
              <Button variant="outline-info" className="hero-btn w-75 ">
                مشاهده محصولات
              </Button>
              <Button variant="outline-light" className="hero-btn-sec w-75 ">
                نیاز به مشاوره داری؟
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Hero3D;
