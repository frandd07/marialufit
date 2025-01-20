import React from 'react';

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><a href="#quien-soy">Quién soy</a></li>
          <li><a href="#objetivos">Objetivos</a></li>
          <li><a href="#nutricion">Nutrición</a></li>
          <li><a href="#entrenamientos">Entrenamientos</a></li>
          <li><a href="#contacto">Contacto</a></li>
          <li><a href="/perfil">Mi perfil</a></li> {/* Página de perfil */}
          <li><a href="/carrito">Mi carrito</a></li> {/* Página de carrito */}
        </ul>
      </nav>
    </header>
  );
}
