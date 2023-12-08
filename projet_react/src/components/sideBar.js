import React from 'react';
import './styles/sideBar.css';
import { navigateRef } from '../config/navigateRef';
import logo from '../assets/images/Spotify_Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome, faGlobe, faBookBookmark, faMusic } from '@fortawesome/free-solid-svg-icons';



const SideBar = () => {

    const handleNavigation = (path) => {
      if (navigateRef){
        navigateRef(path)
      }
    }

  return (
    <>
      <div className='test'>
        <div className='bloc-1'>
          <img src={logo} alt='logo' className='logo' />
          <button onClick={() => handleNavigation('/')}>
            <FontAwesomeIcon icon={faHome}/>
            <span>Accueil</span>
          </button>
          <button onClick={() => handleNavigation('/recherche')}>
            <FontAwesomeIcon icon={faSearch}/>
            <span>Rechercher</span>
          </button>
        </div>
        <div className='bloc-2'>
          <div className='sous_bloc-1'>
            <div className='bibliotheque'>
              <button>
                <FontAwesomeIcon icon={faBookBookmark}/>
                <span>Bibliothèque</span>
              </button>
              <button>+</button>
            </div>
            <div className='sub_biblio'>
              <p>Créez votre première playlist</p>
              <span>C'est simple, nous allons vous aider</span>
              <button>Créer une playlist</button>
            </div>
            <div className='sub_biblio'>
              <p>Cherchons quelques podcasts auxquels vous abonner</p>
              <span>Nous vous transmettrons des informations sur les nouveaux épisodes</span>
              <button>Parcourir les podcasts</button>
            </div>
          </div>
          <div className='sous_bloc-2'>
            <ul>
              <li>Légal</li>
              <li>Centre de confidentialité</li>
              <li>Protection des données</li>
              <li>Paramètres des cookies</li>
              <li>A propos des pubs</li>
              <li>Accessibilité</li>
              <li>Cookies</li>
            </ul>
            <button>
              <FontAwesomeIcon icon={faGlobe}/>
              <span>Français</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar 