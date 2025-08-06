import "./XboxSection.css";
import { motion } from "framer-motion";

function XboxCard({ name, price, imgurl }) {
  return (
    <motion.div
      className="xbox-card glass-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="card-head">
        <img
          src={imgurl}
          alt="خرید کنترلر های جدید ایکس باکس"
        />
      </div>
      <hr />
      <p className="text-center" style={{ fontSize: "16px" }}>
        {name}
      </p>
      <p className="p-price">{price.toLocaleString("fa-IR")} تومان</p>
    </motion.div>
  );
}

export default XboxCard;
