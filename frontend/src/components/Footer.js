import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-tanishq">
      <div className="footer-content">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-section brand-section">
            <h3 className="footer-logo">Jewellery Store</h3>
            <p className="footer-tagline">
              Crafting timeless elegance since 1999. Experience the finest jewelry 
              with unmatched quality and craftsmanship.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FiFacebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FiInstagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FiTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-heading">Shop</h4>
            <ul className="footer-links">
              <li><Link to="/collection?category=rings">Rings</Link></li>
              <li><Link to="/collection?category=necklaces">Necklaces</Link></li>
              <li><Link to="/collection?category=earrings">Earrings</Link></li>
              <li><Link to="/collection?category=bracelets">Bracelets</Link></li>
              <li><Link to="/collection">All Collections</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-section">
            <h4 className="footer-heading">Customer Service</h4>
            <ul className="footer-links">
              <li><Link to="/profile">My Account</Link></li>
              <li><Link to="/cart">Shopping Cart</Link></li>
              <li><a href="#shipping">Shipping Information</a></li>
              <li><a href="#returns">Returns & Exchanges</a></li>
              <li><a href="#warranty">Warranty</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-section">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-contact">
              <li>
                <FiPhone size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li>
                <FiMail size={16} />
                <span>contact@jewellerystore.com</span>
              </li>
              <li>
                <FiMapPin size={16} />
                <span>123 Jewelry Lane, New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="newsletter-section">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h4>Subscribe to Our Newsletter</h4>
              <p>Get exclusive offers and updates on new collections</p>
            </div>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="newsletter-input"
                aria-label="Email address"
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} Jewellery Store. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
