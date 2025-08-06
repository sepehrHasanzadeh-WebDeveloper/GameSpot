import { Col, Container, Row } from "react-bootstrap";
import "./UserPanel.css";
import { FaUser, FaRegCreditCard } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { CiWallet, CiHeart } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdExit } from "react-icons/io";
import Footer from "../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { userExit } from "../../Redux/Slice/user";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import ShowUserInfo from "./ShowUserInfo";
import ChangePassword from "./ChangePass";
import { useEffect } from "react";
import userimg from "../../assets/images/undraw_welcome-cats_tw36-removebg-preview.png";
import Mymessages from "./Mymessages";
import { ClareMessage } from "../../Redux/Slice/Messages";
import Address from "./Address";
import FavoritPage from "./FavoritPage";
import { TbShoppingCartCopy } from "react-icons/tb";
import UserOrders from "./UserOrders";
import Meta from "../Helmet/Meta";

const Wishlist = () => <FavoritPage />;

function UserPanel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:6500/userPanel/panel", {
          withCredentials: true,
        });
      } catch (err) {
        Swal.fire({
          title: "امکان دسترسی به این صفحه نیست ",
          text: "ابتدا وارد سایت بشوید",
          icon: "warning",
        });
        navigate("/Submit");
      }
    };

    checkAuth();
  }, []);

  const menuItems = [
    {
      id: "userInfo",
      label: "ویرایش اطلاعات حساب کاربری",
      icon: <AiOutlineUser size={20} />,
    },
    {
      id: "changePassword",
      label: "تغییر رمز عبور",
      icon: <CiWallet size={20} />,
    },
    {
      id: "address",
      label: "تغییر اطلاعات دفترچه آدرس",
      icon: <IoLocationOutline size={20} />,
    },
    {
      id: "wishlist",
      label: "ویرایش لیست دلخواه",
      icon: <CiHeart size={20} />,
    },
    {
      id: "messages",
      label: "پیغام‌های من",
      icon: <FaRegCreditCard size={20} />,
    },
    {
      id: "orders",
      label: "سفارشات من",
      icon: <TbShoppingCartCopy size={20} />,
    },
  ];

  const [activeSection, setActiveSection] = useState(null);

  const exitPanelHandler = () => {
    Swal.fire({
      title: "آیا مطمئنی؟",
      text: "می‌خوای از حساب کاربری خارج بشی؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله، خارج شو!",
      cancelButtonText: "نه، بی‌خیال",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post(
            "http://localhost:6500/auth/logout",
            {},
            { withCredentials: true }
          );
          dispatch(userExit());
          dispatch(ClareMessage());
          navigate("/");
        } catch (err) {
          Swal.fire({
            title: "خطایی رخ داد",
            text: "خروج ناموفق بود",
            icon: "error",
          });
        }
      }
    });
  };

  const renderSection = () => {
    switch (activeSection) {
      case "userInfo":
        return <ShowUserInfo />;
      case "changePassword":
        return <ChangePassword />;
      case "address":
        return <Address />;
      case "wishlist":
        return <Wishlist />;
      case "messages":
        return <Mymessages />;
      case "orders":
        return <UserOrders />;
      default:
        return (
          <div className="p-2">
            <img
              src={userimg}
              className="img-fluid"
              alt="Welcome to user Panel"
            />
            <h4 className="text-center ">به پنل کاربری خوش امدید </h4>
          </div>
        );
    }
  };

  return (
    <>
      <Meta
        title="پنل کاربری شما | مدیریت سفارش‌ها و اطلاعات حساب | GameSpot"
        description="مدیریت اطلاعات حساب، مشاهده سفارش‌ها، علاقه‌مندی‌ها و تنظیمات شخصی در پنل کاربری GameSpot."
      />
      <Container className="mt-5">
        <div className="header-panel">
          <h3>حساب کاربری</h3>
          <button onClick={exitPanelHandler}>
            <IoMdExit /> خروج
          </button>
        </div>

        <Row className="gy-5 row-cols-1 row-cols-md-2">
          <Col lg={3}>
            <div className="user-info-col">
              <FaUser size={70} className="user-logo" />
              <ul>
                {menuItems.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={activeSection === item.id ? "active" : ""}
                    style={{ cursor: "pointer" }}
                  >
                    {item.label} {item.icon}
                  </li>
                ))}
              </ul>
            </div>
          </Col>

          <Col lg={9}>
            <div className="user-info-row">
              <div className="row-header">
                <h5>
                  {activeSection
                    ? menuItems.find((m) => m.id === activeSection)?.label
                    : "حساب کاربری من"}
                </h5>
                <h4>
                  <AiOutlineUser />
                </h4>
              </div>

              {renderSection()}
            </div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}

export default UserPanel;
