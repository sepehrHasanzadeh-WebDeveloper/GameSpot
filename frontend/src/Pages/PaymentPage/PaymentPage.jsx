import "./PaymentPage.css";
import { useEffect, useState } from "react";
import ZibalImg from "../../assets/images/zibal.webp";
import SecurityCodeInput from "./SecurityCode";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import brandImg from "../../assets/images/brandText.png";
import axios from "axios";
import { clearCart } from "../../Redux/Slice/cart";

function PaymentPage() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((store) => store.User);
  const { products } = useSelector((store) => store.cart);
  const [code, setCode] = useState("");
  const [userInput, setUserInput] = useState("");
  const { totalPrice } = useSelector((store) => store.cart);
  const navigate = useNavigate();

  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    Cardname: "",
    cvv: "",
    cardDate: "",
    SecurityCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCardInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const inputFormatter = (value) => {
    const cleaned = value.replace(/\D/g, "");
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join("-") : "";
  };

  const handleCardNumberChange = (e) => {
    const formatted = inputFormatter(e.target.value);
    setCardInfo((prev) => ({
      ...prev,
      cardNumber: formatted,
    }));
  };

  useEffect(() => {
    document.body.style.backgroundImage =
      "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)";
    document.body.style.color = "#000";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.height = "150vh";
    return () => {
      document.body.style.background = "#0d0d0d";
      document.body.style.color = "#f5f5f5";
    };
  }, []);

  const potOutHandler = () => {
    Swal.fire({
      text: "می‌خواهید از پرداخت انصراف دهید؟",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "خیر",
      confirmButtonText: "بله",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  };

  const payProductFinally = async () => {
    const { cardNumber, Cardname, cvv, cardDate } = cardInfo;

    if (!cardNumber || !Cardname || !cvv || !cardDate || !userInput) {
      Swal.fire({
        title: "اخطار",
        text: "لطفاً تمام اطلاعات خواسته‌شده را وارد کنید!",
        icon: "warning",
      });
      return;
    }

    if (userInput !== code) {
      Swal.fire({
        title: "اخطار",
        text: "کد امنیتی مطابقت ندارد!",
        icon: "warning",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:6500/api/order",
        {
          userInfo,
          items: products.map((item) => ({
            productId: item.id,
            category: item.category,
            price: item.price,
            name: item.title,
            quantity: item.quantity,
            image: item.image,
          })),
          totalPrice,
        },
        { withCredentials: true }
      );
      await axios.post("http://localhost:6500/api/purches", {
        userEmail: userInfo.email,
        userName: userInfo.firstName + userInfo.lastName,
        userID :userInfo._id,
        purchesItems: products,
        totalPrice,
      });
      Swal.fire({
        title: "✅ پرداخت موفق",
        text:
          response.data.message +
          "لطفا به پنل کاربری بروید و ادرس خود را برای ارسال ثبت کنید ",
        icon: "success",
        confirmButtonText: "ثبت ادرس ",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/userpanel");
        } else {
          navigate("/");
        }
      });

      dispatch(clearCart());
    } catch (err) {
      Swal.fire({
        title: "خطا در ثبت سفارش",
        text: err.response?.data?.message || "مشکلی پیش آمده",
        icon: "error",
      });
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-form glass-card">
        <img className="zibal-img" src={ZibalImg} alt="درگاه پرداخت زیبال" />
        <h5 className="mt-4">
          به درگاه پرداخت <span style={{ color: "blue" }}>زیبال</span> خوش آمدید
        </h5>
        <div className="payment-info">
          <p className="fw-bold">
            پرداخت مبلغ: {totalPrice.toLocaleString()} تومان
          </p>
          <div className="get-way-info">
            <p className="mt-3">گیرنده: گیم اسپات</p>
            <img className="brand-img" src={brandImg} alt="برند" />
          </div>
        </div>

        <input
          type="text"
          inputMode="numeric"
          maxLength="19"
          placeholder="شماره کارت"
          name="cardNumber"
          style={{ direction: "ltr" }}
          value={cardInfo.cardNumber}
          onChange={handleCardNumberChange}
        />

        <input
          type="text"
          placeholder="نام دارنده کارت"
          name="Cardname"
          value={cardInfo.Cardname}
          onChange={handleChange}
        />

        <div className="sec2-payment-form">
          <input
            type="text"
            maxLength="3"
            placeholder="CVV2"
            inputMode="numeric"
            name="cvv"
            value={cardInfo.cvv}
            onChange={handleChange}
          />
          <input
            type="date"
            name="cardDate"
            value={cardInfo.cardDate}
            onChange={handleChange}
          />
        </div>

        <SecurityCodeInput code={code} setCode={setCode} />

        <input
          type="text"
          placeholder="کد امنیتی را وارد کنید"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />

        <div className="btn-group">
          <button className="btn-pay" onClick={payProductFinally}>
            پرداخت
          </button>
          <button className="btn-back" onClick={potOutHandler}>
            انصراف / بازگشت به سایت
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
