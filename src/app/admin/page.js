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
import { createClient } from "@supabase/supabase-js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../adminstyle.css";
import Header from "./Header";

// Configuración de Supabase
const supabaseUrl = "https://yyygruoaphtgzslboctz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5eWdydW9hcGh0Z3pzbGJvY3R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5MzIzNTksImV4cCI6MjA1MjUwODM1OX0.VhSXy_aiYI7cbX98dccssSe1EFI9dSRhFpXw1_6ngVc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Page() {
  const [users, setUsers] = useState([]);
  const [keys, setKeys] = useState([]); // Estado para las claves
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState(""); // Estado para filtrar usuarios
  const router = useRouter();

  useEffect(() => {
    async function checkAdminAndFetchData() {
      // 1. Verificar la sesión del usuario
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Error al obtener la sesión:", sessionError);
        router.push("/login");
        return;
      }

      if (!session) {
        console.warn("No hay sesión activa");
        router.push("/login");
        return;
      }

      // 2. Verificar que el usuario sea admin consultando la tabla "admin"
      const userEmail = session.user.email;
      const { data: adminData, error: adminError } = await supabase
        .from("admin")
        .select("admin")
        .eq("email", userEmail)
        .single();

      if (adminError) {
        console.error("Error al consultar datos de admin:", adminError);
        router.push("/");
        return;
      }

      if (!adminData || !adminData.admin) {
        console.warn("El usuario no tiene privilegios de administrador");
        router.push("/");
        return;
      }

      // 3. Si pasó la verificación, obtener los datos de usuarios y claves
      const { data: usersData, error: usersError } = await GET_USERS();
      if (usersError) alert("Error al obtener usuarios: " + usersError.message);
      else setUsers(usersData);

      const { data: keysData, error: keysError } = await GET_KEYS();
      if (keysError) alert("Error al obtener claves: " + keysError.message);
      else setKeys(keysData);

      setLoading(false);
    }
    checkAdminAndFetchData();
  }, [router]);

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

  if (loading)
    return <p className="text-center text-light">Cargando datos...</p>;

  // Filtrar usuarios por nombre
  const filteredUsers = users.filter((user) =>
    user.nombre.toLowerCase().includes(filterText.toLowerCase())
  );

  // Ordenar los usuarios filtrados para que los activos aparezcan primero
  const sortedUsers = [...filteredUsers].sort((a, b) => b.activo - a.activo);

  return (
    <body className="bodyy" style={{ backgroundColor: "#1f2431" }}>
      <div
        className="container py-5 d-flex flex-column align-items-center bg-image"
        style={{ marginTop: "80px" }}
      >
        <Header />
        <div
          className="card shadow-lg"
          style={{ width: "80%", maxWidth: "900px" }}
        >
          <div
            className="card-header text-white text-center p-3"
            style={{ backgroundColor: "#585953" }}
          >
            <h2>Gestión de Claves</h2>
          </div>
          <div className="card-body" style={{ backgroundColor: "#1f2431" }}>
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
            {/* Input de búsqueda para filtrar por nombre */}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Filtrar por nombre..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
            </div>
            <div className="table-responsive">
              <table
                className="table table-hover table-bordered table-striped mb-0"
                style={{ fontSize: "0.9rem" }}
              >
                <thead className="thead-dark">
                  <tr>
                    <th>ID</th>
                    <th>Correo</th>
                    <th>Nombre</th>
                    <th>Apellido 1</th>
                    <th>Apellido 2</th>
                    <th>Activo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedUsers.map((user) => (
                    <tr
                      key={user.id}
                      className={user.activo ? "table-success" : ""}
                    >
                      <td>{user.id}</td>
                      <td>{user.correo}</td>
                      <td>{user.nombre}</td>
                      <td>{user.apellido1}</td>
                      <td>{user.apellido2}</td>
                      <td className="text-center">
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
                        <div className="btn-group btn-group-sm" role="group">
                          <button
                            onClick={() =>
                              router.push(`/admin/dieta/${user.id}`)
                            }
                            className="btn btn-gradient-primary"
                          >
                            Asignar Dieta
                          </button>
                          <button
                            onClick={() =>
                              router.push(`/admin/entreno/${user.id}`)
                            }
                            className="btn btn-gradient-secondary"
                          >
                            Asignar Entreno
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}
