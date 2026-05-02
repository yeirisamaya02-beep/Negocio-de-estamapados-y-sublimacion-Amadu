import React from 'react';

interface FooterProps {
  description?: string;
  address?: string;
  whatsappUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
}

const Footer: React.FC<FooterProps> = ({
  description = "Tu solución creativa para estampados, sublimación, copias e impresiones de calidad.",
  address = "📍 Tu Ciudad, Colombia",
  whatsappUrl = "https://wa.me/573000000000",
  instagramUrl = "#",
  facebookUrl = "#"
}) => {
  return (
    <>
      <footer>
        <div className="footer-brand">
          <div className="logo">Ama<span>du</span></div>
          <p>{description}</p>
        </div>
        <div className="footer-col">
          <h4>Productos</h4>
          <ul>
            <li><a href="#productos">Estampados</a></li>
            <li><a href="#productos">Sublimación</a></li>
            <li><a href="#productos">Copias</a></li>
            <li><a href="#productos">Papelería</a></li>
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
            <li><a href={address.startsWith('http') ? address : '#'}>{address}</a></li>
            <li><a href={whatsappUrl} target="_blank" rel="noopener noreferrer">📲 WhatsApp</a></li>
            <li><a href={instagramUrl} target="_blank" rel="noopener noreferrer">📸 Instagram</a></li>
            <li><a href={facebookUrl} target="_blank" rel="noopener noreferrer">📘 Facebook</a></li>
          </ul>
        </div>
      </footer>
      <div className="footer-bottom">
        © {new Date().getFullYear()} <span>Amadu Studio</span> · Todos los derechos reservados
      </div>
    </>
  );
};

export default Footer;
