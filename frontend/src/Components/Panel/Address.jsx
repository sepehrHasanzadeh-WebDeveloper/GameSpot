import {  useState } from "react";
import "./UserPanel.css";
import { Container } from "react-bootstrap";
import { IoLocationOutline } from "react-icons/io5";
import AddressForm from "./AddressForm";
import { useSelector } from "react-redux";
function Address() {
  const { userAddress, isAddressAdd } = useSelector((store) => store.address);
  const { userInfo } = useSelector((store) => store.User);
  const [isAddAddress, setIsAddAddress] = useState(false);
  const SubmitAddressHandler = () => {
    if (isAddAddress) {
      setIsAddAddress(false);
    } else {
      setIsAddAddress(true);
    }
  };
  return (
    <>
      <Container>
        {isAddAddress == false ? (
          <>
            {" "}
            <h4
              style={{
                margin: "20px 10px",
                backgroundColor: "var(--secondary)",
              }}
            >
              <IoLocationOutline color="green" className="ms-5" size={35} />{" "}
              اطلاعات موجود دفترچه آدرس
            </h4>
            <hr />
            {isAddressAdd == false ? (
              <div className="div-noAddress">
                <p>هیچ آدرسی در حساب کاربری شما یافت نشد.</p>
                <button
                  className="btn-success btn"
                  onClick={SubmitAddressHandler}
                >
                  ادرس جدید
                </button>
              </div>
            ) : (
              <div className="div-address-info-card">
                <div className="address-info">
                  <p>
                    {userInfo.firstName} {userInfo.lastName}
                  </p>
                  <p>{userInfo.email}</p>
                  <p>{userAddress.city}</p>
                  <p>{userAddress.country}</p>
                  <p>کد پستی : {userAddress.postalcode}</p>
                  <p>{userAddress.street}</p>
                </div>
                <div className="edit-address">
                  <button className="delete-btn">حذف ادرس</button>
                  <button className="edit-btn">ویرایش ادرس</button>
                </div>
              </div>
            )}
          </>
        ) : (
          <AddressForm />
        )}
      </Container>
    </>
  );
}
export default Address;
