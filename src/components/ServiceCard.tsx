import React from 'react';

interface ServiceCardProps {
  icon: string;
  name: string;
  description: string;
  colorClass: string;
  imagen_url?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, name, description, colorClass, imagen_url }) => {
  return (
    <div className={`service-card ${colorClass}`}>
      {imagen_url ? (
        <div className="service-image-container">
          <img src={imagen_url} alt={name} className="service-image" />
        </div>
      ) : (
        <span className="service-icon">{icon}</span>
      )}
      <div className="service-name">{name}</div>
      <p className="service-desc">{description}</p>
    </div>
  );
};

export default ServiceCard;
