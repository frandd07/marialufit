"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const supabase = createClient("https://xxx.supabase.co", "TOKEN_AQUI");

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <header>
      <nav
        className="navbar navbar-expand-lg navbar-dark fixed-top"
        style={{ backgroundColor: "#202434" }}
      >
        <div className="container">
          <a className="navbar-brand mx-lg-auto" href="#">
            <img
              src="/images/logo.png"
              alt="MarialuFit Logo"
              style={{ height: "80px" }}
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

          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
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
              <li className="nav-item">
                <button
                  className="btn btn-danger nav-link"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
