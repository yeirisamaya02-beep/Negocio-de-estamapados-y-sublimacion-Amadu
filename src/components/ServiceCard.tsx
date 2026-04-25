import React from 'react';

interface ServiceCardProps {
  icon: string;
  name: string;
  description: string;
  colorClass: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, name, description, colorClass }) => {
  return (
    <div className={`service-card ${colorClass}`}>
      <span className="service-icon">{icon}</span>
      <div className="service-name">{name}</div>
      <p className="service-desc">{description}</p>
    </div>
  );
};

export default ServiceCard;
