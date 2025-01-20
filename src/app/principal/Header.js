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
          <li><a href="../login">Mi perfil</a></li> 
          <li><a href="/carrito">Mi carrito</a></li>
        </ul>
      </nav>
    </header>
  );
}
