import { useEffect, useState } from "react";
import "./Chart.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
function Chart() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:6500/visit/daily")
      .then((res) => setData(res.data))
      .catch((err) => window.alert(err));
  }, []);
  const UsersState = [
    { date: "01 تیر", views: 3 },
    { date: "02 تیر", views: 8 },
    { date: "03 تیر", views: 1 },
    { date: "04 تیر", views: 2 },
    { date: "05 تیر", views: 15 },
    { date: "06 تیر", views: 5 },
    { date: "07 تیر", views: 10 },
  ];
  const catecoryData = [
    { name: "کنسول بازی", value: 400 },
    { name: "گیفت کارت", value: 300 },
    { name: "دیسک بازی", value: 500 },
  ];
  const COLORS = ["#8884d8", "#82ca9d", "#3b82f6"];
  return (
    <>
      <p>بازدید های سایت در تاریخ های گذشته </p>
      <Container>
        <Row
          className="gy-5"
          style={{
            justifyContent: "center",
            alignItems: "center",
            margin: "20px 0",
          }}
        >
          <Col className="col-lg-9">
            <div style={{ width: "80%", height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="#3b82f6"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Col>
          <Col className="col-lg-3">
            <div
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <h4>بیشترین بازدید محصولات</h4>

              <PieChart width={400} height={300}>
                <Pie
                  data={catecoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {catecoryData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </Col>
        </Row>
      </Container>
      <hr />
      <p>تعداد نفراتی که ثبت نام کرده اند در روز های گذشته </p>
      <div style={{ width: "80%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={UsersState}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="views"
              stroke="#3b82f6"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
export default Chart;
