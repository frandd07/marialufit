"use client";
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import QuienSoy from "./QuienSoy";
import Objetivos from "./Objetivos";
import Nutricion from "./Nutricion";
import Entrenamientos from "./Entrenamientos";
import Header from "./Header";
import Footer from "./Footer";

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
