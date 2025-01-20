'use client'
import React from 'react';
import QuienSoy from './QUIENSOY';
import Objetivos from './OBJETIVOS';
import Nutricion from './NUTRICION';
import Entrenamientos from './ENTRENAMIENTOS';
import Contacto from './CONTACTO';
import Perfil from './PERFIL';
import Carrito from './CARRITO';
import Header from './HEADER';
import Footer from './FOOTER';
import Link from 'next/link';

export default function Page() {
  return (
    <div>
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
