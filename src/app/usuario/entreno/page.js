'use client'
import Header from "../Header";
import Footer from "../Footer";
import { useState, useEffect } from "react";

export default function Page() {
    const [workouts, setWorkouts] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchWorkouts() {
            try {
                const res = await fetch("/api/usuario"); // Cambia la URL si es necesario
                const data = await res.json();
                setWorkouts(data);
            } catch (error) {
                console.error("Error al cargar los entrenos:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchWorkouts();
    }, []);

    return (
        <div>
            <Header />
            <main>
                <h1 style={{ textAlign: 'center', fontSize: '2em', margin: '20px 0' }}>Tabla de Entreno</h1>
                {loading ? (
                    <p style={{ textAlign: 'center', color: 'gray' }}>Cargando entrenamientos...</p>
                ) : (
                    <div>
                        {Object.entries(workouts).map(([day, exercises]) => (
                            <div key={day} style={{ marginBottom: '30px' }}>
                                <h2 style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{day}</h2>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr>
                                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Nombre</th>
                                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>TUT</th>
                                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>RIR</th>
                                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Descanso</th>
                                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Series</th>
                                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Repeticiones</th>
                                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Pesos</th>
                                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Observaciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {exercises.map((exercise) => (
                                            <tr key={exercise.id}>
                                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{exercise.nombre}</td>
                                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{exercise.tut}</td>
                                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{exercise.rir}</td>
                                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{exercise.descanso}</td>
                                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{exercise.series}</td>
                                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{exercise.repes}</td>
                                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{exercise.pesos}</td>
                                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                                    {exercise.observaciones ? exercise.observaciones : 'N/A'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
