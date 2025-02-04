"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LOGIN, REGISTER } from "../api/login/route";
import "bootstrap/dist/css/bootstrap.min.css"; // Asegúrate de importar Bootstrap en tu proyecto

export default function AuthPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clave, setClave] = useState(""); // Campo para la clave
  // Estado para el mensaje de alerta: { type: "success" | "danger", message: string }
  const [alert, setAlert] = useState(null);
  const router = useRouter();

  async function handleAuth(e) {
    e.preventDefault();

    if (email && password && (!isRegistering || (isRegistering && clave))) {
      if (isRegistering) {
        const { error } = await REGISTER({ email, password, clave });
        if (error) {
          setAlert({
            type: "danger",
            message: "Error al registrarse: " + error.message,
          });
        } else {
          setAlert({
            type: "success",
            message: "Registro exitoso. Ahora puedes iniciar sesión.",
          });
          setIsRegistering(false);
        }
      } else {
        const { error, admin } = await LOGIN({ email, password });
        if (error) {
          setAlert({
            type: "danger",
            message: "Error al iniciar sesión: " + error.message,
          });
        } else {
          setAlert({
            type: "success",
            message: "Sesión iniciada con éxito.",
          });
          // Redirige según el rol
          if (admin) {
            router.push("/admin");
          } else {
            router.push("/usuario/medidas");
          }
        }
      }
    } else {
      setAlert({
        type: "danger",
        message: "Por favor, completa todos los campos.",
      });
    }
  }

  return (
    <div className="d-flex vh-100">
      <div className="col-6 d-flex justify-content-center align-items-center position-relative">
        <img
          src="/images/img_principal.jpg"
          alt="Imagen de fondo"
          className="w-100 h-100 object-cover position-absolute"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div
        className="col-6 d-flex justify-content-center align-items-center text-white"
        style={{ backgroundColor: "#28242c" }}
      >
        <div
          className="p-4 rounded shadow-lg"
          style={{
            width: "400px",
            backgroundColor: "#2c2f38", // Fondo oscuro mejorado
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)", // Sombra sutil y más grande
            borderRadius: "15px",
          }}
        >
          <h1 className="text-center mb-4 text-white font-weight-bold">
            {isRegistering ? "Registrarse" : "Iniciar Sesión"}
          </h1>

          {/* Muestra el alert si existe */}
          {alert && (
            <div
              className={`alert alert-${alert.type} alert-dismissible fade show`}
              role="alert"
            >
              {alert.message}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => setAlert(null)}
              ></button>
            </div>
          )}

          <form onSubmit={handleAuth}>
            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  borderRadius: "10px",
                  borderColor: "#FF6347",
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  borderRadius: "10px",
                  borderColor: "#FF6347",
                }}
              />
            </div>
            {isRegistering && (
              <div className="mb-3">
                <label className="form-label">Clave de entrenador</label>
                <input
                  type="text"
                  className="form-control"
                  value={clave}
                  onChange={(e) => setClave(e.target.value)}
                  required
                  style={{
                    borderRadius: "10px",
                    borderColor: "#FF6347",
                  }}
                />
              </div>
            )}
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  background: "linear-gradient(135deg, #FF6347, #FF4500)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "12px",
                  padding: "10px",
                  fontWeight: "bold",
                }}
              >
                {isRegistering ? "Registrar" : "Iniciar Sesión"}
              </button>
            </div>
          </form>
          <p className="mt-3 text-center">
            {isRegistering ? (
              <>
                ¿Ya tienes cuenta?{" "}
                <button
                  onClick={() => {
                    setAlert(null);
                    setIsRegistering(false);
                  }}
                  className="btn btn-link"
                  style={{ color: "#FFC107", fontWeight: "bold" }}
                >
                  Inicia sesión
                </button>
              </>
            ) : (
              <>
                ¿No estás registrado?{" "}
                <button
                  onClick={() => {
                    setAlert(null);
                    setIsRegistering(true);
                  }}
                  className="btn btn-link"
                  style={{ color: "#FFC107", fontWeight: "bold" }}
                >
                  Regístrate
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
