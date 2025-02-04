import React from "react";
import "../stylenutricion.css"; // Archivo de estilos personalizados
import "bootstrap/dist/css/bootstrap.min.css";

export default function Nutricion() {
  return (
    <section id="nutricion" className="py-5">
      <div className="container">
        <h2 className="mb-4">Nutrición</h2>
        <div className="row">
          {/* Card 1 */}
          <div className="col-md-3 mb-4">
            <div
              className="card hover-scale"
              style={{ backgroundColor: "#1f2431" }}
            >
              <img
                src="https://www.menuvivo.com/img/posts/meal-plan-personalization-with-menuvivo.webp"
                className="card-img-top"
                alt="Nutrición 1"
              />
              <div className="card-body">
                <h5 className="card-title text-white">
                  Planes de comida personalizados
                </h5>
                <p className="card-text text-white">
                  Opciones de planes de comidas adaptados a diferentes objetivos
                  (pérdida de peso, aumento de masa muscular, mantenimiento,
                  etc.).
                </p>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="col-md-3 mb-4">
            <div
              className="card hover-scale"
              style={{ backgroundColor: "#1f2431" }}
            >
              <img
                src="https://www.cocinadelirante.com/sites/default/files/images/2024/04/recetas-economicas-y-saludables-para-todos-los-dias-de-la-semana.jpg"
                className="card-img-top"
                alt="Nutrición 2"
              />
              <div className="card-body">
                <h5 className="card-title text-white">Recetas saludables</h5>
                <p className="card-text text-white">
                  Incluye una sección con recetas saludables y fáciles de
                  preparar, destacando ingredientes nutritivos.
                </p>
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="col-md-3 mb-4">
            <div
              className="card hover-scale"
              style={{ backgroundColor: "#1f2431" }}
            >
              <img
                src="https://enlinea.santotomas.cl/web/wp-content/uploads/sites/2/2020/03/fit-mitos-640x363.png"
                className="card-img-top"
                alt="Nutrición 3"
              />
              <div className="card-body">
                <h5 className="card-title text-white">
                  Consejos nutricionales
                </h5>
                <p className="card-text text-white">
                  Encuentra recomendaciones prácticas para mejorar tu
                  alimentación y alcanzar tus metas de salud de forma
                  equilibrada.
                </p>
              </div>
            </div>
          </div>
          {/* Card 4 */}
          <div className="col-md-3 mb-4">
            <div
              className="card hover-scale"
              style={{ backgroundColor: "#1f2431" }}
            >
              <img
                src="https://www.luisriverav.com/wp-content/uploads/2017/05/gym-supplements.jpg"
                className="card-img-top"
                alt="Nutrición 4"
              />
              <div className="card-body">
                <h5 className="card-title text-white">
                  Suplementos Nutricionales
                </h5>
                <p className="card-text text-white">
                  Complementa tu dieta con suplementos adaptados a tus
                  objetivos, mejorando el rendimiento y promoviendo una salud
                  equilibrada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
