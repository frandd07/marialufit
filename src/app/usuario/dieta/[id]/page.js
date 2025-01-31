"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function DietaPage() {
  const { id } = useParams();
  const [dietas, setDietas] = useState([]);
  const [comida, setComida] = useState("");
  const [momento, setMomento] = useState("desayuno");
  const [semana, setSemana] = useState(1);
  const [dia, setDia] = useState(1);
  const [editingId, setEditingId] = useState(null);

  const opcionesMomento = [
    "desayuno",
    "almuerzo",
    "merienda",
    "cena",
    "snack",
    "pre-entreno",
    "post-entreno",
  ];

  useEffect(() => {
    fetchDietas();
  }, [id]);

  async function fetchDietas() {
    const res = await fetch(`/api/usuario/dieta?id=${id}`);
    const { data } = await res.json();

    // Organizar por semana y día
    const organizedData = data.reduce((acc, item) => {
      if (!acc[item.semana]) acc[item.semana] = {};
      if (!acc[item.semana][item.dia]) acc[item.semana][item.dia] = [];

      acc[item.semana][item.dia].push(item);
      return acc;
    }, {});

    setDietas(organizedData);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const url = "/api/usuario/dieta";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usuario_id: id,
        comida,
        momento,
        semana,
        dia,
        id: editingId,
      }),
    });

    if (res.ok) {
      alert(editingId ? "Dieta actualizada" : "Dieta asignada");
      setComida("");
      setMomento("desayuno");
      setSemana(1);
      setDia(1);
      setEditingId(null);
      fetchDietas();
    } else {
      alert("Error al asignar/actualizar la dieta");
    }
  }

  return (
    <div>
      <h1>Plan de Dieta - Usuario {id}</h1>

      <form onSubmit={handleSubmit}>
        <label>Comida:</label>
        <input
          type="text"
          value={comida}
          onChange={(e) => setComida(e.target.value)}
          required
        />

        <label>Momento:</label>
        <select
          value={momento}
          onChange={(e) => setMomento(e.target.value)}
          required
        >
          {opcionesMomento.map((opcion) => (
            <option key={opcion} value={opcion}>
              {opcion.charAt(0).toUpperCase() + opcion.slice(1)}
            </option>
          ))}
        </select>

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

      <h2>Dietas Asignadas</h2>
      {Object.keys(dietas).map((week) => (
        <div key={week}>
          <h3>Semana {week}</h3>
          {Object.keys(dietas[week]).map((day) => (
            <div key={day}>
              <h4>Día {day}</h4>
              <ul>
                {dietas[week][day].map((dieta) => (
                  <li key={dieta.id}>
                    {dieta.momento.toUpperCase()}: {dieta.comida}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
