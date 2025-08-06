import { Col, Container, Form, Row, Button } from "react-bootstrap";
import "./Order.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Dropdown from "react-bootstrap/Dropdown";
import Swal from "sweetalert2";

const orderStatuses = [
  { value: "در حال پردازش", label: "در حال پردازش" },
  { value: "تحویل داده شده", label: "تحویل داده شده" },
  { value: "لغو شده", label: "لغو شده" },
];

function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:6500/api/order/orderlist"
        );
        setOrders(response.data);
      } catch (err) {
        toast.error("خطا در گرفتن اطلاعات");
      }
    };
    fetchOrderList();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.patch(
        `http://localhost:6500/api/order/${orderId}`,
        { status },
        { withCredentials: true }
      );
      Swal.fire("موفق!", "وضعیت سفارش بروزرسانی شد", "success");
    } catch (err) {
      Swal.fire("خطا", "مشکلی پیش آمده", "error");
    }
  };

  return (
    <>
      <Container className="mt-5">
        <Toaster position="top-center" reverseOrder={false} />
        <Row className="gy-5">
          <Col>
            <div className="col-info">
              <p>وضعیت سفارش</p>
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="d-flex gap-2 mb-3 align-items-center"
                >
                  <Form.Select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    style={{
                      backgroundColor: "grey",
                      color: "white",
                      border: "0",
                      textAlign: "center",
                      maxWidth: "200px",
                    }}
                  >
                    {orderStatuses.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </Form.Select>
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => updateOrderStatus(order._id, order.status)}
                  >
                    ثبت تغییرات
                  </Button>
                </div>
              ))}
            </div>
          </Col>

          <Col>
            <div className="col-info">
              <p>تاریخ سفارش</p>
              {orders.map((order) => (
                <div key={order._id} className="user-div">
                  <p>{new Date(order.createdAt).toLocaleString("fa-IR")}</p>
                </div>
              ))}
            </div>
          </Col>

          <Col>
            <div className="col-info">
              <p>مجموع قیمت</p>
              {orders.map((order) => (
                <div key={order._id} className="user-div">
                  <p className="p-margin">
                    {order.totalPrice.toLocaleString()} تومان
                  </p>
                </div>
              ))}
            </div>
          </Col>

          <Col>
            <div className="col-info">
              <p>کالا</p>
              {orders.map((order) => (
                <div key={order._id} className="user-div">
                  <Dropdown>
                    <Dropdown.Toggle variant="info" className="text-light">
                      مشاهده کالاها ({order.items.length})
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ minWidth: "250px" }}>
                      {order.items.map((item) => (
                        <Dropdown.Item key={item._id} className="py-2">
                          <div style={{ fontWeight: "bold" }}>{item.name}</div>
                          <div style={{ fontSize: "0.85rem", color: "#555" }}>
                            قیمت: {item.price.toLocaleString()} تومان
                          </div>
                          <div style={{ fontSize: "0.85rem", color: "#555" }}>
                            تعداد: {item.quantity}
                          </div>
                          <div style={{ fontSize: "0.85rem", color: "#555" }}>
                            کد محصول: {item.productId}
                          </div>
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              ))}
            </div>
          </Col>

          <Col>
            <div className="col-info">
              <p>اطلاعات مشتری</p>
              {orders.map((order) => (
                <div key={order._id} className="user-div">
                  <Dropdown>
                    <Dropdown.Toggle variant="info" className="text-light">
                      {order.user.email}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>{order.user.firstName}</Dropdown.Item>
                      <Dropdown.Item>{order.user.lastName}</Dropdown.Item>
                      <Dropdown.Item>{order.user.phoneNumber}</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              ))}
            </div>
          </Col>

          <Col>
            <div className="col-info">
              <p>شماره سفارش</p>
              {orders.map((order) => (
                <div key={order._id} className="user-div">
                  <p className="p-margin">{order._id}</p>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default OrderList;
