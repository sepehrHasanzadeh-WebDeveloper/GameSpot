import { useSelector } from "react-redux";
import "./GiftCards.css";
import { Col, Container, Row } from "react-bootstrap";
import GiftImg from "../../assets/images/psgiftCardimg.png";
import xboximg from "../../assets/images/xboxGiftImg-removebg-preview.png";
import Footer from "../../Components/Footer/Footer";
import GiftCardsitem from "../../Components/Gift_Card/GiftCards-item";
import Meta from "../../Components/Helmet/Meta";
function GiftCards() {
  const { GiftCardData, xboxdata } = useSelector(
    (store) => store.GiftCards_Product
  );
  const allGiftCards = [...GiftCardData, ...xboxdata];
  return (
    <>
      <Meta
        title="خرید گیفت کارت پلی‌استیشن، ایکس‌باکس و استیم با تحویل فوری | GameSpot"
        description="انواع گیفت کارت PSN، Xbox، استیم، اپل و گوگل پلی با تحویل آنی و قیمت مناسب در GameSpot. خرید آسان، امن و سریع!"
      />
      <h1 style={{ fontSize: "30px", textAlign: "center", margin: "30px 0" }}>
        خرید گیفت کارت های دلاری{" "}
      </h1>
      <Container className="Container-giftcard-style p-3">
        <Row className=" gy-5 row-cols-2 row-cols-md-2 row-cols-lg-4 row-cols-xl-5 ">
          {allGiftCards.map((card) => (
            <Col key={card._id}>
              <GiftCardsitem {...card} />
            </Col>
          ))}
        </Row>
      </Container>
      <Container className="Articels-giftcard-style p-3">
        <h5>خرید گیفت کارت پلی استیشن، ایکس باکس | Gift Card</h5>
        <p>
          در این صفحه می‌توانید نسبت به خرید شارژ گیفت کارت‌های مختلف شامل
          کارت‌های مخصوص Playstation Network، پلی استیشن پلاس (Playstation
          Plus)، ایکس باکس لایو (Xbox Live) و ... اقدام کنید. در دنیای بازی‌های
          ویدیویی، گیفت کارت‌ها به یکی از روش‌های محبوب برای خرید بازی‌ها،
          محتواهای دیجیتال و اشتراک‌های مختلف تبدیل شده‌اند. این کارت‌ها توسط سه
          کنسول اصلی در صنعت بازی‌های ویدیویی، یعنی پلی استیشن، ایکس باکس و
          نینتندو عرضه می‌شوند. در این مقاله، به بررسی گیفت کارت‌های هر یک از
          این کنسول‌ها و نحوه استفاده از آن‌ها می‌پردازیم.
        </p>
        <hr />
        <h5>گیفت کارت پلی استیشن (PlayStation Gift Card)</h5>
        <p>
          پلی استیشن یکی از برندهای معروف در دنیای بازی‌های ویدیویی است که توسط
          شرکت سونی توسعه داده شده است. گیفت کارت پلی استیشن به کاربران این
          امکان را می‌دهد تا موجودی حساب PlayStation Network (PSN) خود را شارژ
          کنند. این موجودی می‌تواند برای خرید بازی‌ها، افزونه‌های بازی، اشتراک
          PlayStation Plus، یا خرید محتوای دیجیتال دیگر استفاده شود.
        </p>
        <hr />
        <div className="GiftImg-style">
          <img src={GiftImg} alt="خرید گیفت کارت پلی استیشن" className="img-fluid" />
        </div>
        <h5>گیفت کارت ایکس باکس (Xbox Gift Card)</h5>
        <p>
          ایکس باکس یکی از رقبای بزرگ پلی استیشن است که توسط شرکت مایکروسافت
          تولید می‌شود. گیفت کارت‌های ایکس باکس مشابه به گیفت کارت‌های پلی
          استیشن عمل می‌کنند، اما بر روی پلتفرم ایکس باکس و سرویس‌های مرتبط با
          آن کاربرد دارد.
        </p>
        <hr />
        <h5>ویژگی‌های گیفت کارت ایکس باکس</h5>
        <p>
          از این کارت‌ها برای خرید بازی‌ها، DLCها (محتواهای دانلودی)، و
          افزونه‌های مختلف در Xbox Store می‌توان استفاده کرد.
        </p>
        <p>
          یکی از استفاده‌های محبوب گیفت کارت‌های ایکس باکس، خرید اشتراک Xbox
          Game Pass است که دسترسی به هزاران بازی برای کنسول ایکس باکس و PC را
          فراهم می‌آورد.
        </p>
        <p>
          برای استفاده از گیفت کارت ایکس باکس، باید کد کارت را در قسمت مربوطه در
          کنسول ایکس باکس یا از طریق وبسایت Xbox وارد کرده و موجودی حساب خود را
          افزایش دهید.
        </p>
        <hr />
        <div className="GiftImg-style">
          <img src={xboximg} alt="خرید گیفت کارت ایکس باکس " className="img-fluid" />
        </div>
      </Container>
      <Footer />
    </>
  );
}
export default GiftCards;
