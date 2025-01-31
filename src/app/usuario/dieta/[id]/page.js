"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function DietaPage() {
  const { id } = useParams(); // Obtiene el ID del usuario desde la URL
  const [dietas, setDietas] = useState([]); // Lista de comidas
  const [comida, setComida] = useState(""); // Estado para el input de comida
  const [momento, setMomento] = useState(""); // Estado para el input de momento
  const [editingId, setEditingId] = useState(null); // ID de la comida que se está editando

  // Obtener la dieta del usuario desde la API
  useEffect(() => {
    fetchDietas();
  }, [id]);

  async function fetchDietas() {
    const res = await fetch(`/api/usuario/dieta?id=${id}`);
    const { data } = await res.json();
    setDietas(data || []);
  }

  // Enviar nueva comida o actualizar una existente
  async function handleSubmit(e) {
    e.preventDefault();
    const url = "/api/usuario/dieta";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario_id: id, comida, momento, id: editingId }),
    });

    if (res.ok) {
      alert(editingId ? "Dieta actualizada" : "Dieta asignada");
      setComida("");
      setMomento("");
      setEditingId(null); // Salir del modo edición
      fetchDietas(); // Recargar la lista de comidas
    } else {
      alert("Error al asignar/actualizar la dieta");
    }
  }

  // Función para eliminar una comida
  async function handleDelete(dietaId) {
    if (!confirm("¿Seguro que quieres eliminar esta comida?")) return;

    const res = await fetch(`/api/usuario/dieta`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: dietaId }),
    });

    if (res.ok) {
      alert("Comida eliminada");
      fetchDietas(); // Recargar la lista de comidas
    } else {
      alert("Error al eliminar la comida");
    }
  }

  // Función para editar una comida (cargar datos en el formulario)
  function handleEdit(dieta) {
    setComida(dieta.comida);
    setMomento(dieta.momento);
    setEditingId(dieta.id);
  }

  return (
    <div>
      <h1>
        {editingId ? "Editar Dieta" : "Asignar Dieta"} - Usuario {id}
      </h1>

      {/* Formulario para agregar/editar comidas */}
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

        <button type="submit">{editingId ? "Actualizar" : "Asignar"}</button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setComida("");
              setMomento("");
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      {/* Tabla con las comidas asignadas */}
      <table border="1">
        <thead>
          <tr>
            <th>Comida</th>
            <th>Momento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {dietas.map((dieta) => (
            <tr key={dieta.id}>
              <td>{dieta.comida}</td>
              <td>{dieta.momento}</td>
              <td>
                <button onClick={() => handleEdit(dieta)}>Editar</button>
                <button onClick={() => handleDelete(dieta.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
