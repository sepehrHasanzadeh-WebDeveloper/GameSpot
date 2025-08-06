require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const ConnectDB = require("./utils/ConnectDB");
const allProducts = require("./Router/allProducts");
const errorHandler = require("./middlewares/errorHandler");
const authRoute = require("./Router/authRoute");
const cookieParser = require("cookie-parser");
const ProtectRoute = require("./Router/PrivetRoute");
const messgaeRoute = require("./Router/MessageRoute");
const getUserList = require("./Router/showUserRoute");
const ProductPage = require("./Router/getProductRoute");
const cart = require("./Router/CartRoute");
const OrderRouter = require("./Router/order");
const authmiddlewares = require("./middlewares/authmiddlewares");
const SubmitAddress = require("./Router/SubmitAddress");
const VisitRoute = require("./Router/VisitRouter");
const AddProductRoute = require("./Router/addProductRoute");
const purchesEmail = require("./Router/SendEmailRoute");
const app = express();
const port = process.env.PORT;

app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

ConnectDB();

app.use("/products", allProducts);
app.use("/auth", authRoute);
app.use("/userPanel", ProtectRoute);
app.use("/Message", messgaeRoute);
app.use("/userInfo", getUserList);
app.use("/products/pages", ProductPage);
app.use("/api/cart", cart);
app.use("/api/order", OrderRouter);
app.use("/users", SubmitAddress);
app.use("/visit", VisitRoute);
app.use("/admin", AddProductRoute);
app.use("/api/purches", purchesEmail);
// app.use("*", (req, res, next) => {
//   res.status(404).json({ message: "صفحه پیدا نشد ⚠️" });
// });
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});
