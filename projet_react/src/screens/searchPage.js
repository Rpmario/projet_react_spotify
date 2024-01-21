import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './styles/searchPage.css';
import './styles/result.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { IoIosNotificationsOutline, IoIosSearch } from "react-icons/io";
import { LuArrowDownCircle } from "react-icons/lu";
import { SlUser } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';
import FooterPages from '../components/FooterPages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import Player from '../components/Player';



const SearchPage = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState('');
  const [audios, setAudios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const callRef = useRef(null);

  const [soundUrl, setSoundUrl] = useState('');

  const definedUrl = (url) => {
    setSoundUrl(url)
  }

  const handleFocus = () => {
    document.querySelector('.recherche').classList.add('active');
  };

  const handleBlur = () => {
    document.querySelector('.recherche').classList.remove('active');
  };

  useEffect(() => {
    if (input.length > 0) {
      setIsLoading(true);
      clearTimeout(callRef.current);
      callRef.current = setTimeout(() => {
        axios({
          method: 'GET',
          url: `http://ec2-15-188-52-96.eu-west-3.compute.amazonaws.com/api/audios/`,
        })
          .then(res => {
            setIsLoading(false);
            const filteredAudios = res.data.filter(audio => audio.title.toLowerCase().includes(input.toLowerCase()));
            setAudios(filteredAudios);
          })
          .catch(err => {
            setIsLoading(false);
            console.log(err);
          });
      }, 300);
    }
  }, [input]);

  return (
    <>
      <div className='container'>
        <div className='title'>
          <span className='navigation'>
            <FaChevronLeft className="chevron_g" onClick={() => navigate('/')} />
            <FaChevronRight className="chevron_d" onClick={() => navigate('/')} />
            <span className='recherche'>
              <IoIosSearch className='search_icon' />
              <input
                onChange={e => setInput(e.target.value)}
                value={input}
                type="text"
                placeholder="Que souhaitez-vous écouter ?"
                onFocus={() => handleFocus()}
                onBlur={() => handleBlur()}
              />
            </span>
          </span>
          <span className='menu_buttons'>
            <i className='bloc_telecharger'>
              <LuArrowDownCircle className='download' />
              <button>Installer l'appli</button>
            </i>
            <IoIosNotificationsOutline className="notification" />
            <SlUser className="user_profil" />
          </span>
        </div>
        <div className='blocs'>
          <h2>Résultats recherches</h2>

          <div className='resultats'>
            {isLoading ? <div className="spinner"></div> : null}
            {audios.map((audio, index) => (
              <div className="audio-item" key={index}>
                <div className="song-info">
                  <img
                    className="spotify-icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                    alt="Spotify Icon"
                    style={{ backgroundColor: '#FF5733' }}
                  />
                  <img 
                    className='image_back' 
                    // src={`http://ec2-15-188-52-96.eu-west-3.compute.amazonaws.com/api/albums/${song.album}${song.cover_url}`}
                    src='https://tse2.mm.bing.net/th?id=OIP.QbViIG0LQjtGeNTA2pRZBQAAAA&pid=Api&P=0&h=180'
                    alt="Album Cover" 
                  />
                  {/* <FontAwesomeIcon className='play-button' icon={Player.isPlaying ? faPause : faPlay} onClick={Player.onPlayPause} /> */}
                  <FontAwesomeIcon className='play-button' icon={Player.isPlaying ? faPause : faPlay} onClick={() => definedUrl(audio.urlAudio)} />
               </div>
                <div className='details'>
                  <p className="audio-title">{audio.title}</p>
                  <p className="artist-name">{audio.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='lecteur'>
          <Player soundUrl = {soundUrl} />
        </div>
        <FooterPages />
      </div>
    </>
  );
};

export default SearchPage;
