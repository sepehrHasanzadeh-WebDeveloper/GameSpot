import { Col, Container, Row } from "react-bootstrap";
import "./NewItem.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useRef, useState } from "react";
import NewCard from "./NewCard";
import Productcard from "./Product-card";
import { fetchProduct1, fetchProduct2 } from "../../../Api/fetchFirstProduct";
function NewItem() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [latestProducts, setLatestProducts] = useState([]);
  const [remainingProducts, setRemainingProducts] = useState([]);

  useEffect(() => {
    const ReplaceData = async () => {
      const latest = await fetchProduct1();
      const rest = await fetchProduct2();
      setLatestProducts(latest);
      setRemainingProducts(rest);
    };

    ReplaceData();
  }, []);

  return (
    <>
      <Container style={{ marginBottom: "150px " }}>
        <h3>
          محصولات جدید گیم اسپات{" "}
          <span style={{ fontSize: "11px" }}>(مشاهده همه )</span>{" "}
        </h3>
        <Row className="gy-5 row-cols-1 row-cols-lg-2">
          <Col>
            <div className="banner-wrapper-newitem">
              <Container className="p-0">
                <div
                  className="banner-slider-container"
                  style={{ position: "relative" }}
                >
                
                  <button ref={prevRef} className="custom-swiper-button-prev">
                    &#10095;
                  </button>
                  <button ref={nextRef} className="custom-swiper-button-next">
                    &#10094;
                  </button>

                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation={{
                      prevEl: prevRef.current,
                      nextEl: nextRef.current,
                    }}
                    pagination={{
                      clickable: true,
                      bulletClass: "my-bullet",
                      bulletActiveClass: "my-bullet-active",
                    }}
                    autoplay={{ delay: 4000 }}
                    className="banner-swiper"
                    onBeforeInit={(swiper) => {
                     
                      swiper.params.navigation.prevEl = prevRef.current;
                      swiper.params.navigation.nextEl = nextRef.current;
                    }}
                    breakpoints={{
                      320: {
                        slidesPerView: 1,
                      },
                      576: {
                        slidesPerView: 2,
                      },
                      768: {
                        slidesPerView: 2,
                      },
                      992: {
                        slidesPerView: 2,
                      },
                      1200: {
                        slidesPerView: 3,
                      },
                    }}
                  >
                    {remainingProducts.length > 0 ? (
                      remainingProducts.map((item) => (
                        <SwiperSlide key={item._id}>
                          <Productcard {...item} />
                        </SwiperSlide>
                      ))
                    ) : (
                      <p>Error</p>
                    )}
                  </Swiper>
                </div>
              </Container>
            </div>
          </Col>

          <Col>
            <div className="banner-wrapper-newitem">
              <Container className="p-0">
                <div
                  className="banner-slider-container"
                  style={{ position: "relative" }}
                >
                 
                  <button ref={prevRef} className="custom-swiper-button-prev">
                    &#10095;
                  </button>
                  <button ref={nextRef} className="custom-swiper-button-next">
                    &#10094;
                  </button>

                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation={{
                      prevEl: prevRef.current,
                      nextEl: nextRef.current,
                    }}
                    pagination={{
                      clickable: true,
                      bulletClass: "my-bullet",
                      bulletActiveClass: "my-bullet-active",
                    }}
                    autoplay={{ delay: 4000 }}
                    className="banner-swiper"
                    onBeforeInit={(swiper) => {
                   
                      swiper.params.navigation.prevEl = prevRef.current;
                      swiper.params.navigation.nextEl = nextRef.current;
                    }}
                  >
                    {latestProducts.length > 0 ? (
                      latestProducts.map((item) => (
                        <SwiperSlide key={item._id}>
                          <NewCard {...item} />
                        </SwiperSlide>
                      ))
                    ) : (
                      <p>مشکلی در گرفتن اطلاعات به وجود امده</p>
                    )}
                  </Swiper>
                </div>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default NewItem;
