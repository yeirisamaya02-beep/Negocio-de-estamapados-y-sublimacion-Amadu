import React from 'react';

const steps = [
  { num: 1, title: 'Nos Contactas', desc: 'Escríbenos por WhatsApp o visítanos. Cuéntanos qué necesitas y en cuánto tiempo.' },
  { num: 2, title: 'Diseñamos', desc: 'Nuestro equipo crea la propuesta visual. Si tienes tu diseño, lo adaptamos al producto.' },
  { num: 3, title: 'Apruebas', desc: 'Te enviamos una prueba digital para que apruebes antes de producir. Sin sorpresas.' },
  { num: 4, title: 'Entregamos', desc: 'Producimos y entregamos tu pedido en el tiempo acordado. ¡Listo para lucir!' },
];

const ProcessSteps: React.FC = () => {
  return (
    <section className="process" id="proceso">
      <div className="section-header">
        <span className="section-tag" style={{ color: 'var(--cyan)' }}>Cómo trabajamos</span>
        <h2 className="section-title">ASÍ DE <span style={{ color: 'var(--yellow)' }}>FÁCIL</span></h2>
        <p className="section-sub">4 pasos para tener tu producto personalizado</p>
      </div>
      <div className="process-steps">
        {steps.map((s, idx) => (
          <div className="step" key={idx}>
            <div className="step-num">{s.num}</div>
            <div className="step-title">{s.title}</div>
            <p className="step-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProcessSteps;
