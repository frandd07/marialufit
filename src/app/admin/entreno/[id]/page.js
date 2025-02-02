"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchEntrenos();
  }, [id]);

  async function fetchEntrenos() {
    const res = await fetch(`/api/admin/entreno?id=${id}`);
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
    setEditingId(null);
  }

  return (
    <div>
      <h1>Plan de Entreno - Usuario {id}</h1>
      <form onSubmit={handleSubmit}>
        <label>Nombre del ejercicio:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label>Grupo muscular:</label>
        <input
          type="text"
          value={grupoMuscular}
          onChange={(e) => setGrupoMuscular(e.target.value)}
        />

        <label>Series:</label>
        <input
          type="number"
          value={series}
          onChange={(e) => setSeries(Number(e.target.value))}
          required
        />

        <label>Repeticiones asignadas (ej: 10-10-8-6):</label>
        <input
          type="text"
          value={repes}
          onChange={(e) => setRepes(e.target.value)}
          required
        />

        <label>Tiempo bajo tensión (TUT):</label>
        <input
          type="number"
          value={tut}
          onChange={(e) => setTut(Number(e.target.value))}
        />

        <label>Repeticiones en reserva (RIR):</label>
        <input
          type="number"
          value={rir}
          onChange={(e) => setRir(Number(e.target.value))}
        />

        <label>Descanso (segundos):</label>
        <input
          type="number"
          value={descanso}
          onChange={(e) => setDescanso(Number(e.target.value))}
        />

        <label>Semana:</label>
        <input
          type="number"
          min="1"
          max="4"
          value={semana}
          onChange={(e) => setSemana(Number(e.target.value))}
          required
        />

        <label>Día:</label>
        <input
          type="number"
          min="1"
          max="7"
          value={dia}
          onChange={(e) => setDia(Number(e.target.value))}
          required
        />

        <button type="submit">{editingId ? "Actualizar" : "Asignar"}</button>
      </form>

      <h2>Entrenos Asignados</h2>
      {Object.keys(entrenos).map((semana) => (
        <div key={semana}>
          <h3>Semana {semana}</h3>
          {Object.keys(entrenos[semana]).map((dia) => (
            <div key={dia}>
              <h4>Día {dia}</h4>
              <table
                border="1"
                style={{ width: "100%", borderCollapse: "collapse" }}
              >
                <thead>
                  <tr>
                    <th>Ejercicio</th>
                    <th>Grupo Muscular</th>
                    <th>Series</th>
                    <th>Repeticiones</th>
                    <th>TUT (seg)</th>
                    <th>RIR</th>
                    <th>Descanso (seg)</th>
                  </tr>
                </thead>
                <tbody>
                  {entrenos[semana][dia].map((entreno, index) => (
                    <tr key={index}>
                      <td>{entreno.nombre}</td>
                      <td>{entreno.grupo_muscular}</td>
                      <td>{entreno.series}</td>
                      <td>{entreno.repes}</td>
                      <td>{entreno.tut}</td>
                      <td>{entreno.rir}</td>
                      <td>{entreno.descanso}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
