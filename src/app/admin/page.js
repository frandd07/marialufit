"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../adminstyle.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Para navegación
import { GET_USERS, TOGGLE_USER_ACTIVE } from "../api/admin/route";

export default function Page() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await GET_USERS();
      if (error) {
        alert("Error al obtener usuarios: " + error.message);
      } else {
        setUsers(data);
      }
      setLoading(false);
    }
    fetchUsers();
  }, []);

  const handleToggleActive = async (userId, isActive) => {
    const { error } = await TOGGLE_USER_ACTIVE(userId, !isActive);
    if (error) {
      alert("Error al actualizar estado: " + error.message);
    } else {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, activo: !isActive } : user
        )
      );
    }
  };

  if (loading) return <p className="text-center">Cargando usuarios...</p>;

  return (
    <body className="body">
      <div className="container py-5 d-flex justify-content-center bg-image">
        <div
          className="card shadow-lg"
          style={{ width: "80%", maxWidth: "900px" }}
        >
          <div className="card-header bg-color text-white text-center p-3">
            <h2>Usuarios Registrados</h2>
          </div>
          <div className="card-body bg-light">
            <table className="table table-hover table-bordered">
              <thead className="thead-light">
                <tr>
                  <th>ID</th>
                  <th>Correo</th>
                  <th>Activo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className={user.activo ? "table-success" : ""}
                  >
                    <td>{user.id}</td>
                    <td>{user.correo}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={user.activo}
                        onChange={() =>
                          handleToggleActive(user.id, user.activo)
                        }
                        className="form-check-input"
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => router.push(`/admin/dieta/${user.id}`)}
                        className="btn btn-gradient-primary btn-lg me-3"
                      >
                        Asignar Dieta
                      </button>
                      <button
                        onClick={() => router.push(`/admin/entreno/${user.id}`)}
                        className="btn btn-gradient-secondary btn-lg"
                      >
                        Asignar Entreno
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </body>
  );
}
