import React from "react";

export default function QuienSoy() {
  return (
    <div style={{ backgroundColor: "#1f2431", minHeight: "100vh" }}>
      <section
        id="quien-soy"
        className="container py-5 px-4 d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="row align-items-center shadow-lg rounded-4 overflow-hidden "
          style={{
            backgroundColor: "#585953",
          }}
        >
          <div className="col-md-6 p-0">
            <img
              src="/images/quiensoy2.jpg"
              alt="Marialu en el gimnasio"
              className="img-fluid h-100 w-100"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div
            className="col-md-6 p-5"
            style={{
              backgroundColor: "#585953",
            }}
          >
            <span className="badge bg-warning text-dark mb-3 px-3 py-2">
              Sobre mí
            </span>
            <h2 className="display-5 fw-bold text-dark mb-4 text-white">
              Mi misión es ayudarte a alcanzar tu mejor versión
            </h2>
            <p className="p-4 rounded-lg text-white">
              Soy Marialu, entrenadora personal apasionada por transformar vidas
              a través de la salud y el bienestar. Mi objetivo es inspirarte y
              acompañarte en cada paso hacia una vida más activa y equilibrada.
            </p>
            <button className="btn btn-primary px-4 py-2">Conoce más</button>
          </div>
        </div>
      </section>
    </div>
  );
}
