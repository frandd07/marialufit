"use client";
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import QuienSoy from "./principal/QuienSoy";
import Objetivos from "./principal/Objetivos";
import Nutricion from "./principal/Nutricion";
import Entrenamientos from "./principal/Entrenamientos";
import Header from "./principal/Header";
import Footer from "./principal/Footer";

export default function Page() {
  return (
    <div style={{ backgroundColor: "#1f2431" }}>
      <Header />

      <div>
        <QuienSoy />
        <Objetivos />
        <Nutricion />
        <Entrenamientos />
      </div>

      <Footer />
    </div>
  );
}
