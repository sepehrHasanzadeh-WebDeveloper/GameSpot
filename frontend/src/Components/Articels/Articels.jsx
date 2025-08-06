import "./Articels.css";
import { Container, Row, Col } from "react-bootstrap";
import doomImage from "../../assets/images/DoomAdver.png";
import { motion } from "framer-motion";

function Articels() {
  
  const doomHandler = () => {
    window.location.href=("https://doom.bethesda.net/en-US/the-dark-ages")
  }
  return (
    <section className="doom-section d-flex align-items-center">
      <video
        className="video-bg"
        src="/videos/fireBack.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <Container className="p-3">
        <Row className="align-items-center gy-5">
          <Col md={6}>
            <motion.div
              className="doom-content text-light"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="doom-title"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                DOOM: The Dark Ages
              </motion.h2>
              <p className="doom-subtitle">
                ورود به دنیای تاریک، خشن و مرگبار؛ نسل جدید اکشن اول‌شخص
              </p>
              <ul className="doom-features">
                <li>🎮 پلتفرم: PS5 | Xbox Series X | PC</li>
                <li>🕹️ سبک: شوتر اول شخص قرون وسطایی</li>
                <li>🗓️ تاریخ انتشار: ۲۰۲۵</li>
              </ul>
              <div className="btn-group mt-4">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px red" }}
                  className="btn btn-danger glow-btn me-2"
                >
                  مشاهده جزئیات
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="btn btn-outline-light"
                onClick={doomHandler}
                >
                  پخش تریلر
                </motion.button>
              </div>
            </motion.div>
          </Col>
          <Col md={6}>
            <motion.div
              className="doom-image-wrapper"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.img
                src={doomImage}
                alt="خرید بازی the doom dark age برای کنسول "
                className="img-fluid rounded doom-image"
                whileHover={{ scale: 1.03, rotate: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              />
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Articels;
