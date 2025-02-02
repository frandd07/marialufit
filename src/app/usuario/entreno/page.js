"use client";
import { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yyygruoaphtgzslboctz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5eWdydW9hcGh0Z3pzbGJvY3R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5MzIzNTksImV4cCI6MjA1MjUwODM1OX0.VhSXy_aiYI7cbX98dccssSe1EFI9dSRhFpXw1_6ngVc";
const supabase = createClient(supabaseUrl, supabaseKey);
export default function EntrenoUsuarioPage() {
  const [entrenos, setEntrenos] = useState({});
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchEntrenos();
    }
  }, [userId]);

  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      console.log("Usuario autenticado con ID:", user.id);
      setUserId(user.id);
    } else {
      console.error("No se encontró un usuario autenticado.");
    }
  }

  async function fetchEntrenos() {
    const res = await fetch(`/api/usuario/entreno?id=${userId}`);
    if (!res.ok) {
      console.error("Error al obtener entrenos:", res.statusText);
      return;
    }

    const { data } = await res.json();
    if (!data) {
      console.error("Datos recibidos del backend son undefined");
      return;
    }

    const organizedData = organizeEntrenos(data);
    setEntrenos(organizedData);
  }

  function organizeEntrenos(data) {
    if (!Array.isArray(data)) {
      console.error("Error: los datos no son un array:", data);
      return {};
    }

    return data.reduce((acc, entreno) => {
      if (!acc[entreno.semana]) acc[entreno.semana] = {};
      if (!acc[entreno.semana][entreno.dia])
        acc[entreno.semana][entreno.dia] = [];
      acc[entreno.semana][entreno.dia].push(entreno);
      return acc;
    }, {});
  }

  const handleInputChange = (semana, dia, index, field, value) => {
    const newEntrenos = { ...entrenos };
    newEntrenos[semana][dia][index][field] = value;
    setEntrenos(newEntrenos);
  };

  const handleSave = async (entreno) => {
    const res = await fetch("/api/usuario/entreno", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: entreno.id,
        pesos: entreno.pesos,
        repeticiones_usuario: entreno.repeticiones_usuario,
        observaciones: entreno.observaciones,
      }),
    });

    if (res.ok) {
      alert("Progreso guardado correctamente.");
    } else {
      alert("Error al guardar el progreso.");
    }
  };

  return (
    <div>
      <Header />
      <h1>Tu Plan de Entreno</h1>
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
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entrenos[semana][dia].map((entreno, index) => (
                      <tr key={entreno.id}>
                        <td>{entreno.nombre}</td>
                        <td>{entreno.grupo_muscular}</td>
                        <td>{entreno.series}</td>
                        <td>{entreno.repes}</td>
                        <td>
                          <input
                            type="text"
                            value={entreno.pesos || ""}
                            onChange={(e) =>
                              handleInputChange(
                                semana,
                                dia,
                                index,
                                "pesos",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={entreno.repeticiones_usuario || ""}
                            onChange={(e) =>
                              handleInputChange(
                                semana,
                                dia,
                                index,
                                "repeticiones_usuario",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={entreno.observaciones || ""}
                            onChange={(e) =>
                              handleInputChange(
                                semana,
                                dia,
                                index,
                                "observaciones",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td>
                          <button onClick={() => handleSave(entreno)}>
                            Guardar
                          </button>
                        </td>
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
