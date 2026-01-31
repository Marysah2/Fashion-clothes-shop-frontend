import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../slices/productsSlice';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    dispatch(fetchProducts(selectedCategory));
  }, [dispatch, selectedCategory]);

  const categories = ['Men', 'Women', 'Kids', 'Accessories'];

  return (
    <div className="page-container">
      <h1>Our Collection</h1>
      
      <div className="category-filters">
        <button 
          className={selectedCategory === '' ? 'active' : ''} 
          onClick={() => setSelectedCategory('')}
        >
          All
        </button>
        {categories.map(cat => (
          <button 
            key={cat}
            className={selectedCategory === cat ? 'active' : ''}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && <p className="loading">Loading products...</p>}
      {error && <p className="error-message">{typeof error === 'string' ? error : 'Failed to load products'}</p>}
      
      {!loading && !error && (
        <div className="products-grid">
          {items.length > 0 ? (
            items.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;