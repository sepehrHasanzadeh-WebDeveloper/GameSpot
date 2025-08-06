import { Container } from "react-bootstrap";
import "./UserPanel.css";
import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { addAddress, getAddressinfo } from "../../Redux/Slice/AddressBook";
function AddressForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    street: "",
    city: "",
    postalcode: "",
    country: "",
  });
  const HandleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const submitAddressHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        "http://localhost:6500/users/submitAddress",
        address,
        {
          withCredentials: true,
        }
      );

      toast.success("ادرس با موفقیت ثبت شد .");
      dispatch(getAddressinfo(address));
      setAddress({
        street: "",
        city: "",
        postalcode: "",
        country: "",
      });
      dispatch(addAddress());
      navigate("/");
      Swal.fire({
        title: "سفارش با موفقیت ثبت شد.",
        icon: "success",
        text: "شما میتوانید از وضعیت کالای خود در پنل با خبر باشید .",
      });
    } catch (err) {
      const errors = err.response?.data;
      if (Array.isArray(errors)) {
        const message = errors.map((e) => e.message);
        toast.error(message);
      } else {
        toast.error("خطا در سمت سرور");
      }
    }
  };
  return (
    <>
      <Container>
        <Toaster position="top-center" reverseOrder={false} />
        <div className="form-input">
          <div className="input-row">
            <label htmlFor="city">
              شهر <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="city"
              onChange={HandleAddressChange}
              value={address.city}
            />
          </div>

          <div className="input-row">
            <label htmlFor="country">
              کشور <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="country"
              onChange={HandleAddressChange}
              value={address.country}
            />
          </div>
          <div className="input-row">
            <label htmlFor="postalcode">
              کد پستی <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="postalcode"
              onChange={HandleAddressChange}
              value={address.postalcode}
              maxLength={10}
            />
          </div>
          <div className="input-row">
            <label htmlFor="street">
              ادرس <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="street"
              onChange={HandleAddressChange}
              value={address.street}
            />
          </div>
          <hr />
          <div className="footer-form">
            <button className="btn btn-info" onClick={submitAddressHandler}>
              ثبت ادرس
            </button>
            <button className="btn btn-secondary me-3">بازگشت</button>
          </div>
        </div>
      </Container>
    </>
  );
}
export default AddressForm;
