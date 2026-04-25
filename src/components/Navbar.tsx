import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav>
      <a href="/" className="logo">Ama<span>du</span></a>
      <ul className="nav-links">
        <li><a href="#servicios">Servicios</a></li>
        <li><a href="#proceso">Proceso</a></li>
        <li><a href="#galeria">Galería</a></li>
        <li><a href="#contacto" className="nav-cta">Cotizar</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
