import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import axios from "axios";
import "./AdminPanel.css";
import { FiEdit3 } from "react-icons/fi";
import { TiUserDelete } from "react-icons/ti";
import Swal from "sweetalert2";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
const UserTable = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:6500/userInfo/userListShow", {
        withCredentials: true,
      })
      .then((res) => setUsers(res.data))
      .catch((err) => window.alert(err));
  }, []);
  const deleteUserHandler = async (id) => {
    const confirmResult = await Swal.fire({
      title: "آیا مطمئنی؟",
      text: "این عملیات غیرقابل بازگشت است!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله، حذف کن",
      cancelButtonText: "نه",
    });
    if (confirmResult.isConfirmed) {
      try {
        await axios.delete(`http://localhost:6500/userInfo/deleteUser/${id}`, {
          withCredentials: true,
        });
        setUsers(users.filter((user) => user._id !== id));
        Swal.fire({
          title: "حذف شد!",
          text: "کاربر با موفقیت حذف شد.",
          icon: "success",
        });
      } catch (err) {
        Swal.fire({
          title: "خطایی رخ داد",
          text: "لطفا دوباره تلاش کنید",
          icon: "error",
        });
      }
    }
  };
  const exportToExcel = () => {
    const data = users.map(
      ({ firstName, lastName, email, phoneNumber, role, _id }) => ({
        نام: firstName,
        "نام خانوادگی": lastName,
        ایمیل: email,
        "تلفن همراه": phoneNumber,
        "نقش کاربر": role,
        "ایدی کاربر": _id,
      })
    );

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    const excelBuffer = XLSX.write(workbook, {
      type: "array",
      bookType: "xlsx",
    });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "users.xlsx");
  };

  return (
    <Container className="mt-5">
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h3>لیست کاربران </h3>
      </div>
      <div className="custom-table-wrapper">
        <Table striped bordered hover variant="dark" className="rounded-table">
          <thead>
            <tr>
              <th>نام</th>
              <th>نام خانوادگی</th>
              <th>ایمیل</th>
              <th>شماره تماس</th>
              <th>نقش</th>
              <th>ایدی کاربر</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.role}</td>
                <td>{user._id}</td>
                <td>
                  <FiEdit3
                    size={30}
                    color="red"
                    style={{ cursor: "pointer" }}
                  />
                  <TiUserDelete
                    size={30}
                    color="var(--accent)"
                    style={{ cursor: "pointer", marginRight: "10px" }}
                    onClick={() => deleteUserHandler(user._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <button onClick={exportToExcel} className="export-btn">
        خروجی گرفتن در اکسل
      </button>
    </Container>
  );
};

export default UserTable;
