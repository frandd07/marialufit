"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Header from "../Header";
import Footer from "../Footer";
import "bootstrap/dist/css/bootstrap.min.css";

const supabaseUrl = "https://yyygruoaphtgzslboctz.supabase.co";
const supabaseKey = "TU_SUPABASE_KEY";
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
        router.push("/login");
        return;
      }
      const response = await fetch(`/api/usuario/dieta?user_uuid=${user.id}`);
      const data = await response.json();

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

  const coloresMomentos = {
    desayuno: "text-info",
    snack: "text-muted",
    almuerzo: "text-warning",
    merienda: "text-secondary",
    cena: "text-primary",
    "pre entreno": "text-success",
    "post entreno": "text-danger",
  };

  return (
    <div style={{ backgroundColor: "#202434", minHeight: "100vh" }}>
      <Header />
      <div className="container py-5">
        <h1 className="mb-4 text-center text-white">Tu Dieta</h1>
        {Object.keys(dietasAgrupadas)
          .sort((a, b) => a - b)
          .map((semana) => (
            <div key={semana} className="mb-4">
              <h2 className="text-danger">Semana {semana}</h2>
              {Object.keys(dietasAgrupadas[semana])
                .sort((a, b) => a - b)
                .map((dia) => (
                  <div key={dia} className="ms-4 mb-3">
                    <h3 className="text-warning">Día {dia}</h3>
                    <div className="list-group">
                      {dietasAgrupadas[semana][dia].map((dieta, index) => (
                        <div
                          key={index}
                          className="list-group-item d-flex flex-column"
                        >
                          <strong
                            className={
                              coloresMomentos[
                                dieta.momento.toLowerCase().replace(/-/g, " ")
                              ] || "text-white"
                            }
                          >
                            {dieta.momento.toUpperCase()}
                          </strong>
                          <span>{dieta.comida || "Sin nombre disponible"}</span>
                          <em>
                            Ingredientes:{" "}
                            {dieta.ingredientes ||
                              "No hay ingredientes disponibles"}
                          </em>
                        </div>
                      ))}
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
