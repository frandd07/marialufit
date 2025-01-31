"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function DietaPage() {
  const { id } = useParams();
  const [dietas, setDietas] = useState([]);
  const [comida, setComida] = useState("");
  const [ingredientes, setIngredientes] = useState(""); // Nuevo campo opcional
  const [momento, setMomento] = useState("desayuno");
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
    setDietas(data || []);
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
        ingredientes,
        momento,
        id: editingId,
      }),
    });

    if (res.ok) {
      alert(editingId ? "Dieta actualizada" : "Dieta asignada");
      setComida("");
      setIngredientes(""); // Limpia ingredientes después de enviar
      setMomento("desayuno");
      setEditingId(null);
      fetchDietas();
    } else {
      alert("Error al asignar/actualizar la dieta");
    }
  }

  async function handleDelete(dietaId) {
    if (!confirm("¿Seguro que quieres eliminar esta comida?")) return;

    const res = await fetch(`/api/usuario/dieta`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: dietaId }),
    });

    if (res.ok) {
      alert("Comida eliminada");
      fetchDietas();
    } else {
      alert("Error al eliminar la comida");
    }
  }

  function handleEdit(dieta) {
    setComida(dieta.comida);
    setIngredientes(dieta.ingredientes || ""); // Si es null, se pone vacío
    setMomento(dieta.momento);
    setEditingId(dieta.id);
  }

  return (
    <div>
      <h1>
        {editingId ? "Editar Dieta" : "Asignar Dieta"} - Usuario {id}
      </h1>

      <form onSubmit={handleSubmit}>
        <label>Comida:</label>
        <input
          type="text"
          value={comida}
          onChange={(e) => setComida(e.target.value)}
          required
        />

        <label>Ingredientes (Opcional):</label>
        <input
          type="text"
          value={ingredientes}
          onChange={(e) => setIngredientes(e.target.value)}
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

        <button type="submit">{editingId ? "Actualizar" : "Asignar"}</button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setComida("");
              setIngredientes("");
              setMomento("desayuno");
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <table border="1">
        <thead>
          <tr>
            <th>Comida</th>
            <th>Ingredientes</th>
            <th>Momento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {dietas.map((dieta) => (
            <tr key={dieta.id}>
              <td>{dieta.comida}</td>
              <td>{dieta.ingredientes || "—"}</td>
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
