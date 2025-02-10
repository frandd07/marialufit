"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LOGIN, REGISTER } from "../api/login/route";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import Footer from "./Footer"; // Importa el footer

export default function AuthPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clave, setClave] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido1, setApellido1] = useState("");
  const [apellido2, setApellido2] = useState("");
  const [alert, setAlert] = useState(null);
  const router = useRouter();

  async function handleAuth(e) {
    e.preventDefault();

    if (
      email &&
      password &&
      (!isRegistering ||
        (isRegistering && clave && nombre && apellido1 && apellido2))
    ) {
      if (isRegistering) {
        const { error } = await REGISTER({
          email,
          password,
          clave,
          nombre,
          apellido1,
          apellido2,
        });
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
          // Limpiar campos de registro
          setClave("");
          setNombre("");
          setApellido1("");
          setApellido2("");
        }
      } else {
        const { error, admin } = await LOGIN({ email, password });
        if (error) {
          setAlert({
            type: "danger",
            message: "Error al iniciar sesión: " + error.message,
          });
        } else {
          setAlert({ type: "success", message: "Sesión iniciada con éxito." });
          router.push(admin ? "/admin" : "/usuario/medidas");
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
    <div
      className="d-flex flex-column min-vh-100"
      style={{ backgroundColor: "#585953" }}
    >
      {/* Header en la parte superior */}
      <Header />

      {/* Contenido principal */}
      <main
        className="flex-grow-1 d-flex align-items-center justify-content-center"
        style={{ padding: "20px", paddingTop: "60px" }} // paddingTop extra para separar del header
      >
        {/* Tarjeta central que contiene imagen y formulario */}
        <div
          className="row w-100 mt-5"
          style={{
            maxWidth: "1000px",
            minHeight: "80vh", // se expande según el contenido (registro)
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Columna de la imagen */}
          <div className="col-12 col-md-6 p-0">
            <img
              src="/images/img_principal.jpg"
              alt="Imagen de fondo"
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Columna del formulario */}
          <div
            className="col-12 col-md-6 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: "#2c2f38", padding: "30px" }}
          >
            <div className="w-100">
              <h2
                className="text-center mb-3 text-white fw-bold"
                style={{ fontSize: "22px" }}
              >
                {isRegistering ? "Registrarse" : "Iniciar Sesión"}
              </h2>

              {alert && (
                <div
                  className={`alert alert-${alert.type} alert-dismissible fade show p-2`}
                  role="alert"
                  style={{ fontSize: "14px" }}
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
                <div className="mb-2">
                  <label
                    htmlFor="email"
                    className="form-label text-white"
                    style={{ fontSize: "14px" }}
                  >
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-control form-control-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-2">
                  <label
                    htmlFor="password"
                    className="form-label text-white"
                    style={{ fontSize: "14px" }}
                  >
                    Contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="form-control form-control-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {isRegistering && (
                  <>
                    <div className="mb-2">
                      <label
                        htmlFor="nombre"
                        className="form-label text-white"
                        style={{ fontSize: "14px" }}
                      >
                        Nombre
                      </label>
                      <input
                        id="nombre"
                        type="text"
                        className="form-control form-control-sm"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="apellido1"
                        className="form-label text-white"
                        style={{ fontSize: "14px" }}
                      >
                        Apellido 1
                      </label>
                      <input
                        id="apellido1"
                        type="text"
                        className="form-control form-control-sm"
                        value={apellido1}
                        onChange={(e) => setApellido1(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="apellido2"
                        className="form-label text-white"
                        style={{ fontSize: "14px" }}
                      >
                        Apellido 2
                      </label>
                      <input
                        id="apellido2"
                        type="text"
                        className="form-control form-control-sm"
                        value={apellido2}
                        onChange={(e) => setApellido2(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="clave"
                        className="form-label text-white"
                        style={{ fontSize: "14px" }}
                      >
                        Clave de entrenador
                      </label>
                      <input
                        id="clave"
                        type="text"
                        className="form-control form-control-sm"
                        value={clave}
                        onChange={(e) => setClave(e.target.value)}
                        required
                      />
                    </div>
                  </>
                )}

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    style={{
                      background: "linear-gradient(135deg, #FF6347, #FF4500)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "10px",
                      padding: "8px",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {isRegistering ? "Registrar" : "Iniciar Sesión"}
                  </button>
                </div>
              </form>

              <p
                className="mt-2 text-center text-white"
                style={{ fontSize: "13px" }}
              >
                {isRegistering ? (
                  <>
                    ¿Ya tienes cuenta?{" "}
                    <button
                      onClick={() => {
                        setAlert(null);
                        setIsRegistering(false);
                        // Limpiar campos de registro
                        setClave("");
                        setNombre("");
                        setApellido1("");
                        setApellido2("");
                      }}
                      className="btn btn-link btn-sm"
                      style={{ color: "#FFC107", fontSize: "13px" }}
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
                      className="btn btn-link btn-sm"
                      style={{ color: "#FFC107", fontSize: "13px" }}
                    >
                      Regístrate
                    </button>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer al final */}
      <Footer />
    </div>
  );
}
