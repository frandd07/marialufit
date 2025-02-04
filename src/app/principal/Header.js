import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Header() {
  return (
    <header>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container d-flex justify-content-between">
          <div className="d-flex">
            <ul className="navbar-nav me-3">
              <li className="nav-item">
                <a className="nav-link" href="#quiensoybueno">
                  Quién soy
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#objetivos">
                  Objetivos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#nutricion">
                  Nutrición
                </a>
              </li>
            </ul>
          </div>

          <a className="navbar-brand mx-auto" href="#">
            <img
              src="/images/logo.png"
              alt="MarialuFit Logo"
              style={{ height: "80px" }}
            />
          </a>

          <div className="d-flex">
            <ul className="navbar-nav ms-3">
              <li className="nav-item">
                <a className="nav-link" href="#entrenamientos">
                  Entrenamientos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#plataforma">
                  Plataforma
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="../login">
                  <i className="bi bi-person"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Imagen de fondo con Título y Subtítulo centrados */}
      <div
        className="hero d-flex flex-column justify-content-center align-items-center text-center"
        style={{
          backgroundImage: "url('/images/img_principal.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "120vh",
          color: "white",
        }}
      >
        <h1
          style={{
            fontSize: "5rem",
            fontWeight: "bold",
            fontFamily: "serif",
            letterSpacing: "0.3rem",
          }}
        >
          MarialuFit
        </h1>
        <p
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            letterSpacing: "0.2rem",
          }}
        >
          TRUST THE PROCESS
        </p>
        <button
          className="btn mt-3"
          style={{
            background: "linear-gradient(135deg, #FF6347, #FF4500)",
            color: "#fff",
            border: "none",
            borderRadius: "30px",
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <i className="bi bi-arrow-right-circle"></i> Ver más
        </button>
      </div>
    </header>
  );
}
