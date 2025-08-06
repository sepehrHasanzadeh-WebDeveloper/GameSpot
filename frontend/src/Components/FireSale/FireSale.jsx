import "./FireSale.css";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { motion } from "framer-motion";
import firebg from "../../assets/images/rm218batch5-mynt-45.jpg";
import fireImg from "../../assets/images/baner-ps_vs_xbox-removebg-preview.png";
import { useNavigate } from "react-router-dom";
function FireSale() {
  const navigate = useNavigate();
  const seeAllHandler = () => {
    navigate("/AllConsoles");
  };
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${firebg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "60px 0",
          color: "white",
          marginTop: "180px",
        }}
      >
        <Container>
          <Row className="align-items-center gy-5">
            <Col md={6}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Image
                  src={fireImg}
                  fluid
                  rounded
                  alt="خرید کنسول های بازی با تخفیف"
                  className="shadow-lg img-fluid "
                  style={{ overflow: "hidden" }}
                />
              </motion.div>
            </Col>
            <Col md={6}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="mb-3">🎮 تخفیف ویژه تابستانی!</h2>
                <p className="mb-4">
                  فقط تا پایان هفته! ۱۵٪ تخفیف روی خرید کنسول‌های PS5 و Xbox
                  Series X. فرصت رو از دست نده!
                </p>
                <Button variant="light" size="lg" onClick={seeAllHandler}>
                  مشاهده محصولات
                </Button>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
export default FireSale;
