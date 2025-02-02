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

  return (
    <div>
      <Header />
      <h1>Tu Dieta</h1>
      {dietas.map((dieta, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            margin: "10px 0",
          }}
        >
          <h2>
            Semana {dieta.semana}, Día {dieta.dia} - {dieta.momento}
          </h2>
          <p>
            <strong>Comida:</strong>{" "}
            {dieta.comida ? dieta.comida : "Sin nombre disponible"}
          </p>
          <p>
            <strong>Ingredientes:</strong>{" "}
            {dieta.ingredientes
              ? dieta.ingredientes
              : "No hay ingredientes disponibles"}
          </p>
        </div>
      ))}

      <Footer />
    </div>
  );
}
