import "./Login.css";
import { Container } from "react-bootstrap";
import brandImg from "../../assets/images/Brand_img-removebg-preview.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "../../Components/Footer/Footer";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { adminState, getUserInfo, userState } from "../../Redux/Slice/user";
import Swal from "sweetalert2";
import Meta from "../../Components/Helmet/Meta";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formStatus, setFormStatus] = useState("login");
  const [getinfo, setGetinfo] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const handelChange = (e) => {
    setGetinfo({ ...getinfo, [e.target.name]: e.target.value });
  };

  const CreateAccontHandler = async (e) => {
    e.preventDefault();
    if (!getinfo.firstName || !getinfo.email || !getinfo.password) {
      alert("لطفاً همه فیلدها را پر کنید");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:6500/auth/userregister",
        getinfo,
        {
          withCredentials: true,
        }
      );

      toast.success("ثبت‌نام با موفقیت انجام شد!");

      setGetinfo({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: "",
      });
      const { password, ...getinfoWhitoutPass } = getinfo;
      dispatch(getUserInfo(getinfoWhitoutPass));
      dispatch(userState());
      navigate("/");
    } catch (err) {
      const errors = err.response?.data;

      if (Array.isArray(errors)) {
        const messages = errors.map((e) => e.message).join("\n");
        alert(messages);
      } else {
        alert("مشکلی پیش امده");
      }
    }
  };
  const ChangeformHandler = () => {
    if (formStatus == "login") setFormStatus("signin");
    else setFormStatus("login");
  };

  const [getlogindata, setGetlogindata] = useState({
    email: "",
    password: "",
  });
  const loginDataHandler = (e) => {
    setGetlogindata({ ...getlogindata, [e.target.name]: e.target.value });
  };
  const logininHandler = async (e) => {
    e.preventDefault();
    if (!getlogindata.email || !getlogindata.password) {
      alert("لطفاً همه فیلدها را پر کنید");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:6500/auth/login",
        getlogindata,
        {
          withCredentials: true,
        }
      );
      Swal.fire({
        icon: "success",
        title: "سلام خوش برگشتی !",
        text: res.data.message,
      });
      dispatch(getUserInfo(res.data.user));

      if (res.data.user.role === "admin") {
        dispatch(adminState());
        navigate("/admin-panel");
      } else {
        navigate("/");
        dispatch(userState());
      }
    } catch (err) {
      let errorMsg = err;
      if (Array.isArray(err.response.data)) {
        errorMsg = err.response.data[0].message;
      } else {
        errorMsg = err.response.data.message;
      }

      Swal.fire({
        text: errorMsg,
        icon: "error",
      });
    }
  };
  return (
    <>
      <Meta
        title="ورود به حساب کاربری | ثبت نام"
        description="برای دسترسی به سفارش‌ها، علاقه‌مندی‌ها و خرید سریع وارد حساب کاربری خود در GameSpot شوید."
      />
      <Container>
        {formStatus == "login" ? (
          <div className="form-container">
            <div id="form-ui">
              <form action="" method="post" id="form">
                <div id="form-body">
                  <div id="welcome-lines">
                    <img
                      className="brand-style"
                      src={brandImg}
                      alt="Spot Game Brand"
                    />
                    <div id="welcome-line-2">سلام خوش امدید </div>
                  </div>
                  <div id="input-area">
                    <div className="form-inp">
                      <input
                        placeholder="ادرس ایمیل"
                        type="text"
                        name="email"
                        value={getlogindata.email}
                        onChange={loginDataHandler}
                      />
                    </div>
                    <div className="form-inp">
                      <input
                        placeholder="رمز عبور "
                        type="password"
                        name="password"
                        onChange={loginDataHandler}
                        value={getlogindata.password}
                      />
                    </div>
                  </div>
                  <div id="submit-button-cvr">
                    <button
                      id="submit-button"
                      type="submit"
                      onClick={logininHandler}
                    >
                      ورود به حساب کاربری
                    </button>
                  </div>
                  <div id="forgot-pass">
                    <Link>
                      <p>رمز عبور خود را فراموش کرده اید ؟</p>
                    </Link>
                    <p
                      style={{ color: "white", cursor: "pointer" }}
                      onClick={ChangeformHandler}
                    >
                      حساب ندارم / ساخت حساب{" "}
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="form-container">
            <div id="form-ui">
              <form action="" method="post" id="form-signin">
                <div id="form-body">
                  <div id="welcome-lines">
                    <img
                      className="brand-style"
                      src={brandImg}
                      alt="Spot Game Brand"
                    />
                    <div id="welcome-line-2">سلام خوش امدید </div>
                  </div>
                  <div id="input-area">
                    <div className="item-input">
                      <div className="form-inp">
                        <input
                          placeholder="نام"
                          type="text"
                          name="firstName"
                          value={getinfo.firstName}
                          onChange={handelChange}
                        />
                      </div>
                      <div className="form-inp">
                        <input
                          placeholder="نام خانوادگی"
                          type="text"
                          name="lastName"
                          value={getinfo.lastName}
                          onChange={handelChange}
                        />
                      </div>
                    </div>
                    <div className="item-input">
                      <div className="form-inp">
                        <input
                          placeholder="تلفن همراه"
                          type="number"
                          name="phoneNumber"
                          value={getinfo.phoneNumber}
                          onChange={handelChange}
                        />
                      </div>
                      <div className="form-inp">
                        <input
                          placeholder="ادرس ایمیل "
                          type="email"
                          name="email"
                          value={getinfo.email}
                          onChange={handelChange}
                        />
                      </div>
                    </div>
                    <div className="form-inp">
                      <input
                        placeholder="رمز عبور"
                        type="password"
                        name="password"
                        value={getinfo.password}
                        onChange={handelChange}
                      />
                    </div>
                  </div>
                  <div id="submit-button-cvr">
                    <button
                      id="submit-button"
                      type="submit"
                      onClick={CreateAccontHandler}
                    >
                      ساخت حساب کاربری
                    </button>
                  </div>
                  <div id="forgot-pass">
                    <Link>
                      <p>رمز عبور خود را فراموش کرده اید ؟</p>
                    </Link>
                    <p
                      style={{ color: "white", cursor: "pointer" }}
                      onClick={ChangeformHandler}
                    >
                      حساب ندارم / ساخت حساب{" "}
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </Container>
      <Footer />
    </>
  );
}
export default Login;
