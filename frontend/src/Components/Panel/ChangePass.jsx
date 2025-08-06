import { useState } from "react";
import Form from "react-bootstrap/Form";

import Swal from "sweetalert2";
import axios from "axios";
import "./UserPanel.css";

import { BiHide } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
function ChangePassword() {
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmNewPassword) {
      Swal.fire({
        icon: "error",
        title: "رمز جدید با تایید آن یکی نیست!",
      });
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:6500/auth/updatepassword",
        {
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        },
        { withCredentials: true }
      );

      Swal.fire({
        icon: "success",
        title: "رمز عبور با موفقیت تغییر کرد!",
      });
      // optionally reset fields
      setPasswords({
        currentPassword: userInfo.password,
        newPassword: "",
        confirmNewPassword: "",
      });
      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "خطا!",
        text: err.response.data.message + "",
      });
    }
  };
  const [passState, setPassState] = useState("password");
  const showPass = () => {
    if (passState == "password") setPassState("text");
    else setPassState("password");
  };
  return (
    <Form onSubmit={handleSubmit} className="user-form-info">
      <Form.Group className="input-item" controlId="currentPassword">
        <Form.Label className="label-input">رمز عبور فعلی </Form.Label>
        <BiHide
          color="wite"
          size={30}
          style={{ cursor: "pointer" }}
          onClick={showPass}
        />
        <Form.Control
          type={passState}
          name="currentPassword"
          value={passwords.currentPassword}
          onChange={handleChange}
          style={{
            backgroundColor: "grey",
            marginRight: "50px",
            width: "50%",
          }}
        />
      </Form.Group>

      <Form.Group className="input-item" controlId="newPassword">
        <Form.Label className="label-input">رمز عبور جدید</Form.Label>
        <Form.Control
          type="password"
          name="newPassword"
          value={passwords.newPassword}
          onChange={handleChange}
          style={{
            backgroundColor: "grey",
            marginRight: "50px",
            width: "50%",
          }}
        />
      </Form.Group>

      <Form.Group className="input-item" controlId="confirmNewPassword">
        <Form.Label className="label-input">تأیید رمز جدید</Form.Label>
        <Form.Control
          type="password"
          name="confirmNewPassword"
          value={passwords.confirmNewPassword}
          onChange={handleChange}
          style={{
            backgroundColor: "grey",
            marginRight: "50px",
            width: "50%",
          }}
        />
      </Form.Group>

      <button
        style={{ width: "200px" }}
        type="submit"
        className="btn-update-info"
      >
        ذخیره تغییرات
      </button>
    </Form>
  );
}

export default ChangePassword;
