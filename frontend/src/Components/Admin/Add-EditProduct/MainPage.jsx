import { Col, Container, Row } from "react-bootstrap";
import "./FormStyle.css";
import { useNavigate } from "react-router-dom";
import GiftCardimg from "../../../assets/images/GiftCard-img.PNG";
import Consoleimg from "../../../assets/images/Consoles-img.PNG";
import Disksimg from "../../../assets/images/disk img.PNG";
function MainPage() {
  const navigate = useNavigate();
  const addgifyCardsHandler = () => {
    navigate("/admin-panel/add/giftcard");
  };
  const addConsoleHandler = () => {
    navigate("/admin-panel/add/console");
  };
  const addDiskHandler = () => {
    navigate("/admin-panel/add/disk");
  };
  return (
    <>
      <Container className="mt-5">
        <Row className="gy-5 row-cols-1 row-cols-md-2 row-cols-lg-3">
          <Col>
            <div className="img-style-category" onClick={addgifyCardsHandler}>
              <img className="img-fluid" src={GiftCardimg} alt="*" />
            </div>
          </Col>

          <Col>
            <div className="img-style-category" onClick={addConsoleHandler}>
              <img className="img-fluid" src={Consoleimg} alt="*" />
            </div>
          </Col>
          <Col>
            <div className="img-style-category" onClick={addDiskHandler}>
              <img className="img-fluid" src={Disksimg} alt="*" />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default MainPage;
