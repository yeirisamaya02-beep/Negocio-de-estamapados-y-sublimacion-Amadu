import React from 'react';

const GalleryStrip: React.FC = () => {
  return (
    <section className="gallery-strip" id="galeria">
      <div className="section-header">
        <span className="section-tag">Trabajos recientes</span>
        <h2 className="section-title">NUESTRA <span>GALERÍA</span></h2>
      </div>
      <div className="gallery-grid">
        <div className="gallery-item">
          <div className="gallery-swatch g1">👕🎨</div>
        </div>
        <div className="gallery-item">
          <div className="gallery-swatch g2">☕🌡️</div>
        </div>
        <div className="gallery-item">
          <div className="gallery-swatch g3">🎀📜</div>
        </div>
        <div className="gallery-item">
          <div className="gallery-swatch g4">🏷️✨</div>
        </div>
        <div className="gallery-item">
          <div className="gallery-swatch g5">🎁🖨️</div>
        </div>
      </div>
    </section>
  );
};

export default GalleryStrip;
