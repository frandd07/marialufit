"use client";
import { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yyygruoaphtgzslboctz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5eWdydW9hcGh0Z3pzbGJvY3R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5MzIzNTksImV4cCI6MjA1MjUwODM1OX0.VhSXy_aiYI7cbX98dccssSe1EFI9dSRhFpXw1_6ngVc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function EntrenoUsuarioPage() {
  const [entrenos, setEntrenos] = useState({});
  const [userId, setUserId] = useState(null);
  const [mesSeleccionado, setMesSeleccionado] = useState(
    new Date().getMonth() + 1
  );
  const [añoSeleccionado, setAñoSeleccionado] = useState(
    new Date().getFullYear()
  );

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchEntrenos();
    }
  }, [userId, mesSeleccionado, añoSeleccionado]);

  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      setUserId(user.id);
    }
  }

  async function fetchEntrenos() {
    const res = await fetch(
      `/api/usuario/entreno?id=${userId}&mes=${mesSeleccionado}&año=${añoSeleccionado}`
    );
    const { data } = await res.json();
    setEntrenos(organizeEntrenos(data));
  }

  function organizeEntrenos(data) {
    return data.reduce((acc, entreno) => {
      if (!acc[entreno.semana]) acc[entreno.semana] = {};
      if (!acc[entreno.semana][entreno.dia])
        acc[entreno.semana][entreno.dia] = [];
      acc[entreno.semana][entreno.dia].push(entreno);
      return acc;
    }, {});
  }

  return (
    <div>
      <Header />
      <h1>Tu Plan de Entreno</h1>

      <label>Seleccionar Mes:</label>
      <input
        type="number"
        min="1"
        max="12"
        value={mesSeleccionado}
        onChange={(e) => setMesSeleccionado(Number(e.target.value))}
      />

      <label>Seleccionar Año:</label>
      <input
        type="number"
        min="2020"
        value={añoSeleccionado}
        onChange={(e) => setAñoSeleccionado(Number(e.target.value))}
      />

      {Object.keys(entrenos).length === 0 ? (
        <p>No tienes entrenos asignados.</p>
      ) : (
        Object.keys(entrenos).map((semana) => (
          <div key={semana}>
            <h2>Semana {semana}</h2>
            {Object.keys(entrenos[semana]).map((dia) => (
              <div key={dia}>
                <h3>Día {dia}</h3>
                <table
                  border="1"
                  style={{ width: "100%", borderCollapse: "collapse" }}
                >
                  <thead>
                    <tr>
                      <th>Ejercicio</th>
                      <th>Grupo Muscular</th>
                      <th>Series</th>
                      <th>Repeticiones Asignadas</th>
                      <th>Pesos (kg)</th>
                      <th>Repeticiones Realizadas</th>
                      <th>Observaciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entrenos[semana][dia].map((entreno) => (
                      <tr key={entreno.id}>
                        <td>{entreno.nombre}</td>
                        <td>{entreno.grupo_muscular}</td>
                        <td>{entreno.series}</td>
                        <td>{entreno.repes}</td>
                        <td>{entreno.pesos || "-"}</td>
                        <td>{entreno.repeticiones_usuario || "-"}</td>
                        <td>{entreno.observaciones || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        ))
      )}
      <Footer />
    </div>
  );
}
