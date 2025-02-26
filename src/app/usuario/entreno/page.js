"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Header from "../Header";
import Footer from "../Footer";
import "bootstrap/dist/css/bootstrap.min.css";

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

  async function handleInputChange(e, entrenoId, field) {
    const value = e.target.value;
    const updatedEntrenos = { ...entrenos };

    Object.keys(updatedEntrenos).forEach((semana) => {
      Object.keys(updatedEntrenos[semana]).forEach((dia) => {
        updatedEntrenos[semana][dia] = updatedEntrenos[semana][dia].map(
          (entreno) => {
            if (entreno.id === entrenoId) {
              entreno[field] = value;
              updateEntreno(entrenoId, field, value);
            }
            return entreno;
          }
        );
      });
    });

    setEntrenos(updatedEntrenos);
  }

  async function updateEntreno(entrenoId, field, value) {
    const { error } = await supabase
      .from("entreno")
      .update({ [field]: value })
      .eq("id", entrenoId);

    if (error) console.error("Error actualizando entreno:", error);
  }

  return (
    <div style={{ backgroundColor: "#202434", minHeight: "100vh" }}>
      <Header />
      <div className="container py-5">
        <h1 className="mb-4 text-center text-white">Tu Plan de Entreno</h1>

        <div className="row mb-4">
          <div className="col-md-6">
            <label className="form-label text-white">Seleccionar Mes:</label>
            <input
              type="number"
              className="form-control"
              min="1"
              max="12"
              value={mesSeleccionado}
              onChange={(e) => setMesSeleccionado(Number(e.target.value))}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label text-white">Seleccionar Año:</label>
            <input
              type="number"
              className="form-control"
              min="2020"
              value={añoSeleccionado}
              onChange={(e) => setAñoSeleccionado(Number(e.target.value))}
            />
          </div>
        </div>

        {Object.keys(entrenos).length === 0 ? (
          <p className="text-center text-white">
            No tienes entrenos asignados.
          </p>
        ) : (
          Object.keys(entrenos)
            .sort((a, b) => a - b)
            .map((semana) => (
              <div key={semana} className="mb-4">
                <h2 style={{ color: "#ff511b" }}>Semana {semana}</h2>
                {Object.keys(entrenos[semana])
                  .sort((a, b) => a - b)
                  .map((dia) => (
                    <div key={dia} className="ms-4 mb-3">
                      <h3 className="text-warning">Día {dia}</h3>
                      <div className="table-responsive">
                        <table className="table table-dark table-striped table-hover">
                          <thead>
                            <tr>
                              <th>Ejercicio</th>
                              <th>Grupo Muscular</th>
                              <th>Series</th>
                              <th>Repeticiones Asignadas</th>
                              <th>Pesos (kg)</th>
                              <th>Repeticiones Realizadas</th>
                              <th>Observaciones</th>
                              <th>TUT</th>
                              <th>RIR</th>
                              <th>Descanso</th>
                            </tr>
                          </thead>
                          <tbody>
                            {entrenos[semana][dia].map((entreno) => (
                              <tr key={entreno.id}>
                                <td>{entreno.nombre}</td>
                                <td>{entreno.grupo_muscular}</td>
                                <td>{entreno.series}</td>
                                <td>{entreno.repes}</td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={entreno.pesos || ""}
                                    onChange={(e) =>
                                      handleInputChange(e, entreno.id, "pesos")
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={entreno.repeticiones_usuario || ""}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        entreno.id,
                                        "repeticiones_usuario"
                                      )
                                    }
                                  />
                                </td>

                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={entreno.observaciones || ""}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        entreno.id,
                                        "observaciones"
                                      )
                                    }
                                  />
                                </td>
                                <td>{entreno.tut || "-"}</td>
                                <td>{entreno.rir || "-"}</td>
                                <td>{entreno.descanso || "-"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
              </div>
            ))
        )}
      </div>
      <Footer />
    </div>
  );
}
