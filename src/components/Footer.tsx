import React from 'react';

const Footer: React.FC = () => {
  return (
    <>
      <footer>
        <div className="footer-brand">
          <div className="logo">Ama<span>du</span></div>
          <p>Tu solución creativa para estampados, sublimación, copias e impresiones de calidad.</p>
        </div>
        <div className="footer-col">
          <h4>Servicios</h4>
          <ul>
            <li><a href="#servicios">Estampados</a></li>
            <li><a href="#servicios">Sublimación</a></li>
            <li><a href="#servicios">Copias</a></li>
            <li><a href="#servicios">Papelería</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Empresa</h4>
          <ul>
            <li><a href="#">Nosotros</a></li>
            <li><a href="#galeria">Galería</a></li>
            <li><a href="#">Precios</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contacto</h4>
          <ul>
            <li><a href="#">📍 Tu Ciudad, Colombia</a></li>
            <li><a href="https://wa.me/573000000000">📲 WhatsApp</a></li>
            <li><a href="#">📸 Instagram</a></li>
            <li><a href="#">📘 Facebook</a></li>
          </ul>
        </div>
      </footer>
      <div className="footer-bottom">
        © {new Date().getFullYear()} <span>Amadu Studio</span> · Todos los derechos reservados
        <span style={{ margin: '0 10px', color: '#444' }}>|</span>
        <a href="/admin" style={{ color: '#666', textDecoration: 'none', fontSize: '0.8rem' }}>Admin</a>
      </div>
    </>
  );
};

export default Footer;
