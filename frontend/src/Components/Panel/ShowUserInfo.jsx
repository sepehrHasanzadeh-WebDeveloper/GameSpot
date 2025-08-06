import { useState } from "react";
import "./UserPanel.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../Redux/Slice/user";
import { useNavigate } from "react-router-dom";
function ShowUserInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((store) => store.User);
  const [newDataValue, setNewDataValue] = useState({
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    phoneNumber: userInfo.phoneNumber,
    email: userInfo.email,
  });
  const updateDatahandler = () => {
    axios
      .put("http://localhost:6500/auth/updateuserInfo", newDataValue, {
        withCredentials: true,
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          text: "اطلاعات با موفقیت اپدیت شد ",
        });
        navigate("/");
        dispatch(getUserInfo(res.data.user));
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "خطا در ذخیره اطلاعات",
          text: err.response?.data?.message || "مشکلی پیش آمد",
        });
      });
  };
  return (
    <>
      <div className="user-info-row">
        <div className="user-form-info">
          <div className="input-item">
            <Form.Label htmlFor="nameinput" className="label-input">
              <span>نام</span>*
            </Form.Label>
            <Form.Control
              name="firstName"
              type="text"
              id="nameinput"
              aria-describedby="passwordHelpBlock"
              style={{
                backgroundColor: "grey",
                marginRight: "50px",
                width: "50%",
              }}
              value={newDataValue.firstName}
              onChange={(e) =>
                setNewDataValue({
                  ...newDataValue,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="input-item">
            <Form.Label htmlFor="lastNameinput" className="label-input">
              <span>نام خانوادگی</span>*
            </Form.Label>
            <Form.Control
              name="lastName"
              type="text"
              id="lastNameinput"
              aria-describedby="passwordHelpBlock"
              style={{
                backgroundColor: "grey",
                marginRight: "50px",
                width: "50%",
              }}
              value={newDataValue.lastName}
              onChange={(e) =>
                setNewDataValue({
                  ...newDataValue,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="input-item">
            <Form.Label htmlFor="phoneNumberinput" className="label-input">
              <span>شماره موبایل</span>*
            </Form.Label>
            <Form.Control
              name="phoneNumber"
              type="number"
              id="phoneNumberinput"
              aria-describedby="passwordHelpBlock"
              style={{
                backgroundColor: "grey",
                marginRight: "50px",
                width: "50%",
              }}
              value={newDataValue.phoneNumber}
              onChange={(e) =>
                setNewDataValue({
                  ...newDataValue,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="input-item">
            <Form.Label htmlFor="emailinput" className="label-input">
              <span>ایمیل</span>*
            </Form.Label>
            <Form.Control
              name="email"
              type="email"
              id="emailinput"
              aria-describedby="passwordHelpBlock"
              style={{
                backgroundColor: "grey",
                marginRight: "50px",
                width: "50%",
              }}
              value={newDataValue.email}
              onChange={(e) =>
                setNewDataValue({
                  ...newDataValue,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>

          <button className="btn-update-info" onClick={updateDatahandler}>
            ادامه{" "}
          </button>
        </div>
      </div>
    </>
  );
}
export default ShowUserInfo;
