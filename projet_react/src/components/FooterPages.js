import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './styles/footerPages.css';

const FooterPages = () => {
  return (
    <footer className="footer-pages">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Société</h3>
          <p>A propos</p>
          <p>Offre d'emploi</p>
          <p>For the Record</p>
        </div>
        <div className="footer-section">
          <h3>Communautés</h3>
          <p>Espace Artistes</p>
          <p>Développeurs</p>
          <p>Campagnes publicitaires</p>
          <p>Investisseurs</p>
          <p>Fournisseurs</p>
        </div>
        <div className="footer-section">
          <h3>Liens utiles</h3>
          <p>Assistance</p>
          <p>Appli mobile gratuite</p>
          <p>Playlist</p>
        </div>
        <div className="footer-social">
            <span><FaInstagram /></span>
            <span><FaTwitter /></span>
            <span><FaFacebook /></span>
        </div>
      </div>
      <div className='bloc_2'>
        <p className="footer-bas">
          <span>Légal</span>
          <span>Centre de confidentialité</span>
          <span>Protection des données</span>
          <span>Paramètres des cookies</span>
          <span>A propos de nous</span>
          <span>Accessibilité</span>
        </p>
        <p>&copy; 2023 Spotify Ynov</p>
      </div>
    </footer>
  );
};

export default FooterPages;
