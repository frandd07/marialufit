"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../Header";
import Footer from "@/app/usuario/Footer";

export default function EntrenoPage() {
  const { id } = useParams();
  const [entrenos, setEntrenos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [grupoMuscular, setGrupoMuscular] = useState("");
  const [series, setSeries] = useState(3);
  const [repes, setRepes] = useState("");
  const [tut, setTut] = useState(30);
  const [rir, setRir] = useState(2);
  const [descanso, setDescanso] = useState(60);
  const [semana, setSemana] = useState(1);
  const [dia, setDia] = useState(1);
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [año, setAño] = useState(new Date().getFullYear());
  const [editingId, setEditingId] = useState(null);
  const [mesSeleccionado, setMesSeleccionado] = useState(mes);
  const [añoSeleccionado, setAñoSeleccionado] = useState(año);

  useEffect(() => {
    fetchEntrenos();
  }, [id, mesSeleccionado, añoSeleccionado]);

  async function fetchEntrenos() {
    const res = await fetch(
      `/api/admin/entreno?id=${id}&mes=${mesSeleccionado}&año=${añoSeleccionado}`
    );
    const { data } = await res.json();
    const organizedData = organizeEntrenos(data);
    setEntrenos(organizedData);
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

  async function handleSubmit(e) {
    e.preventDefault();

    const requestBody = {
      usuario_id: id,
      nombre,
      grupo_muscular: grupoMuscular,
      series,
      repes,
      tut,
      rir,
      descanso,
      semana,
      dia,
      mes,
      año,
      id: editingId,
    };

    const res = await fetch("/api/admin/entreno", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (res.ok) {
      alert(editingId ? "Entreno actualizado" : "Entreno asignado");
      resetForm();
      fetchEntrenos();
    } else {
      alert("Error al asignar/actualizar el entreno");
    }
  }

  async function handleDelete(id) {
    if (confirm("\u00bfEstás seguro de que deseas eliminar este entreno?")) {
      const res = await fetch("/api/admin/entreno", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        alert("Entreno eliminado");
        fetchEntrenos();
      } else {
        alert("Error al eliminar el entreno");
      }
    }
  }

  function resetForm() {
    setNombre("");
    setGrupoMuscular("");
    setSeries(3);
    setRepes("");
    setTut(30);
    setRir(2);
    setDescanso(60);
    setSemana(1);
    setDia(1);
    setMes(new Date().getMonth() + 1);
    setAño(new Date().getFullYear());
    setEditingId(null);
  }

  return (
    <div style={{ backgroundColor: "#1e2330" }}>
      <Header />
      {/* Se agrega padding-top para que el contenido no se superponga al header fijo */}
      <div className="container" style={{ paddingTop: "80px" }}>
        <h1 className="text-center mb-4 text-white">
          Plan de Entreno - Usuario {id}
        </h1>

        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-3">
            <label className="form-label text-white">
              Nombre del ejercicio:
            </label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Grupo muscular:</label>
            <input
              type="text"
              className="form-control"
              value={grupoMuscular}
              onChange={(e) => setGrupoMuscular(e.target.value)}
            />
          </div>

          <div className="row">
            <div className="col">
              <label className="form-label text-white">Series:</label>
              <input
                type="number"
                className="form-control"
                value={series}
                onChange={(e) => setSeries(Number(e.target.value))}
                required
              />
            </div>
            <div className="col">
              <label className="form-label text-white">Repeticiones:</label>
              <input
                type="text"
                className="form-control"
                value={repes}
                onChange={(e) => setRepes(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <label className="form-label text-white">TUT (segundos):</label>
              <input
                type="number"
                className="form-control"
                value={tut}
                onChange={(e) => setTut(Number(e.target.value))}
              />
            </div>
            <div className="col">
              <label className="form-label text-white">RIR:</label>
              <input
                type="number"
                className="form-control"
                value={rir}
                onChange={(e) => setRir(Number(e.target.value))}
              />
            </div>
            <div className="col">
              <label className="form-label text-white">
                Descanso (segundos):
              </label>
              <input
                type="number"
                className="form-control"
                value={descanso}
                onChange={(e) => setDescanso(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <label className="form-label text-white">Semana:</label>
              <input
                type="number"
                className="form-control"
                min="1"
                max="4"
                value={semana}
                onChange={(e) => setSemana(Number(e.target.value))}
                required
              />
            </div>
            <div className="col">
              <label className="form-label text-white">Día:</label>
              <input
                type="number"
                className="form-control"
                min="1"
                max="7"
                value={dia}
                onChange={(e) => setDia(Number(e.target.value))}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn mt-3"
            style={{
              background: "linear-gradient(135deg, #FF6347, #FF4500)",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
            }}
          >
            {editingId ? "Actualizar" : "Asignar"}
          </button>
        </form>

        <h2 className="mb-3 text-white">Entrenos Asignados</h2>
        {Object.keys(entrenos).map((week) => (
          <div key={week} className="mb-4">
            <h3 style={{ color: "#FF4500" }}>Semana {week}</h3>
            {Object.keys(entrenos[week]).map((day) => (
              <div key={day} className="mb-3">
                <h4 style={{ color: "#ffc107" }}>Día {day}</h4>
                <table className="table table-dark table-bordered">
                  <thead>
                    <tr>
                      <th>Ejercicio</th>
                      <th>Grupo Muscular</th>
                      <th>Series</th>
                      <th>Repeticiones</th>
                      <th>TUT (seg)</th>
                      <th>RIR</th>
                      <th>Descanso (seg)</th>
                      <th>Pesos (kg)</th>
                      <th>Repeticiones Usuario</th>
                      <th>Observaciones</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entrenos[week][day].map((entreno) => (
                      <tr key={entreno.id}>
                        <td>{entreno.nombre}</td>
                        <td>{entreno.grupo_muscular}</td>
                        <td>{entreno.series}</td>
                        <td>{entreno.repes}</td>
                        <td>{entreno.tut}</td>
                        <td>{entreno.rir}</td>
                        <td>{entreno.descanso}</td>
                        <td>{entreno.pesos || "-"}</td>
                        <td>{entreno.repeticiones_usuario || "-"}</td>
                        <td>{entreno.observaciones || "-"}</td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => {
                              setEditingId(entreno.id);
                              setNombre(entreno.nombre);
                              setGrupoMuscular(entreno.grupo_muscular);
                              setSeries(entreno.series);
                              setRepes(entreno.repes);
                              setTut(entreno.tut);
                              setRir(entreno.rir);
                              setDescanso(entreno.descanso);
                              setSemana(entreno.semana);
                              setDia(entreno.dia);
                            }}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(entreno.id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
