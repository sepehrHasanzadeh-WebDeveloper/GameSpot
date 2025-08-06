import "./NavBar.css";
import { FaTelegramPlane, FaInstagram } from "react-icons/fa";
import brandIMg from "../../assets/images/Brand_img-removebg-preview.png";
import { Navbar, Container, Offcanvas, Nav, Button } from "react-bootstrap";
import { CiMenuBurger } from "react-icons/ci";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { MdAdminPanelSettings } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";

function NavBar() {
  const { userLogin, adminState } = useSelector((store) => store.User);
  const expand = "lg";
  const { countofProduct } = useSelector((store) => store.cart);
  const [show, setshow] = useState(false);

  const handelClose = () => setshow(false);
  const handelShow = () => setshow(true);
  const navigate = useNavigate();
  const panelPageHandler = () => {
    navigate("/userpanel");
  };
  const exitAdminHandler = () => {
    navigate("/admin-panel");
  };
  return (
    <>
      <Navbar collapseOnSelect expand="lg" style={{ color: "var(--text)" }}>
        <Container>
          <Navbar.Brand
            style={{ color: "var(--text)", direction: "ltr" }}
            className="img-fluid "
          >
            {" "}
            <img
              src={brandIMg}
              alt="خرید امن و مطمعن از GameSpot"
              className=" d-block"
              style={{ maxHeight: "150px", width: "auto" }}
              onClick={() => navigate("/")}
            />{" "}
          </Navbar.Brand>
          <Button
            variant="outline-light"
            onClick={handelShow}
            className="d-lg-none "
          >
            {<CiMenuBurger />}
          </Button>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink
                to={"/AllConsoles"}
                className="nav-link"
                style={{
                  color: "var(--text)",
                  fontSize: "14px",
                  marginTop: "15px",
                }}
              >
                {" "}
                کنسول های بازی{" "}
              </NavLink>

              <NavLink
                to={"/AllGames"}
                className="nav-link"
                style={{
                  color: "var(--text)",
                  fontSize: "14px",
                  marginTop: "15px",
                }}
              >
                {" "}
                عناوین بازی
              </NavLink>

              <NavLink
                to={"/GiftCards"}
                className="nav-link"
                style={{
                  color: "var(--text)",
                  fontSize: "14px",
                  marginTop: "15px",
                }}
              >
                گیفت کارت ها
              </NavLink>
              {countofProduct > 0 ? (
                <NavLink
                  to={"/cart"}
                  className="nav-link"
                  style={{
                    color: "var(--primary)",
                    fontSize: "14px",
                    marginTop: "15px",
                  }}
                >
                  سبد خرید
                </NavLink>
              ) : (
                ""
              )}
              <NavLink
                to={"/cart"}
                className="nav-link"
                style={{ color: "var(--primary)", fontSize: "30px" }}
              >
                <AiOutlineShoppingCart />
              </NavLink>
            </Nav>
            <Nav>
              {userLogin == true ? (
                <FaUser
                  size={50}
                  className="panel-logo-style"
                  onClick={panelPageHandler}
                />
              ) : adminState == true ? (
                <MdAdminPanelSettings
                  onClick={exitAdminHandler}
                  size={50}
                  className="panel-logo-style"
                />
              ) : (
                <NavLink to={"/Submit"} className="nav-link">
                  <button className="btn-register">ثبت نام / ورود </button>
                </NavLink>
              )}
            </Nav>
          </Navbar.Collapse>
          <Offcanvas
            show={show}
            onHide={handelClose}
            placement="end"
            backdrop={true}
            scroll={false}
          >
            <Offcanvas.Header
              closeButton
              style={{ backgroundColor: "grey", direction: "ltr" }}
            >
              <Offcanvas.Title>
                {" "}
                Game <span className="text-info">Spot</span>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body style={{ backgroundColor: "var(--secondary)" }}>
              <Nav className="flex-column text-end">
                {userLogin == true ? (
                  <FaUser
                    size={50}
                    className="panel-logo-style"
                    style={{ margin: "15px 0" }}
                  />
                ) : (
                  <NavLink to={"/Submit"} className="nav-link">
                    <button className="btn-register">ثبت نام / ورود </button>
                  </NavLink>
                )}
                <NavLink
                  to={"/AllConsoles"}
                  className="nav-link"
                  style={{ color: "var(--text)", fontSize: "14px" }}
                >
                  کنسول های بازی{" "}
                </NavLink>

                <NavLink
                  to={"/AllGames"}
                  className="nav-link"
                  style={{ color: "var(--text)", fontSize: "14px" }}
                >
                  عناوین بازی
                </NavLink>
                <NavLink
                  to={"/GiftCards"}
                  className="nav-link"
                  style={{ color: "var(--text)", fontSize: "14px" }}
                >
                  گیفت کارت ها
                </NavLink>
                <NavLink
                  to={"/cart"}
                  className="nav-link"
                  style={{ color: "var(--primary)", fontSize: "30px" }}
                >
                  <AiOutlineShoppingCart />
                </NavLink>

                <hr />
                <p className="m-2 text-light">
                  مارا در شبکه های اجتماعی دنبال کنید
                </p>
                <div className="media-div">
                  <FaTelegramPlane
                    size={35}
                    color="#00e1ff"
                    style={{ margin: "20px 60px" }}
                  />
                  <FaInstagram
                    size={35}
                    color="#ef59bd"
                    style={{ margin: "0 15px" }}
                  />
                </div>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
export default NavBar;
