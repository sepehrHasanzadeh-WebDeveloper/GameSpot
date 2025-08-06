import { Container } from "react-bootstrap";
import "./UserOrders.css";
import { Table, Image, Badge } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
import orderimg from "../../assets/images/OrderList.png";
function UserOrders() {
  const [getOrder, setGetOrder] = useState([]);
  useEffect(() => {
    const getUserOrders = async () => {
      const res = await axios.get("http://localhost:6500/api/order/my/order", {
        withCredentials: true,
      });
      setGetOrder(res.data);
    };
    getUserOrders();
  }, []);

  const getStatusVariant = (status) => {
    switch (status) {
      case "در حال پردازش":
        return "warning";
      case "تحویل شده":
        return "success";
      case "لغو شده":
        return "danger";
      default:
        return "secondary";
    }
  };
  return (
    <>
      {getOrder.length > 0 ? (
        <Container>
          <div className="p-3 bg-dark text-white rounded">
            <Table
              striped
              bordered
              hover
              responsive
              variant="dark"
              className="text-center align-middle"
            >
              <thead>
                <tr>
                  <th>کد سفارش</th>
                  <th>عکس محصول</th>
                  <th>نام محصول</th>
                  <th>تعداد</th>
                  <th>قیمت (تومان)</th>
                  <th>وضعیت سفارش</th>
                </tr>
              </thead>
              <tbody>
                {getOrder.map((order, index) => (
                  <tr key={index}>
                    <td>{order._id}</td>

                    {order.items.map((item, idx) => (
                      <React.Fragment key={idx}>
                        <td>
                          <Image
                            src={item.image}
                            rounded
                            width={60}
                            height={60}
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price.toLocaleString()}</td>
                      </React.Fragment>
                    ))}

                    <td>
                      <Badge bg={getStatusVariant(order.status)}>
                        {order.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Container>
      ) : (
        <div className="order-state">
          <img src={orderimg} alt="" />
          <p>سفارشی تا به حال برای شما ثبت نشده</p>
        </div>
      )}
    </>
  );
}
export default UserOrders;
