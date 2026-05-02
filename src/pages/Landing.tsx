import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import StatsBar from '../components/StatsBar';
import ServiceCard from '../components/ServiceCard';
import ProcessSteps from '../components/ProcessSteps';
import GalleryStrip from '../components/GalleryStrip';
import Footer from '../components/Footer';
import { supabase } from '../supabaseClient';

const defaultServices = [
  { icono: '👕', nombre: 'Estampados', descripción: 'Camisetas, chaquetas, uniformes y más con serigrafía y estampado digital.', clase_de_color: 'c1' },
  { icono: '🌡️', nombre: 'Sublimación', descripción: 'Mugs, tazas, gorras, cojines y telas con impresión de alta calidad.', clase_de_color: 'c2' },
  { icono: '🖨️', nombre: 'Copias e Impresiones', descripción: 'Fotocopias B&N y a color, impresión en diferentes tamaños.', clase_de_color: 'c3' },
  { icono: '🎀', nombre: 'Papelería Creativa', descripción: 'Invitaciones, tarjetas, flyers, stickers y packaging para eventos.', clase_de_color: 'c4' },
  { icono: '🏷️', nombre: 'Rótulos y Pendones', descripción: 'Lonas publicitarias y señalización con colores vibrantes.', clase_de_color: 'c5' },
  { icono: '🎁', nombre: 'Artículos Promocionales', descripción: 'Bolsos, libretas, lapiceros y artículos con tu marca.', clase_de_color: 'c6' },
];

function Landing() {
  const [servicios, setServicios] = useState<any[]>(defaultServices);
  const [config, setConfig] = useState<any>({
    hero_tag: '🎨 Estampados · Sublimación · Papelería',
    hero_title: 'DALE COLOR A TUS IDEAS CREATIVAS',
    hero_subtitle: 'Estampados personalizados, sublimación de alta calidad, copias, impresiones y papelería creativa para eventos, empresas y personas.',
    whatsapp_number: '573000000000',
    instagram_url: '#',
    facebook_url: '#',
    address: '📍 Tu Ciudad, Colombia',
    footer_desc: 'Tu solución creativa para estampados, sublimación, copias e impresiones de calidad.'
  });

  useEffect(() => {
    async function cargarProductos() {
      try {
        const { data, error } = await supabase
          .from('productos')
          .select('*');
        
        if (error) throw error;
        if (data && data.length > 0) {
          setServicios(data);
        }
      } catch (err) {
        console.warn('Usando servicios por defecto mientras se sincroniza Supabase.', err);
      }
    }

    async function cargarConfiguracion() {
      try {
        const { data, error } = await supabase.from('configuracion').select('*').single();
        if (data && !error) {
          setConfig(data);
        }
      } catch (err) {
        console.warn('No se pudo cargar la configuración.', err);
      }
    }

    cargarConfiguracion();
    cargarProductos();
  }, []);

  return (
    <div className="Amadu-app">
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <span className="hero-tag">{config.hero_tag}</span>
          <h1 dangerouslySetInnerHTML={{ __html: config.hero_title.replace('IDEAS', '<span class="accent">IDEAS</span>').replace('CREATIVAS', '<span class="accent2">CREATIVAS</span>') }} />
          <p className="hero-sub">{config.hero_subtitle}</p>
          <div className="hero-btns">
            <a href="#contacto" className="btn-primary">Pedir Cotización</a>
            <a href="#productos" className="btn-secondary">Ver Productos</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="tshirt-scene">
            <div className="tshirt-bg">
              <span className="tshirt-icon">👕</span>
              <span className="tshirt-label">DISEÑO PERSONALIZADO</span>
            </div>
            <span className="badge badge-1">¡TU LOGO AQUÍ!</span>
            <span className="badge badge-2">🖨️ Full Color</span>
          </div>
        </div>
      </section>

      <StatsBar />

      {/* SERVICES */}
      <section className="services" id="productos">
        <div className="section-header">
          <span className="section-tag">Lo que ofrecemos</span>
          <h2 className="section-title">NUESTROS <span>PRODUCTOS</span></h2>
          <p className="section-sub">Todo lo que necesitas para expresar tu marca o evento</p>
        </div>
        <div className="services-grid">
          {servicios.map((s, idx) => (
            <ServiceCard 
              key={idx} 
              icon={s.icono} 
              name={s.nombre} 
              description={s.descripción} 
              colorClass={s.clase_de_color}
              imagen_url={s.imagen_url}
            />
          ))}
        </div>
      </section>

      <ProcessSteps />

      <GalleryStrip />

      {/* CTA */}
      <section className="cta-section" id="contacto">
        <h2>¿LISTO PARA<br />CREAR ALGO INCREÍBLE?</h2>
        <p>Contáctanos hoy y recibe tu cotización sin compromiso. Hacemos realidad tus ideas con la mejor calidad.</p>
        <a href={`https://wa.me/${config.whatsapp_number.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn-white">📲 Cotizar por WhatsApp</a>
      </section>

      <Footer 
        address={config.address}
        description={config.footer_desc}
        whatsappUrl={`https://wa.me/${config.whatsapp_number.replace(/\D/g, '')}`}
        instagramUrl={config.instagram_url}
        facebookUrl={config.facebook_url}
      />
    </div>
  );
}

export default Landing;
