import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styleobjetivo.css";

export default function Objetivos() {
  const objetivos = [
    {
      titulo: "Oposiciones",
      imagen: "/images/pista.jpg",
      descripcion:
        "Entrenamientos adaptados para superar las pruebas físicas de oposiciones.",
    },
    {
      titulo: "Mantenimiento",
      imagen: "/images/mantenimiento.jpg",
      descripcion:
        "Mantén tu forma física con rutinas equilibradas adaptadas a tu día a día.",
    },
    {
      titulo: "Definición",
      imagen: "/images/definicion.jpg",
      descripcion:
        "Reduce grasa y marca músculo con entrenamientos y planes de nutrición.",
    },
    {
      titulo: "Volumen",
      imagen: "/images/volumen.jpg",
      descripcion:
        "Gana masa muscular con rutinas intensivas y alimentación adecuada.",
    },
    {
      titulo: "Quema de Grasa",
      imagen: "/images/quemagrasa.jpg",
      descripcion:
        "Elimina grasa de forma efectiva con entrenamientos de alta intensidad.",
    },
    {
      titulo: "Competiciones",
      imagen: "/images/competiciones.jpg",
      descripcion:
        "Prepárate para tu próxima competición con entrenamientos específicos.",
    },
  ];

  return (
    <section
      id="objetivos"
      className="py-5"
      style={{ backgroundColor: "#1f2431" }}
    >
      <div className="container">
        <h2 className="text-center text-white mb-5">Objetivos</h2>

        <div className="objetivos-grid">
          {objetivos.map((obj, index) => (
            <div key={index} className={`objetivo-card objetivo-${index + 1}`}>
              <img src={obj.imagen} alt={obj.titulo} className="objetivo-img" />
              <div className="overlay"></div>
              <div className="objetivo-text">
                <h3>{obj.titulo.toUpperCase()}</h3>
                <p>{obj.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
