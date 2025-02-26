"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Entrenamientos() {
  return (
    <section id="entrenamientos" className="container my-5">
      <div className="row justify-content-center">
        <h2 className="text-center text-white py-5"></h2>
        {/* Card Entrenamiento Presencial */}
        <div className="col-md-5 mx-2 mb-4">
          <div
            className="card text-white shadow-lg border-0"
            style={{ backgroundColor: "#2e3c59", borderRadius: "15px" }}
          >
            <img
              src="/images/presencial.jpg"
              alt="Entrenamiento Presencial"
              className="card-img-top rounded-top"
            />
            <div className="card-body text-center">
              <h2 className="card-title">Entrenamiento Presencial</h2>
              <p className="card-text">
                Entrena con Marialu, corrige tu técnica al instante y sigue un
                plan hecho para ti.
              </p>
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
              src="/images/online.png"
              alt="Entrenamiento Online"
              className="card-img-top rounded-top"
            />
            <div className="card-body text-center">
              <h2 className="card-title">Entrenamiento Online</h2>
              <p className="card-text">
                Entrena donde quieras con rutinas personalizadas y seguimiento
                profesional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
