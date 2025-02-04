"use client";
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import QuienSoy from "./QuienSoy";
import Objetivos from "./Objetivos";
import Nutricion from "./Nutricion";
import Entrenamientos from "./Entrenamientos";
import Contacto from "./Contacto";
import Perfil from "./Perfil";
import Header from "./Header";
import Footer from "./Footer";
import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-dark">
      <Header />

      <div>
        <QuienSoy />
        <Objetivos />
        <Nutricion />
        <Entrenamientos />
        <Contacto />
      </div>

      <Footer />
    </div>
  );
}
