import { useSelector } from "react-redux";
import "./AllGames.css";
import { Col, Container, Row } from "react-bootstrap";
import GameCard from "./GameCard";
import Footer from "../../Components/Footer/Footer";
import Gamesimg from "../../assets/images/games-img.jpg";

function AllGames() {
  const { DiskDataps, DiskDataxb } = useSelector((store) => store.Disk_Product);
  const allDisks = [...DiskDataps, ...DiskDataxb];
  return (
    <>
      <Container className="Container-Disks-style p-3">
        <h1 style={{fontSize:"30px" , textAlign:"center" , margin:"30px 0"}}>خرید دیسک بازی برای کنسول </h1>
        <Row className="gy-5 row-cols-2 row-cols-md-2 row-cols-lg-4 row-cols-xl-5">
          {allDisks.map((disk) => (
            <Col key={disk._id}>
              <GameCard {...disk} />
            </Col>
          ))}
        </Row>
      </Container>
      <Container className="mt-5 p-5 console-games">
        <h3>مزایای دیسک‌های بازی PS5</h3>
        <p>
          با خرید دیسک بازی، شما مالک فیزیکی آن بازی می‌شوید. این موضوع برای
          افرادی که به جمع‌آوری بازی‌ها علاقه دارند، اهمیت زیادی دارد. شما
          می‌توانید دیسک‌های بازی خود را به دیگران بفروشید یا با آن‌ها تبادل
          کنید. این موضوع به شما امکان می‌دهد تا بازی‌های جدید را با هزینه کمتری
          تجربه کنید. با خرید دیسک بازی، نیازی به دانلود حجم زیاد بازی از
          اینترنت ندارید.
        </p>
        <p>
          {" "}
          این موضوع برای افرادی که اینترنت پرسرعت ندارند، اهمیت زیادی دارد.
          اگرچه نصب بازی از روی دیسک هم انجام می‌شود، اما به دلیل اینکه بخشی از
          اطلاعات بازی روی دیسک قرار دارد، نصب آن سریع‌تر از دانلود کامل بازی
          است.
        </p>
        <p>
          اگر دیسک بازی شما سالم باشد، همیشه به آن دسترسی خواهید داشت. این موضوع
          در مقایسه با بازی‌های دیجیتال که ممکن است به دلایل مختلف از دسترس خارج
          شوند، اهمیت دارد.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "30px",
          }}
        >
          <img src={Gamesimg} alt="خرید دیسک بازی از اسپات گیم " />
        </div>
        <h3>نکات مهم</h3>
        <p>
          کنسول PS5 در دو مدل عرضه می‌شود، مدل استاندارد با درایو دیسک و مدل
          دیجیتال بدون درایو دیسک. توجه داشته باشید که مدل استاندارد PS5
          می‌تواند دیسک‌های Ultra HD Blu-ray PS5 و همچنین دیسک‌های Blu-ray PS4
          را اجرا کند. اما مدل دیجیتال PS5 فقط می‌تواند بازی‌های دیجیتالی را که
          از طریق فروشگاه PlayStation Store دانلود شده‌اند، اجرا کند. همچنین
          توجه داشته باشید که به طور خلاصه، دیسک‌های بازی PS5 از نوع Ultra HD
          Blu-ray هستند که ظرفیت بالا و کیفیت تصویر بالایی را ارائه می‌دهند.
        </p>
      </Container>
      <Footer />
    </>
  );
}
export default AllGames;
