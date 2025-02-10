"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import "bootstrap/dist/css/bootstrap.min.css";

// Configurar Supabase
const supabase = createClient(
  "https://yyygruoaphtgzslboctz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5eWdydW9hcGh0Z3pzbGJvY3R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5MzIzNTksImV4cCI6MjA1MjUwODM1OX0.VhSXy_aiYI7cbX98dccssSe1EFI9dSRhFpXw1_6ngVc"
);

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login"); // Redirige a la página de login
  };

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
