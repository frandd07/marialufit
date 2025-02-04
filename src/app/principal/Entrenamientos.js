"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Entrenamientos() {
  return (
    <section
      id="entrenamientos"
      className="container my-5"
      style={{ background: "#1f2431" }}
    >
      <div className="row">
        <div className="col-12 mb-4">
          <div
            className="p-5 text-white rounded-3"
            style={{ backgroundColor: "#2e3c59" }}
          >
            <img
              src="https://via.placeholder.com/500x300"
              alt="Entrenamiento 1"
              className="img-fluid rounded-3 mb-3"
            />
            <h2>Presencial</h2>
            <p>And an even wittier subheading.</p>
          </div>
        </div>
        <div className="col-12 mb-4">
          <div
            className="p-5 text-dark rounded-3"
            style={{ backgroundColor: "#585953" }}
          >
            <img
              src="https://via.placeholder.com/500x300"
              alt="Entrenamiento 2"
              className="img-fluid rounded-3 mb-3"
            />
            <h2>Online</h2>
            <p className="text-white">And an even wittier subheading.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
