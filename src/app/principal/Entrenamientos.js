"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Entrenamientos() {
  return (
    <section id="entrenamientos" className="container my-5">
      <div className="row justify-content-center">
        {/* Card Entrenamiento Presencial */}
        <div className="col-md-5 mx-2 mb-4">
          <div
            className="card text-white shadow-lg border-0"
            style={{ backgroundColor: "#2e3c59", borderRadius: "15px" }}
          >
            <img
              src="https://via.placeholder.com/500x300"
              alt="Entrenamiento Presencial"
              className="card-img-top rounded-top"
            />
            <div className="card-body text-center">
              <h2 className="card-title">Entrenamiento Presencial</h2>
              <p className="card-text">
                Disfruta de un entrenamiento guiado en persona, con supervisión
                y corrección en tiempo real.
              </p>
              <a href="#" className="btn btn-light fw-bold">
                Más información
              </a>
            </div>
          </div>
        </div>

        {/* Card Entrenamiento Online */}
        <div className="col-md-5 mx-2 mb-4">
          <div
            className="card text-white shadow-lg border-0"
            style={{ backgroundColor: "#585953", borderRadius: "15px" }}
          >
            <img
              src="https://via.placeholder.com/500x300"
              alt="Entrenamiento Online"
              className="card-img-top rounded-top"
            />
            <div className="card-body text-center">
              <h2 className="card-title">Entrenamiento Online</h2>
              <p className="card-text">
                Accede a entrenamientos personalizados desde cualquier lugar con
                soporte virtual.
              </p>
              <a href="#" className="btn btn-light fw-bold">
                Más información
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
