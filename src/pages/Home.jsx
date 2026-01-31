import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>New Season Arrivals</h1>
          <p>Check out all the trends for this season.</p>
          <Link to="/products" className="cta-button">Shop Now</Link>
        </div>
      </section>

      <section className="featured-section page-container">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          {['Women', 'Men', 'Kids', 'Accessories'].map((cat) => (
            <Link to="/products" key={cat} className="category-card">
              <div className="cat-content">
                <h3>{cat}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="features-info page-container">
        <div className="feature-item">🚚 Free Shipping</div>
        <div className="feature-item">↩️ 30 Days Return</div>
        <div className="feature-item">💳 Secure Payment</div>
      </section>
    </div>
  );
};

export default Home;