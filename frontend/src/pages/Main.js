import React from "react";
import Header from "../components/Header";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Card from "react-bootstrap/Card";
import Footer from "../components/Footer";
import data from "../images/data";
import Category from "../components/Category";

const Main = () => {
  return (
    <div className="d-flex flex-column ">
      <Header />
      <Carousel
        autoPlay
        infiniteLoop={true}
        showThumbs={false}
        className="w-75 m-auto "
        dynamicHeight={true}
        showStatus={false}
      >
        {data.products.map((x) => (
          <div key={x.id}>
            <img src={x.image} alt="#" className="carousel-image " />
          </div>
        ))}
      </Carousel>
      <Category />
      <div className="row  gap-1 justify-content-center my-3">
        <Card className="rounded bg-light col-8 col-sm-6 col-md-5 col-lg-3 ">
          <Card.Img
            className="rounded-circle p-3 cart-pic-height mx-auto"
            variant="top"
            src="https://cdn.pixabay.com/photo/2020/04/15/15/59/sewing-5047223__340.jpg"
          />
          <Card.Body className="text-center">
            <h2>Her Türlü Terzi Malzemeleri</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
              tempore!
            </p>
          </Card.Body>
        </Card>
        <Card className="rounded bg-light col-8 col-sm-6 col-md-5 col-lg-3">
          <Card.Img
            className="rounded-circle p-3 cart-pic-height mx-auto"
            variant="top"
            src="https://cdn.pixabay.com/photo/2015/10/27/12/26/scissors-1008908_960_720.jpg"
          />
          <Card.Body className="text-center">
            <h2>1950'den Günümüze</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
              tempore!
            </p>
          </Card.Body>
        </Card>
        <Card className="rounded bg-light col-8 col-sm-6 col-md-5 col-lg-3">
          <Card.Img
            className="rounded-circle p-3 cart-pic-height mx-auto"
            variant="top"
            src="https://cdn.pixabay.com/photo/2016/11/19/09/44/antique-1838324_960_720.jpg"
          />
          <Card.Body className="text-center">
            <h2>Kaliteli Hizmet</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
              tempore!
            </p>
          </Card.Body>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
