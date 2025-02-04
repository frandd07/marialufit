import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Entrenamientos() {
  return (
    <section id="entrenamientos" className="container my-5">
      <div className="row">
        <div className="col-12 col-md-6 mb-4">
          <div className="p-5 bg-dark text-white rounded-3">
            <img
              src="https://via.placeholder.com/500x300"
              alt="Entrenamiento 1"
              className="img-fluid rounded-3 mb-3"
            />
            <h2>Another headline</h2>
            <p>And an even wittier subheading.</p>
          </div>
        </div>
        <div className="col-12 col-md-6 mb-4">
          <div className="p-5 bg-light text-dark rounded-3">
            <img
              src="https://via.placeholder.com/500x300"
              alt="Entrenamiento 2"
              className="img-fluid rounded-3 mb-3"
            />
            <h2>Another headline</h2>
            <p>And an even wittier subheading.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
