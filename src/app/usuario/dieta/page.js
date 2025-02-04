"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Header from "../Header";
import Footer from "../Footer";
import "bootstrap/dist/css/bootstrap.min.css";

const supabaseUrl = "https://yyygruoaphtgzslboctz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5eWdydW9hcGh0Z3pzbGJvY3R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5MzIzNTksImV4cCI6MjA1MjUwODM1OX0.VhSXy_aiYI7cbX98dccssSe1EFI9dSRhFpXw1_6ngVc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function DietaPage() {
  const [dietas, setDietas] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchDietas() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login"); // Redirigir si no está logueado
        return;
      }
      const response = await fetch(`/api/usuario/dieta?user_uuid=${user.id}`);
      const data = await response.json();
      console.log("Respuesta del backend:", data);

      if (response.ok) {
        setDietas(data);
      } else {
        console.error("Error al obtener dietas:", data.error);
      }

      setLoading(false);
    }

    fetchDietas();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );

  if (dietas.length === 0)
    return <p className="text-center mt-5">No tienes dietas asignadas.</p>;

  const dietasAgrupadas = dietas.reduce((acc, dieta) => {
    if (!acc[dieta.semana]) acc[dieta.semana] = {};
    if (!acc[dieta.semana][dieta.dia]) acc[dieta.semana][dieta.dia] = [];
    acc[dieta.semana][dieta.dia].push(dieta);
    return acc;
  }, {});

  const ordenMomentos = [
    "desayuno",
    "snack",
    "almuerzo",
    "merienda",
    "cena",
    "pre entreno",
    "post entreno",
  ];
  const coloresMomentos = {
    desayuno: "table-info",
    snack: "table-light",
    almuerzo: "table-warning",
    merienda: "table-secondary",
    cena: "table-success",
    "pre entreno": "table-primary",
    "post entreno": "table-danger",
  };

  return (
    <div style={{ backgroundColor: "#585953" }}>
      <Header />
      <div className="container mt-5" style={{ backgroundColor: "#585953" }}>
        <h1 className="mb-4 text-center">Tu Dieta</h1>
        {Object.keys(dietasAgrupadas)
          .sort((a, b) => a - b)
          .map((semana) => (
            <div key={semana} className="mb-4">
              <h2 style={{ color: "#ff5d39" }}>Semana {semana}</h2>
              {Object.keys(dietasAgrupadas[semana])
                .sort((a, b) => a - b)
                .map((dia) => (
                  <div key={dia} className="ms-4 mb-3">
                    <h3 style={{ color: "#ffc107" }}>Día {dia}</h3>
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead className="table-dark">
                          <tr>
                            <th style={{ backgroundColor: "#202434" }}>
                              Momento
                            </th>
                            <th style={{ backgroundColor: "#202434" }}>
                              Comida
                            </th>
                            <th style={{ backgroundColor: "#202434" }}>
                              Ingredientes
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {dietasAgrupadas[semana][dia]
                            .sort(
                              (a, b) =>
                                ordenMomentos.indexOf(
                                  a.momento.toLowerCase().replace(/-/g, " ")
                                ) -
                                ordenMomentos.indexOf(
                                  b.momento.toLowerCase().replace(/-/g, " ")
                                )
                            )
                            .map((dieta, index) => (
                              <tr
                                key={index}
                                className={
                                  coloresMomentos[
                                    dieta.momento
                                      .toLowerCase()
                                      .replace(/-/g, " ")
                                  ] || ""
                                }
                              >
                                <td>{dieta.momento}</td>
                                <td>
                                  {dieta.comida || "Sin nombre disponible"}
                                </td>
                                <td>
                                  {dieta.ingredientes ||
                                    "No hay ingredientes disponibles"}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}
