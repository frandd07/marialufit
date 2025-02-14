"use client";
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import QuienSoy from "./QuienSoy";
import Objetivos from "./Objetivos";
import Nutricion from "./Nutricion";
import Entrenamientos from "./Entrenamientos";
import Contacto from "./Plataforma";
import Perfil from "./Perfil";
import Header from "./Header";
import Footer from "./Footer";
import Link from "next/link";
import Plataforma from "./Plataforma";

export default function Page() {
  return (
    <div style={{ backgroundColor: "#1f2431" }}>
      <Header />

      <div>
        <QuienSoy />
        <Objetivos />
        <Nutricion />
        <Entrenamientos />
        <Plataforma />
      </div>

      <Footer />
    </div>
  );
}
