"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LOGIN, REGISTER } from "../api/login/route";

export default function AuthPage() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter(); // Hook para redirección

    async function handleAuth(e) {
        e.preventDefault();

        if (email && password) {
            if (isRegistering) {
                const { error } = await REGISTER({ email, password });
                if (error) {
                    alert("Error al registrarse: " + error.message);
                } else {
                    alert("Registro exitoso. Ahora puedes iniciar sesión.");
                    setIsRegistering(false);
                }
            } else {
                const { error } = await LOGIN({ email, password });
                if (error) {
                    alert("Error al iniciar sesión: " + error.message);
                } else {
                    alert("Sesión iniciada con éxito.");
                    router.push("/usuario/medidas"); // Redirige al usuario a /dashboard
                }
            }
        } else {
            alert("Por favor, completa todos los campos.");
        }
    }

    return (
        <div>
            <h1>{isRegistering ? "Registrarse" : "Iniciar Sesión"}</h1>
            <form onSubmit={handleAuth}>
                <label>
                    Correo:
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Contraseña:
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <br />
                <input type="submit" value={isRegistering ? "Registrar" : "Iniciar Sesión"} />
            </form>
            <p>
                {isRegistering ? (
                    <>
                        ¿Ya tienes cuenta?{" "}
                        <button onClick={() => setIsRegistering(false)}>
                            Inicia sesión
                        </button>
                    </>
                ) : (
                    <>
                        ¿No estás registrado?{" "}
                        <button onClick={() => setIsRegistering(true)}>
                            Regístrate
                        </button>
                    </>
                )}
            </p>
        </div>
    );
}
