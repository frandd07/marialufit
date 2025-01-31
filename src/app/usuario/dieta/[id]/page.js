"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function DietaPage() {
  const { id } = useParams(); // Obtiene el ID del usuario desde la URL
  const [dietas, setDietas] = useState([]); // Lista de comidas
  const [comida, setComida] = useState(""); // Estado para el input de comida
  const [momento, setMomento] = useState(""); // Estado para el input de momento

  // Obtener la dieta del usuario desde la API
  useEffect(() => {
    async function fetchDietas() {
      const res = await fetch(`/api/usuario/dieta?id=${id}`);
      const { data } = await res.json();
      setDietas(data || []);
    }
    fetchDietas();
  }, [id]);

  // Enviar nueva comida a la API
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/usuario/dieta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario_id: id, comida, momento }),
    });

    if (res.ok) {
      alert("Dieta asignada correctamente");
      setComida("");
      setMomento("");
      // Recargar la lista de comidas después de agregar una nueva
      const updatedRes = await fetch(`/api/usuario/dieta?id=${id}`);
      const { data } = await updatedRes.json();
      setDietas(data || []);
    } else {
      alert("Error al asignar la dieta");
    }
  }

  return (
    <div>
      <h1>Asignar Dieta - Usuario {id}</h1>

      {/* Formulario para agregar comidas */}
      <form onSubmit={handleSubmit}>
        <label>Comida:</label>
        <input
          type="text"
          value={comida}
          onChange={(e) => setComida(e.target.value)}
          required
        />

        <label>Momento:</label>
        <input
          type="text"
          value={momento}
          onChange={(e) => setMomento(e.target.value)}
          required
        />

        <button type="submit">Asignar</button>
      </form>

      {/* Tabla con las comidas asignadas */}
      <table border="1">
        <thead>
          <tr>
            <th>Comida</th>
            <th>Momento</th>
          </tr>
        </thead>
        <tbody>
          {dietas.map((dieta) => (
            <tr key={dieta.id}>
              <td>{dieta.comida}</td>
              <td>{dieta.momento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
