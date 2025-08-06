import { Col, Container, Row } from "react-bootstrap";
import "./StockPage.css";
import { useSelector } from "react-redux";
import StockCard from "./StockCard";
import { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function StockPage() {
  const { DiskDataps, DiskDataxb, ConsoleDatas, Accessories } = useSelector(
    (store) => store.Disk_Product
  );
  const { GiftCardData, xboxdata } = useSelector(
    (store) => store.GiftCards_Product
  );

  const allDisks = [...DiskDataps, ...DiskDataxb];
  const allGiftCards = [...GiftCardData, ...xboxdata];

  const [itemStock, setItemStock] = useState("disks");

  const renderStock = () => {
    switch (itemStock) {
      case "disks":
        return allDisks;
      case "consoles":
        return ConsoleDatas;
      case "giftcards":
        return allGiftCards;
      case "accessories":
        return Accessories;
      default:
        return [];
    }
  };
  const exportToExcel = () => {
    const data = renderStock().map(({ title, stock }) => ({
      "نام محصول": title,
      موجودی: stock,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Stock");

    const excelBuffer = XLSX.write(workbook, {
      type: "array",
      bookType: "xlsx",
    });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "inventory.xlsx");
  };
  return (
    <Container>
      <div className="menuBarList">
        <p
          onClick={() => setItemStock("disks")}
          className={itemStock === "disks" ? "active" : ""}
        >
          عناوین بازی
        </p>
        <p
          onClick={() => setItemStock("consoles")}
          className={itemStock === "consoles" ? "active" : ""}
        >
          کنسول ها
        </p>
        <p
          onClick={() => setItemStock("giftcards")}
          className={itemStock === "giftcards" ? "active" : ""}
        >
          گیفت کارت ها
        </p>
        <p
          onClick={() => setItemStock("accessories")}
          className={itemStock === "accessories" ? "active" : ""}
        >
          لوازم جانبی
        </p>
        <p onClick={exportToExcel}>خروجی گرفتن از موجودی</p>
      </div>

      <Row
        className="gy-5 row-cols-lg-3"
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        {renderStock().map((item) => (
          <Col key={item._id}>
            <StockCard {...item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default StockPage;
