import React from "react";

export default function QuienSoy() {
  return (
    <div style={{ backgroundColor: "#1f2431", minHeight: "100vh" }}>
      <div
        id="quiensoybueno"
        className="text-center text-white mb-5"
        style={{ height: "50px", backgroundColor: "#1f2431" }}
      ></div>
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
            <p className="text-white mb-4">
              Soy Marialu, entrenadora personal apasionada por transformar vidas
              a través de la salud y el bienestar. Mi objetivo es inspirarte y
              acompañarte en cada paso hacia una vida más activa y equilibrada.
            </p>

            <button
              className="btn px-4 py-2"
              style={{
                background: "linear-gradient(135deg, #FF6347, #FF4500)",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
              }}
            >
              Conoce más
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
