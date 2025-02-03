import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styleobjetivo.css";

export default function Objetivos() {
  const objetivos = [
    { titulo: "Oposiciones", imagen: "/images/pista.jpg" },
    { titulo: "Mantenimiento", imagen: "/images/mantenimiento.jpg" },
    { titulo: "Definición", imagen: "/images/definicion.jpg" },
    { titulo: "Volumen", imagen: "/images/volumen.jpg" },
    { titulo: "Quema de Grasa", imagen: "/images/quemagrasa.jpg" },
    { titulo: "Competiciones", imagen: "/images/competiciones.jpg" },
  ];

  return (
    <section
      id="objetivos"
      className="py-5"
      style={{ backgroundColor: "#1f2431" }}
    >
      <div className="container">
        <h2 className="text-center text-white mb-5"></h2>

        <div className="objetivos-grid">
          {objetivos.map((obj, index) => (
            <div key={index} className={`objetivo-card objetivo-${index + 1}`}>
              <img src={obj.imagen} alt={obj.titulo} className="objetivo-img" />
              <div className="overlay"></div>
              <div className="objetivo-text">
                <h3>{obj.titulo.toUpperCase()}</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
