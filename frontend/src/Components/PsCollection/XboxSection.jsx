import { Col, Container, Row } from "react-bootstrap";
import "./XboxSection.css";
import XboxCenterimg from "../../assets/images/xboxImgae.png";
import { motion } from "framer-motion";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import XboxCard from "./XboxCard";

function XboxSection() {
  const [getData, setGetData] = useState([]);
  useEffect(() => {
    const fetchController = async () => {
      const res = await axios.get(
        "http://localhost:6500/products/newController"
      );
      setGetData(res.data);
    };

    fetchController();
  }, []);
  return (
    <section>
      <Container style={{ marginTop: "180px" }}>
        <Row className="gy-5 align-items-center flex-column flex-lg-row text-center text-lg-start">
          <Col
            className="col-lg-3 order-1 order-lg-1"
            style={{ marginTop: "90px" }}
          >
            <motion.div
              className="right-col-xboxsec"
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 60, delay: 0.2 }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <h3>خرید پک کامل ایکس باکستو به ما بسپر 🤫</h3>
              <p>
                ارائه جدیدترین محصولات ایکس‌باکس با ضمانت اصالت و پشتیبانی تخصصی
              </p>
              <div style={{ width: "90%" }}>
                <button className="btn-view-all-package">مشاهده محصولات</button>
              </div>
              <br />
              <div style={{ width: "90%" }}>
                <button className="btn-view-package">مشاهده این پک</button>
              </div>
            </motion.div>
          </Col>

          <Col className="bg-product col-lg-6 order-2 order-lg-2">
            <img
              src={XboxCenterimg}
              className="img-fluid"
              alt="خرید محصولات ایکس باکس "
            />
          </Col>

          <Col
            className="col-lg-3 order-3 order-lg-3"
            style={{ marginTop: "90px" }}
          >
            <motion.div
              className="text-right"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 60, delay: 0.4 }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <h3>کنسول، کنترلر، اشتراک همه‌چیز در باندل Xbox Series X</h3>
              <ul>
                <li>
                  <IoCheckmarkDoneSharp color="green" size={25} />
                  شامل یک عدد کنترلر الیت سری دو با رنگ سبز نئونی
                </li>
                <li>
                  <IoCheckmarkDoneSharp color="green" size={25} />
                  شامل هدست مخصوص ایکس باکس
                </li>
                <li>
                  <IoCheckmarkDoneSharp color="green" size={25} />
                  قابلیت اجرای بازی‌ها با رزولوشن 4k و فریم ریت ۱۲۰
                </li>
              </ul>
            </motion.div>
          </Col>
        </Row>
        <h3 className="text-center mt-5">کنترلر های جدید ایکس باکس</h3>
        <Row className="gy-5 mt-3 row-cols-2 row-cols-md-3">
          {getData.map((item) => (
            <Col key={item._id}>
              <XboxCard {...item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default XboxSection;
