import "./GiftCardV2.css";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

function GiftCardV2() {
  const { GiftCardData } = useSelector((store) => store.GiftCards_Product);

  // فقط ۳ تا آیتم بگیر و به هر کدوم انیمیشن اختصاص بده
  const bestGiftCards = GiftCardData.slice(0, 3).map((card, index) => {
    let animation;
    if (index === 0) animation = { x: -100, opacity: 0 };
    else if (index === 1) animation = { scale: 0.8, opacity: 0 };
    else animation = { x: 100, opacity: 0 };

    return { ...card, animation };
  });

  return (
    <section className="gift-section mt-5">
      <h2 className="gift-title"> گیفت کارت‌های محبوب پلی استیشن 🎁</h2>
      <div className="gift-container">
        {bestGiftCards.map((card, index) => (
          <motion.div
            key={card._id}
            className="gift-card"
            initial={card.animation}
            whileInView={{ x: 0, scale: 1, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: index * 0.3,
              type: "spring",
              stiffness: 80,
            }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <img src={card.imgurl} alt={card.title  + "خرید "} />
            <h3>{card.title}</h3>
            <p className="price">{card.price.toLocaleString("fa-IR") + " تومان"} </p>
            <button className="buy-btn">خرید</button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default GiftCardV2;
