import React from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  icon: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
      <div className="card-img">{product.icon}</div>
      <div className="card-body">
        <div className="card-name">{product.name}</div>
        <div className="card-desc">{product.description}</div>
        <div className="card-price">{product.price}</div>
        <div className="card-actions">
          <div className="btn-row">
            <button className="btn btn-secondary">Cantidad</button>
            <button className="btn btn-secondary">Detalles</button>
          </div>
          <button className="btn btn-primary">Comprar ahora</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
export type { Product };
