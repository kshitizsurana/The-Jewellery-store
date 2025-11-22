import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const heroSlides = [
    {
      title: 'Timeless Elegance',
      subtitle: 'Discover our exquisite collection of handcrafted jewelry',
      description: 'Where tradition meets contemporary design',
      image: '💎',
      cta: 'Explore Collection',
      badge: 'New Arrivals'
    },
    {
      title: 'Heritage Collection',
      subtitle: 'Celebrate your precious moments',
      description: 'Jewelry that tells your unique story',
      image: '👑',
      cta: 'View Heritage',
      badge: 'Bestsellers'
    },
    {
      title: 'Diamond Brilliance',
      subtitle: 'Experience the sparkle of perfection',
      description: 'Perfectly cut diamonds in stunning designs',
      image: '✨',
      cta: 'Shop Diamonds',
      badge: 'Exclusive'
    }
  ];

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  const collections = [
    {
      id: 1,
      title: 'Bridal Collection',
      subtitle: 'Wedding Jewelry',
      description: 'Celebrate your special day with our exclusive bridal pieces',
      icon: '💍',
      count: '150+ Designs'
    },
    {
      id: 2,
      title: 'Heritage Necklaces',
      subtitle: 'Traditional Elegance',
      description: 'Classic designs with contemporary craftsmanship',
      icon: '📿',
      count: '200+ Designs'
    },
    {
      id: 3,
      title: 'Diamond Earrings',
      subtitle: 'Sparkling Beauty',
      description: 'Timeless earrings for every occasion',
      icon: '💎',
      count: '80+ Designs'
    },
    {
      id: 4,
      title: 'Gold Ornaments',
      subtitle: 'Timeless Traditions',
      description: 'Pure gold craftsmanship with BIS hallmark',
      icon: '🏆',
      count: '300+ Designs'
    }
  ];

  const trustIndicators = [
    {
      id: 1,
      icon: '🏅',
      title: 'BIS Hallmark',
      description: 'Certified purity guaranteed',
      badge: 'Verified'
    },
    {
      id: 2,
      icon: '🚚',
      title: 'Free Shipping',
      description: 'On all orders nationwide',
      badge: 'Always'
    },
    {
      id: 3,
      icon: '↩️',
      title: '30-Day Returns',
      description: 'Hassle-free exchanges',
      badge: 'Easy'
    },
    {
      id: 4,
      icon: '🔒',
      title: 'Secure Payment',
      description: '100% secure transactions',
      badge: 'Safe'
    },
    {
      id: 5,
      icon: '💎',
      title: 'Lifetime Exchange',
      description: 'For all gold jewelry',
      badge: 'Lifetime'
    },
    {
      id: 6,
      icon: '🎁',
      title: 'Gift Wrap',
      description: 'Complimentary packaging',
      badge: 'Free'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      location: 'Mumbai',
      rating: 5,
      text: 'Absolutely stunning craftsmanship! The bridal collection exceeded all my expectations. The team was incredibly helpful throughout.',
      image: '👩',
      date: '2 weeks ago'
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      location: 'Delhi',
      rating: 5,
      text: 'Purchased a diamond necklace for my wife\'s anniversary. The quality is exceptional and the service was top-notch.',
      image: '👨',
      date: '1 month ago'
    },
    {
      id: 3,
      name: 'Anjali Mehta',
      location: 'Bangalore',
      rating: 5,
      text: 'The contemporary collection is perfect! Modern designs with traditional quality. Highly recommended for young professionals.',
      image: '👩',
      date: '3 weeks ago'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '25+', label: 'Years Excellence' },
    { number: '1000+', label: 'Unique Designs' },
    { number: '100+', label: 'Master Artisans' }
  ];

  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero-section-tanishq">
        <div className="hero-container">
          <div className="hero-card">
            <div className="hero-content-split">
              {/* Left: Image */}
              <div className="hero-image-container">
                <div className="hero-image-wrapper">
                  <div className="hero-jewelry-icon">
                    {heroSlides[activeSlide].image}
                  </div>
                  <div className="hero-glow"></div>
                </div>
              </div>

              {/* Right: Copy */}
              <div className="hero-copy-container">
                <h1 className="hero-headline">
                  {heroSlides[activeSlide].title}
                </h1>
                <p className="hero-subhead">
                  {heroSlides[activeSlide].subtitle}
                </p>
                <div className="hero-actions">
                  <button 
                    className="btn-primary-tanishq"
                    onClick={() => navigate('/collection')}
                  >
                    SHOP NOW
                  </button>
                  <button 
                    className="btn-secondary-tanishq"
                    onClick={() => navigate('/collection')}
                  >
                    Explore Collections
                  </button>
                </div>
                
                {/* Carousel Dots */}
                <div className="carousel-dots">
                  {heroSlides.map((_, index) => (
                    <button
                      key={index}
                      className={`dot ${index === activeSlide ? 'active' : ''}`}
                      onClick={() => setActiveSlide(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card animate-fade-in-up">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="trust-section">
        <div className="container-tanishq">
          <div className="section-header">
            <h2 className="section-title">Why Choose Tanishq</h2>
            <p className="section-subtitle">
              Experience luxury shopping with unmatched benefits
            </p>
          </div>
          <div className="trust-grid">
            {trustIndicators.map((indicator) => (
              <div key={indicator.id} className="trust-card">
                <div className="trust-icon">{indicator.icon}</div>
                <div className="trust-badge badge-tanishq">{indicator.badge}</div>
                <h3 className="trust-title">{indicator.title}</h3>
                <p className="trust-description">{indicator.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="collections-section-tanishq">
        <div className="collections-container">
          <div className="section-header-tanishq">
            <h2 className="section-title-tanishq">Tanishq Collections</h2>
            <p className="section-subtitle-tanishq">
              Explore our curated selection of fine jewelry
            </p>
          </div>

          <div className="collections-grid-tanishq">
            {collections.map((collection) => (
              <div 
                key={collection.id} 
                className="collection-card-tanishq"
                onClick={() => navigate('/collection')}
              >
                <div className="collection-image-area">
                  <div className="collection-icon-large">
                    {collection.icon}
                  </div>
                </div>
                <div className="collection-content-area">
                  <h3 className="collection-title">{collection.title}</h3>
                  <p className="collection-subtitle">{collection.subtitle}</p>
                  <p className="collection-description">{collection.description}</p>
                  <span className="collection-badge">{collection.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="trust-indicators-section">
        <div className="trust-indicators-container">
          {trustIndicators.map((indicator) => (
            <div key={indicator.id} className="trust-indicator-card">
              <div className="trust-indicator-icon">{indicator.icon}</div>
              <div className="trust-indicator-content">
                <h3 className="trust-indicator-title">{indicator.title}</h3>
                <p className="trust-indicator-description">{indicator.description}</p>
                <span className="trust-indicator-badge">{indicator.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section-tanishq">
        <div className="features-container">
          <div className="feature-card-tanishq">
            <div className="feature-icon-tanishq">🏆</div>
            <h3>Premium Quality</h3>
            <p>Crafted using only the finest materials and genuine gemstones</p>
          </div>
          <div className="feature-card-tanishq">
            <div className="feature-icon-tanishq">🛡️</div>
            <h3>Lifetime Warranty</h3>
            <p>Comprehensive coverage on craftsmanship and materials</p>
          </div>
          <div className="feature-card-tanishq">
            <div className="feature-icon-tanishq">🚚</div>
            <h3>Free Shipping</h3>
            <p>Complimentary worldwide shipping with secure packaging</p>
          </div>
          <div className="feature-card-tanishq">
            <div className="feature-icon-tanishq">👨‍🎨</div>
            <h3>Master Craftsmen</h3>
            <p>Decades of traditional jewelry-making expertise</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container-tanishq">
          <div className="section-header">
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">
              Real experiences from our valued customers
            </p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">{testimonial.image}</div>
                  <div className="testimonial-info">
                    <h4 className="testimonial-name">{testimonial.name}</h4>
                    <p className="testimonial-location">{testimonial.location}</p>
                  </div>
                  <div className="testimonial-rating">
                    {'⭐'.repeat(testimonial.rating)}
                  </div>
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <p className="testimonial-date">{testimonial.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section-tanishq">
        <div className="cta-container">
          <div className="cta-card">
            <h2 className="cta-title">Begin Your Jewelry Journey</h2>
            <p className="cta-description">
              Discover pieces that resonate with your personal style and create memories that last forever
            </p>
            <button 
              className="btn-cta-tanishq"
              onClick={() => navigate('/collection')}
            >
              START YOUR COLLECTION
            </button>
            <div className="cta-features-list">
              <span>✓ 30-Day Returns</span>
              <span>✓ Expert Consultation</span>
              <span>✓ Certificate of Authenticity</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
