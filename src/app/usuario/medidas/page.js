'use client'

import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../Header';
import Footer from '../Footer';
import { SAVE_MEASURE, GET_MEASURES } from '../../api/usuario/medidas/route.js'; // Ajuste la ruta

const supabaseUrl = 'https://yyygruoaphtgzslboctz.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5eWdydW9hcGh0Z3pzbGJvY3R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5MzIzNTksImV4cCI6MjA1MjUwODM1OX0.VhSXy_aiYI7cbX98dccssSe1EFI9dSRhFpXw1_6ngVc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Page() {
  const [peso, setPeso] = useState('');
  const [fecha, setFecha] = useState('');
  const [measures, setMeasures] = useState([]);
  const [session, setSession] = useState(null); // Guardar la sesión aquí
  const router = useRouter();

  useEffect(() => {
    // Recuperar la sesión al cargar el componente
    async function fetchSession() {
      const { data } = await supabase.auth.getSession();
      setSession(data?.session || null); // Asegurarse de que data y session no sean undefined
    }

    fetchSession(); // Llamamos a la función para obtener la sesión

    // Escuchar los cambios en la sesión
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (!session) {
        router.push('/login'); // Redirigir al login si no hay sesión
      }
    });

    // Limpiar el listener al desmontar el componente
    return () => {
        if (authListener && typeof authListener.remove === 'function') {
          authListener.remove(); // Eliminar el listener si es una función válida
        }
      };
    }, [router]);

  useEffect(() => {
    if (session) {
      // Cuando el usuario esté logueado, obtenemos sus medidas
      getMeasures(session.user.id);
    }
  }, [session]);

  async function handleSaveMeasure(e) {
    e.preventDefault();
    if (session && peso && fecha) {
      const { error } = await SAVE_MEASURE(session.user.id, peso, fecha);
      if (error) {
        alert('Error al guardar la medida: ' + error.message);
      } else {
        alert('Medida guardada exitosamente.');
        getMeasures(session.user.id); // Actualiza las medidas visibles
      }
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  async function getMeasures(userId) {
    const { data, error } = await GET_MEASURES(userId);
    if (error) {
      alert('Error al obtener las medidas.');
    } else {
      setMeasures(data); // Muestra las medidas del usuario
    }
  }

  if (!session) {
    return <p>Cargando sesión...</p>;
  }

  return (
    <div>
      <Header />
      <h1>Medidas Corporales</h1>
      <form onSubmit={handleSaveMeasure}>
        <label>
          Peso:
          <input
            type="number"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Fecha:
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </label>
        <br />
        <input type="submit" value="Guardar Medida" />
      </form>

      <h2>Mis Medidas Registradas</h2>
      {measures.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Peso</th>
            </tr>
          </thead>
          <tbody>
            {measures.map((measure, index) => (
              <tr key={index}>
                <td>{measure.fecha}</td>
                <td>{measure.peso} kg</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No has registrado ninguna medida aún.</p>
      )}
      <Footer />
    </div>
  );
}
