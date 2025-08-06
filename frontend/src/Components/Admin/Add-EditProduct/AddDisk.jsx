import "./FormStyle.css";
import { Container, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function AddDisk() {
  const navigate = useNavigate()
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
  const [getData, setGetData] = useState({
    name: "",
    title: "",
    price: "",
    imgurl: "",
    brand: "",
    stock: "",
    option1: "",
    option2: "",
    option3: "",
    category: "",
  });
  const getProductvalue = (e) => {
    const { name, value } = e.target;
    setGetData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const addProductSubmit = async (e) => {
    e.preventDefault();

    // لیست فیلدهای ضروری که باید پر باشن
    const requiredFields = [
      "name",
      "title",
      "price",
      "imgurl",
      "brand",
      "stock",
      "option1",
      "option2",
      "option3",
      "category",
    ];

    const emptyFields = requiredFields.filter(
      (field) => !getData[field] || getData[field].toString().trim() === ""
    );

    if (emptyFields.length > 0) {
      toast("لطفا تمامی فیلد ها رو پر کنید !", {
        icon: "⚠️",
      });
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:6500/admin/add/product/disks",
        getData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("محصول شما با موفقیت اضافه شد ");
    } catch (err) {
      toast.error("خطایی در حین اضافه کردن محصول پیش امد .");
    }
  };
 
 

  return (
    <Container className="glass-card">
      <Toaster position="top-center" reverseOrder={false} />
      <p className="text-center mt-4">
        اضافه کردن محصول به دسته بندی دیسک بازی{" "}
      </p>
      <Form style={{ display: "flex", flexDirection: "column" }}>
        <div className="input-row">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="m-3">تیتر محصول</Form.Label>
            <Form.Control
              style={{
                backgroundColor: "var(--background2)",
                color: "white",
              }}
              type="text"
              onChange={getProductvalue}
              value={getData.title}
              name="title"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="m-3">مدل محصول</Form.Label>
            <Form.Control
              style={{
                backgroundColor: "var(--background2)",
                color: "white",
              }}
              type="text"
              onChange={getProductvalue}
              value={getData.name}
              name="name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="m-3">نوع کنسول(برند)</Form.Label>
            <Form.Control
              style={{
                backgroundColor: "var(--background2)",
                color: "white",
              }}
              type="text"
              onChange={getProductvalue}
              value={getData.brand}
              name="brand"
              required
            />
          </Form.Group>
        </div>

        <div className="input-row">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="m-3">قیمت محصول به تومان</Form.Label>
            <Form.Control
              style={{
                backgroundColor: "var(--background2)",
                color: "white",
              }}
              type="number"
              onChange={getProductvalue}
              value={getData.price}
              name="price"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="m-3">موجودی</Form.Label>
            <Form.Control
              style={{
                backgroundColor: "var(--background2)",
                color: "white",
              }}
              type="number"
              onChange={getProductvalue}
              value={getData.stock}
              name="stock"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="m-3">دسته بندی محصول</Form.Label>
            <Form.Control
              style={{
                backgroundColor: "var(--background2)",
                color: "white",
              }}
              type="text"
              placeholder="giftcard"
              className="placeholder-style"
              onChange={getProductvalue}
              value={getData.category}
              name="category"
              required
            />
          </Form.Group>
        </div>
        <div className="input-row">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="m-3">توضیح 1</Form.Label>
            <Form.Control
              style={{
                backgroundColor: "var(--background2)",
                color: "white",
              }}
              type="text"
              onChange={getProductvalue}
              value={getData.option1}
              name="option1"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="m-3">توضیح 2</Form.Label>
            <Form.Control
              style={{
                backgroundColor: "var(--background2)",
                color: "white",
              }}
              type="text"
              onChange={getProductvalue}
              value={getData.option2}
              name="option2"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="m-3">توضیح 3</Form.Label>
            <Form.Control
              style={{
                backgroundColor: "var(--background2)",
                color: "white",
              }}
              type="text"
              onChange={getProductvalue}
              value={getData.option3}
              name="option3"
              required
            />
          </Form.Group>
        </div>
        <div className="input-row">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="m-3">لینک عکس (url)</Form.Label>
            <Form.Control
              style={{
                backgroundColor: "var(--background2)",
                color: "white",
              }}
              type="text"
              onChange={getProductvalue}
              value={getData.imgurl}
              name="imgurl"
              required
            />
          </Form.Group>
        </div>
      </Form>
      <div className="add-product">
        <button onClick={addProductSubmit}>اضافه کردن محصول </button>
      </div>
    </Container>
  );
}
export default AddDisk;
