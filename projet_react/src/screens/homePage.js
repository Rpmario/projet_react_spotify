import React from 'react';
import './styles/homePage.css';
import { FaChevronLeft, FaChevronRight,  } from 'react-icons/fa';
import { IoIosNotificationsOutline } from "react-icons/io";
import { LuArrowDownCircle } from "react-icons/lu";
import { SlUser } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';
import { setNavigateRef } from '../config/navigateRef';
import FooterPages from '../components/FooterPages';
import SoundList from '../components/SoundList';
import SoundArtist from '../components/SoundArtist';
import SoundAlbum from '../components/SoundAlbum';

const HomePage = () => {
  const navigate = useNavigate();
  setNavigateRef(navigate)
  return (
    <>
      <div className='container'>
        <div className='title'>
          <span className='navigation'>
            <FaChevronLeft className="chevron_g" onClick={() => navigate('/recherche')} />
            <FaChevronRight className="chevron_d" onClick={() => navigate('/recherche')} />
          </span>
          <span className='menu_buttons'>
            <span>
              <button>Découvrir Premium</button>
            </span>
            <span className='telecharger'>
              <LuArrowDownCircle className='download' />
              <button>Installer l'appli</button>
            </span>
            <IoIosNotificationsOutline className="notification" />
            <SlUser className="user_profil" />
          </span>
        </div>
        <div className='blocs'>
          <div className='sous_blocs'>
            <h2>Derniers Sons</h2>
            <SoundList />
            {/* <SoundArtist /> */}
          </div>
          <div className='sous_blocs'>
            <h2>Artistes</h2>
            <SoundArtist />
          </div>
          <div className='sous_blocs'>
            <h2>Albums</h2>
            <SoundAlbum />
          </div>
        </div>
        <FooterPages />
      </div>
    </>
  );
};

export default HomePage;
