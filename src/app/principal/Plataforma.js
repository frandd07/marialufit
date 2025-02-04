import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function Plataforma() {
  return (
    <section id="plataforma" className="py-5">
      <div className="container">
        <h2 className="mb-4 text-center">Nuestra plataforma</h2>
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://via.placeholder.com/800x400?text=Imagen+1"
                className="d-block w-100"
                alt="Primera imagen"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://via.placeholder.com/800x400?text=Imagen+2"
                className="d-block w-100"
                alt="Segunda imagen"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://via.placeholder.com/800x400?text=Imagen+3"
                className="d-block w-100"
                alt="Tercera imagen"
              />
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Anterior</span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Siguiente</span>
          </button>
        </div>
      </div>
    </section>
  );
}
