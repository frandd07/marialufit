"use client";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Header() {
  return (
    <header>
      <nav
        className="navbar navbar-expand-lg navbar-dark fixed-top"
        style={{ backgroundColor: "#202434" }}
      >
        <div className="container">
          {/* Logo en el centro */}
          <a className="navbar-brand mx-auto" href="#">
            <img
              src="/images/logo.png"
              alt="MarialuFit Logo"
              style={{ height: "80px" }}
            />
          </a>

          {/* Menú de navegación */}
          <div className="collapse navbar-collapse justify-content-center">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" href="/usuario/entreno">
                  Tabla de Entreno
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/usuario/dieta">
                  Dieta
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/usuario/medidas">
                  Medidas Corporales
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
