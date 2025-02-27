"use client";
import { createClient } from "@supabase/supabase-js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../Header.js";
import Footer from "../Footer.js";
import { SAVE_MEASURE, GET_MEASURES } from "../../api/usuario/medidas/route.js"; // Ajuste la ruta
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Componentes Chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const supabaseUrl = "https://yyygruoaphtgzslboctz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5eWdydW9hcGh0Z3pzbGJvY3R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5MzIzNTksImV4cCI6MjA1MjUwODM1OX0.VhSXy_aiYI7cbX98dccssSe1EFI9dSRhFpXw1_6ngVc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Page() {
  const [peso, setPeso] = useState("");
  const [fecha, setFecha] = useState("");
  const [measures, setMeasures] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Peso",
        data: [],
        borderColor: "#FF6347",
        backgroundColor: "rgba(255, 99, 71, 0.2)",
        fill: true,
      },
    ],
  });
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchSession() {
      const { data } = await supabase.auth.getSession();
      setSession(data?.session || null);
    }
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        if (!session) {
          router.push("/login");
        }
      }
    );

    return () => {
      if (authListener && typeof authListener.remove === "function") {
        authListener.remove();
      }
    };
  }, [router]);

  useEffect(() => {
    if (session) {
      getMeasures(session.user.id);
    }
  }, [session]);

  useEffect(() => {
    if (measures.length > 0) {
      const sortedMeasures = measures.sort(
        (a, b) => new Date(a.fecha) - new Date(b.fecha)
      ); // Ordenada por fecha
      const dates = sortedMeasures.map((measure) => measure.fecha);
      const weights = sortedMeasures.map((measure) => measure.peso);

      setChartData({
        labels: dates,
        datasets: [
          {
            label: "Peso",
            data: weights,
            borderColor: "#FF6347",
            backgroundColor: "rgba(255, 99, 71, 0.2)",
            fill: true,
          },
        ],
      });
    }
  }, [measures]);

  async function handleSaveMeasure(e) {
    e.preventDefault();
    if (session && peso && fecha) {
      const { error } = await SAVE_MEASURE(session.user.id, peso, fecha);
      if (error) {
        toast.error("Error al guardar la medida: " + error.message);
      } else {
        toast.success("Medida guardada exitosamente.");
        getMeasures(session.user.id);
      }
    } else {
      toast.warn("Por favor, completa todos los campos.");
    }
  }

  async function getMeasures(userId) {
    const { data, error } = await GET_MEASURES(userId);
    if (error) {
      toast.error("Error al obtener las medidas.");
    } else {
      setMeasures(data);
    }
  }

  if (!session) {
    return <p>Cargando sesión...</p>;
  }

  return (
    <div style={{ backgroundColor: "#202434" }}>
      <Header />

      <div className="container mt-5">
        <h1 className="mb-4 text-white">Medidas Corporales</h1>

        {/* Formulario  */}
        <div className="card p-4" style={{ backgroundColor: "#585953" }}>
          <h3 className="text-white">Registrar Medida</h3>
          <form onSubmit={handleSaveMeasure}>
            <div className="mb-3">
              <label htmlFor="peso" className="form-label text-white">
                Peso (kg)
              </label>
              <input
                type="number"
                id="peso"
                className="form-control"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="fecha" className="form-label text-white">
                Fecha
              </label>
              <input
                type="date"
                id="fecha"
                className="form-control"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
              />
            </div>

            <button
              className="btn mt-3"
              style={{
                background: "linear-gradient(135deg, #FF6347, #FF4500)",
                color: "#fff",
                border: "none",
                borderRadius: "30px",
                padding: "10px 20px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <i className="bi bi-arrow-right-circle"></i> Guardar medida
            </button>
          </form>
        </div>

        {/* Tabla de medidas */}
        <div className="card mt-4 p-4">
          <h3 className="text-white">Mis Medidas Registradas</h3>
          {measures.length > 0 ? (
            <table className="table table-striped text-white">
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
            <p className="text-white">No has registrado ninguna medida aún.</p>
          )}
        </div>

        <div className="card mt-4 p-4" style={{ backgroundColor: "#585953" }}>
          <h3 className="text-white">Gráfica de Pesos</h3>
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  labels: {
                    color: "#fff",
                  },
                },
                tooltip: {
                  bodyColor: "#fff",
                },
              },
              scales: {
                x: {
                  ticks: {
                    color: "#fff",
                  },
                  grid: {
                    color: "#fff",
                  },
                },
                y: {
                  ticks: {
                    color: "#fff",
                  },
                  grid: {
                    color: "#fff",
                  },
                },
              },
            }}
          />
        </div>
      </div>

      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
}
