"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Header from "../Header";
import Footer from "../Footer";

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

  if (loading) return <p>Cargando dietas...</p>;

  if (dietas.length === 0) return <p>No tienes dietas asignadas.</p>;

  // Agrupar las dietas por semana y día
  const dietasAgrupadas = dietas.reduce((acc, dieta) => {
    if (!acc[dieta.semana]) acc[dieta.semana] = {};
    if (!acc[dieta.semana][dieta.dia]) acc[dieta.semana][dieta.dia] = [];
    acc[dieta.semana][dieta.dia].push(dieta);
    return acc;
  }, {});

  return (
    <div>
      <Header />
      <h1>Tu Dieta</h1>
      {Object.keys(dietasAgrupadas)
        .sort((a, b) => a - b)
        .map((semana) => (
          <div key={semana} style={{ marginBottom: "20px" }}>
            <h2>Semana {semana}</h2>
            {Object.keys(dietasAgrupadas[semana])
              .sort((a, b) => a - b)
              .map((dia) => (
                <div
                  key={dia}
                  style={{ marginLeft: "20px", marginBottom: "10px" }}
                >
                  <h3>Día {dia}</h3>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          Momento
                        </th>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          Comida
                        </th>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          Ingredientes
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dietasAgrupadas[semana][dia].map((dieta, index) => (
                        <tr key={index}>
                          <td
                            style={{ border: "1px solid #ddd", padding: "8px" }}
                          >
                            {dieta.momento}
                          </td>
                          <td
                            style={{ border: "1px solid #ddd", padding: "8px" }}
                          >
                            {dieta.comida
                              ? dieta.comida
                              : "Sin nombre disponible"}
                          </td>
                          <td
                            style={{ border: "1px solid #ddd", padding: "8px" }}
                          >
                            {dieta.ingredientes
                              ? dieta.ingredientes
                              : "No hay ingredientes disponibles"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
          </div>
        ))}
      <Footer />
    </div>
  );
}
