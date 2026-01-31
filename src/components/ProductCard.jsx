import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        {/* Using a placeholder if no image URL is provided by backend yet */}
        <img src={product.image || 'https://via.placeholder.com/300x400?text=No+Image'} alt={product.name} />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="category">{product.category}</p>
        <p className="price">${Number(product.price).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;