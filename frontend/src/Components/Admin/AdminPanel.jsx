import { Col, Container, Row } from "react-bootstrap";
import "./AdminPanel.css";
import { RiAdminFill } from "react-icons/ri";
import { PiUsersThreeFill } from "react-icons/pi";
import { IoMdExit } from "react-icons/io";
import { MdVisibility } from "react-icons/md";
import { BsCartCheckFill } from "react-icons/bs";
import { FaWarehouse } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import {  useEffect, useState } from "react";
import UserTable from "./UserTable";

import AdminMessages from "./MessagePage";
import StockPage from "./StockPage";
import OrderList from "./OrderList";
import Chart from "./Chart";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isAdmin } from "../../Redux/Slice/user";
import MainPage from "./Add-EditProduct/MainPage";
import { RiFolderAddFill } from "react-icons/ri";
import axios from "axios";
const menuItems = [
  {
    id: "users",
    label: "لیست کاربران",
    Component: <UserTable />,
    icon: <PiUsersThreeFill size={25} />,
  },
  {
    id: "messages",
    label: "پیام‌های دریافتی",
    Component: <AdminMessages />,
    icon: <TiMessages size={25} />,
  },
  {
    id: "stock",
    label: "موجودی انبار",
    Component: <StockPage />,
    icon: <FaWarehouse size={25} />,
  },
  {
    id: "orders",
    label: "لیست سفارشات",
    Component: <OrderList />,
    icon: <BsCartCheckFill size={25} />,
  },
  {
    id: "views",
    label: "بازدیدها",
    Component: <Chart />,
    icon: <MdVisibility size={25} />,
  },
  {
    id: "addProduct",
    label: "اضافه کردن محصول",
    Component: <MainPage />,
    icon: <RiFolderAddFill size={25} />,
  },
];

function AdminPanel() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    document.body.style.backgroundColor = " var(--background2)";
    const checkisAdmin = async () => {
      try {
        const res = await axios.get(
          "http://localhost:6500/userPanel/dashboard",
          { withCredentials: true }
        );
      } catch (err) {
        Swal.fire({
          title: "امکان دسترسی به این صفحه نیست ",
          text: "دسترسی به صفحه ادمین ندارید !",
          icon: "warning",
        });
        navigate("/");
      }
    };
    checkisAdmin()
  }, []);
  const [activeItem, setActiveItem] = useState("users");
  const exitPanel = () => {
    Swal.fire({
      title: "هشدار !",
      text: "میخواهید از پنل کاربری خارج شوید ؟ ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله، خارج شو!",
      cancelButtonText: "نه، بی‌خیال",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
        dispatch(isAdmin());
        document.body.style.backgroundColor = "#0d0d0d";
      }
    });
  };
  return (
    <Container fluid style={{ height: "100vh" }}>
      <Row className="gy-5">
        <Col
          className="col-lg-2 p-4 col-option"
          style={{ backgroundColor: "var(--menuBackground)", height: "100vh" }}
        >
          <p className="admin-title">
            پنل ادمین <RiAdminFill size={35} />
          </p>
          <hr />
          {menuItems.map((item) => (
            <p
              key={item.id}
              className={`menu-item ${activeItem === item.id ? "active" : ""}`}
              onClick={() => setActiveItem(item.id)}
            >
              {item.icon} {item.label}
            </p>
          ))}
          <p onClick={exitPanel}>
            <IoMdExit size={25} /> خروج از پنل{" "}
          </p>
        </Col>

        <Col className="p-4 mt-5">
          <h2>
            شما در بخش: {menuItems.find((i) => i.id === activeItem)?.label}
          </h2>
          <div className="mt-4">
            {menuItems.find((i) => i.id === activeItem)?.Component || (
              <p>در حال توسعه...</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminPanel;
