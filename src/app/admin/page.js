"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Para navegación
import { GET_USERS } from "../api/admin/route";

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

  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <div>
      <h1>Usuarios Registrados</h1>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Correo</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.correo}</td>
              <td>
                <button onClick={() => router.push(`/admin/dieta/${user.id}`)}>
                  Asignar Dieta
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
