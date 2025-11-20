import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Handle video load error - fall back to animated background
      const handleVideoError = () => {
        console.log('Video failed to load, using animated background');
        video.style.display = 'none';
      };

      video.addEventListener('error', handleVideoError);
      
      return () => {
        video.removeEventListener('error', handleVideoError);
      };
    }
  }, []);

  const handleShopNow = () => {
    navigate('/collection');
  };

  const handleViewCollection = () => {
    navigate('/collection');
  };

  const handleStartShopping = () => {
    navigate('/collection');
  };

  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-video-container">
          <video 
            ref={videoRef}
            className="hero-video" 
            autoPlay 
            muted 
            loop 
            playsInline
          >
            <source src="/videos/jewelry-background.mp4" type="video/mp4" />
            {/* You can add more video sources here for better browser compatibility */}
          </video>
          {/* Animated background as fallback */}
          <div className="animated-background"></div>
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Discover Exquisite
              <span className="gradient-text"> Jewelry</span>
            </h1>
            <p className="hero-subtitle">
              Crafted with precision, designed with passion. Explore our collection of 
              timeless pieces that celebrate life's most precious moments.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={handleShopNow}>Shop Now</button>
              <button className="btn btn-secondary" onClick={handleViewCollection}>View Collection</button>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-jewelry">
              <div className="jewelry-item jewelry-ring">Ring</div>
              <div className="jewelry-item jewelry-diamond">Diamond</div>
              <div className="jewelry-item jewelry-crown">Crown</div>
              <div className="jewelry-item jewelry-necklace">Necklace</div>
              <div className="jewelry-item jewelry-earring">Earring</div>
              <div className="jewelry-item jewelry-bracelet">Bracelet</div>
            </div>
            <div className="jewelry-showcase">
              <div className="showcase-item">Shine</div>
              <div className="showcase-item">Glow</div>
              <div className="showcase-item">Sparkle</div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Jewellery Store?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Premium Quality</h3>
              <p>Each piece is carefully crafted using only the finest materials and gemstones.</p>
            </div>
            <div className="feature-card">
              <h3>Lifetime Warranty</h3>
              <p>We stand behind our craftsmanship with comprehensive lifetime warranty coverage.</p>
            </div>
            <div className="feature-card">
              <h3>Free Shipping</h3>
              <p>Complimentary shipping and secure packaging for all orders worldwide.</p>
            </div>
            <div className="feature-card">
              <h3>Expert Curation</h3>
              <p>Our master jewelers hand-select every piece to ensure exceptional beauty.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Find Your Perfect Piece?</h2>
            <p>Explore our curated collection and discover jewelry that speaks to your soul.</p>
            <button className="btn btn-primary btn-large" onClick={handleStartShopping}>Start Shopping</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
