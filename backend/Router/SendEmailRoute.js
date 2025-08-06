const express = require("express");
const router = express.Router();
const sendEmail = require("../utils/SendEmail");

router.post("/", async (req, res) => {
  const { userEmail, userName, userID ,purchesItems , totalPrice } = req.body;
    const nowDate = new Date()
    const tempDate = nowDate.toLocaleDateString("fa-IR")
  const itemsHtml = purchesItems
    .map(
      (item) => `
    <div style="display: flex; align-items: center; margin-bottom: 16px; border-bottom: 1px solid #eee; padding-bottom: 12px;">
      <img src="${item.image}" alt="${item.title}" style="width: 80px; height: auto; border-radius: 8px; margin-left: 12px;" />
      <div>
        <h3 style="margin: 0; font-size: 16px;">${item.title}</h3>
        <p style="margin: 4px 0; color: #555;">${item.price.toLocaleString("fa-IR")}</p>
      </div>
    </div>
  `
    )
    .join("");

  
  const htmlContent = `
    <div style="font-family: Tahoma, sans-serif; direction: rtl; padding: 24px; background: #f9f9f9;">
      <h2 style="color: #4CAF50;">سلام ${userName} عزیز 🌟</h2>
      <p>سفارش شما با موفقیت ثبت شد و در حال پردازش است.</p>

      <h3 style="margin-top: 24px;">جزئیات سفارش:</h3>
      <div style="background: #fff; border-radius: 8px; padding: 16px; box-shadow: 0 0 8px rgba(0,0,0,0.05);">
        ${itemsHtml}
        <p style="font-weight :bold; direction: rtl ">تاریخ ثبت سفارش : ${tempDate} </p>
        <p>روش پرداخت : اینترنتی  | درگاه پرداخت زیبال</p>
        <p style="font-weight :bold; direction: rtl ">مجموع مبلغ : ${totalPrice.toLocaleString("fa-IR")} میلیون تومان </p>
        <p style=" direction: rtl ">ادرس برای ارسال : ادرس وارد نکردید لطفا وارد سایت بشوید و ادرس رو وارد کنید ./p>
        <p>کد پیگیری : ${userID}</p>
        </div>

      <p style="margin-top: 24px;">در صورت نیاز به پشتیبانی با ما در تماس باشید.</p>
      <p style="font-weight :bold; direction: rtl ">شماره پشتیبانی : 09393148674</p>
      <p style="font-size: 12px; color: #777;">این ایمیل به صورت خودکار ارسال شده است. لطفاً به آن پاسخ ندهید.</p>
    </div>
  `;

  try {
    await sendEmail(
      userEmail,
      `سلام ${userName} گرامی`,
      htmlContent 
    );

    res.status(200).json({ message: "ایمیل ارسال شد" });
  } catch (err) {
    console.error("Email Send Error:", err);
    res.status(500).json({ error: "faild to send the email" });
  }
});

module.exports = router;
