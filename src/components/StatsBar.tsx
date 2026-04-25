import React from 'react';

const stats = [
  { num: '500+', lbl: 'Clientes Felices' },
  { num: '6', lbl: 'Servicios Disponibles' },
  { num: '24h', lbl: 'Entrega Express' },
  { num: '100%', lbl: 'Personalizado' },
];

const StatsBar: React.FC = () => {
  return (
    <div className="stats-bar">
      {stats.map((s, idx) => (
        <div className="stat" key={idx}>
          <div className="stat-num">{s.num}</div>
          <div className="stat-lbl">{s.lbl}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
