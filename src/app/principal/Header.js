"use client";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Header() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
          <div className="container">
            <a className="navbar-brand d-lg-none" href="#">
              <img
                src="/images/logo.png"
                alt="MarialuFit Logo"
                style={{ height: "60px" }}
              />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <div className="d-flex w-100 justify-content-between align-items-center">
                <ul className="navbar-nav">
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
                <a className="navbar-brand d-none d-lg-block" href="#">
                  <img
                    src="/images/logo.png"
                    alt="MarialuFit Logo"
                    style={{ height: "80px" }}
                  />
                </a>
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link" href="#entrenamientos">
                      Entrenamientos
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
          </div>
        </nav>
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
            className="hero-title"
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
          <a
            href="#quiensoybueno"
            className="btn btn-lg mt-4"
            style={{
              background: "linear-gradient(to right, #d35400, #e67e22)",
              border: "none",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "50px",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Sobre mi
          </a>
        </div>
      </header>

      <style>{`
        @media (max-width: 768px) {
          .hero-title {
            font-size: 3rem !important;
          }
        }
      `}</style>
    </>
  );
}
