"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  GET_USERS,
  TOGGLE_USER_ACTIVE,
  CREATE_KEY,
  GET_KEYS,
  DELETE_KEY,
} from "../api/admin/route";
import "bootstrap/dist/css/bootstrap.min.css";
import "../adminstyle.css";

export default function Page() {
  const [users, setUsers] = useState([]);
  const [keys, setKeys] = useState([]); // Estado para las claves
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const { data: usersData, error: usersError } = await GET_USERS();
      const { data: keysData, error: keysError } = await GET_KEYS();

      if (usersError) alert("Error al obtener usuarios: " + usersError.message);
      else setUsers(usersData);

      if (keysError) alert("Error al obtener claves: " + keysError.message);
      else setKeys(keysData);

      setLoading(false);
    }
    fetchData();
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

  const handleCreateKey = async () => {
    const { data, error } = await CREATE_KEY();
    if (error) {
      alert("Error al generar clave: " + error.message);
    } else {
      setKeys((prevKeys) => [...prevKeys, { id: data }]);
    }
  };

  const handleDeleteKey = async (keyId) => {
    const { error } = await DELETE_KEY(keyId);
    if (error) {
      alert("Error al eliminar clave: " + error.message);
    } else {
      setKeys((prevKeys) => prevKeys.filter((key) => key.id !== keyId));
    }
  };

  if (loading) return <p className="text-center">Cargando datos...</p>;

  return (
    <body className="body">
      <div className="container py-5 d-flex justify-content-center bg-image">
        <div
          className="card shadow-lg"
          style={{ width: "80%", maxWidth: "900px" }}
        >
          <div className="card-header bg-color text-white text-center p-3">
            <h2>Gestión de Claves</h2>
          </div>
          <div className="card-body bg-light">
            {/* Sección de gestión de claves */}
            <div className="mb-5">
              <button
                className="btn btn-success mb-3"
                onClick={handleCreateKey}
              >
                Generar Nueva Clave
              </button>
              <ul className="list-group">
                {keys.map((key) => (
                  <li
                    key={key.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {key.id}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteKey(key.id)}
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-header bg-color text-white text-center p-3">
              <h2>Usuarios Registrados</h2>
            </div>
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
