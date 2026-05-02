import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <a href="/" className="logo">Ama<span>du</span></a>
      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        <span className={isOpen ? 'line open' : 'line'}></span>
        <span className={isOpen ? 'line open' : 'line'}></span>
        <span className={isOpen ? 'line open' : 'line'}></span>
      </div>
      <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
        <li><a href="#servicios" onClick={() => setIsOpen(false)}>Servicios</a></li>
        <li><a href="#proceso" onClick={() => setIsOpen(false)}>Proceso</a></li>
        <li><a href="#galeria" onClick={() => setIsOpen(false)}>Galería</a></li>
        <li><a href="#contacto" className="nav-cta" onClick={() => setIsOpen(false)}>Cotizar</a></li>
        <li><Link to="/admin" onClick={() => setIsOpen(false)}>Admin ⚙️</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
