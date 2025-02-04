"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

export default function DietaPage() {
  const { id } = useParams();
  const [dietas, setDietas] = useState([]);
  const [comida, setComida] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [momento, setMomento] = useState("desayuno");
  const [semana, setSemana] = useState(1);
  const [dia, setDia] = useState(1);
  const [editingId, setEditingId] = useState(null);

  // Definimos el orden deseado para los momentos
  const momentosOrden = [
    "desayuno",
    "snack",
    "almuerzo",
    "merienda",
    "cena",
    "pre-entreno",
    "post-entreno",
  ];

  useEffect(() => {
    fetchDietas();
  }, [id]);

  async function fetchDietas() {
    const res = await fetch(`/api/admin/dieta?id=${id}`);
    const { data } = await res.json();

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

    const requestBody = {
      usuario_id: id,
      comida,
      ingredientes,
      momento,
      semana,
      dia,
      id: editingId,
    };

    const res = await fetch("/api/admin/dieta", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (res.ok) {
      alert(editingId ? "Dieta actualizada" : "Dieta asignada");
      resetForm();
      fetchDietas();
    } else {
      alert("Error al asignar/actualizar la dieta");
    }
  }

  async function handleDelete(id) {
    if (confirm("¿Estás seguro de que deseas eliminar esta dieta?")) {
      const res = await fetch("/api/admin/dieta", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        alert("Dieta eliminada");
        fetchDietas();
      } else {
        alert("Error al eliminar la dieta");
      }
    }
  }

  function resetForm() {
    setComida("");
    setIngredientes("");
    setMomento("desayuno");
    setSemana(1);
    setDia(1);
    setEditingId(null);
  }

  return (
    <body style={{ backgroundColor: "#1e2330" }}>
      <div className="container mt-5">
        <h1 className="text-center mb-4 text-white">
          Plan de Dieta - Usuario {id}
        </h1>

        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-3">
            <label className="form-label text-white">Comida:</label>
            <input
              type="text"
              className="form-control"
              value={comida}
              onChange={(e) => setComida(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Ingredientes:</label>
            <input
              type="text"
              className="form-control"
              value={ingredientes}
              onChange={(e) => setIngredientes(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Momento:</label>
            <select
              className="form-select"
              value={momento}
              onChange={(e) => setMomento(e.target.value)}
              required
            >
              {momentosOrden.map((opcion) => (
                <option key={opcion} value={opcion}>
                  {opcion.charAt(0).toUpperCase() + opcion.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="row">
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

        <h2 className="mb-3 text-white">Dietas Asignadas</h2>
        {Object.keys(dietas).map((week) => (
          <div key={week} className="mb-4">
            <h3 style={{ color: "#FF4500" }}>Semana {week}</h3>
            {Object.keys(dietas[week]).map((day) => {
              // Ordenamos las dietas del día según el orden definido
              const sortedDietas = [...dietas[week][day]].sort(
                (a, b) =>
                  momentosOrden.indexOf(a.momento) -
                  momentosOrden.indexOf(b.momento)
              );
              return (
                <div key={day} className="mb-3">
                  <h4 style={{ color: "#ffc107" }}>Día {day}</h4>
                  <ul className="list-group">
                    {sortedDietas.map((dieta) => (
                      <li
                        key={dieta.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <strong>{dieta.momento.toUpperCase()}:</strong>{" "}
                          {dieta.comida} <br />
                          <small>
                            <em>
                              Ingredientes:{" "}
                              {dieta.ingredientes || "No especificado"}
                            </em>
                          </small>
                        </div>
                        <div>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => {
                              setEditingId(dieta.id);
                              setComida(dieta.comida);
                              setIngredientes(dieta.ingredientes);
                              setMomento(dieta.momento);
                              setSemana(dieta.semana);
                              setDia(dieta.dia);
                            }}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(dieta.id)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </body>
  );
}
