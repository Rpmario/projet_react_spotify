import React from 'react';
import {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import './styles/searchPage.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { IoIosNotificationsOutline, IoIosSearch } from "react-icons/io";
import { LuArrowDownCircle } from "react-icons/lu";
import { SlUser } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';
import FooterPages from '../components/FooterPages';

const SearchPage = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const callRef = useRef(null);

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
          url: `https://api.muslimin-play.com/artists?name_contains=${input}`,
        })
          .then(res => {
            setIsLoading(false);
            console.log(res.data);
            setData(res.data);
          })
          .catch(err => {
            setIsLoading(false);
            console.log(err);
          });
      }, 300);
    }
  }, [input]);

    return <>
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

        <div>
          <div
            style={{
              marginTop: 12,
              width: '100%',
              minHeight: 200,
              backgroundColor: 'green',
              display: input.length > 0 ? 'flex' : 'none',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',

              borderRadius: 24,
            }}>
            {isLoading ? <div className="spinner"></div> : null}
            {data
              .map((item, index) => (
                <div
                  key={index}
                  style={{
                    width: '100%',
                    height: 40,
                    backgroundColor: 'white',
                    borderRadius: 12,
                    marginBottom: 12,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {item.name}
                </div>
              ))
              .slice(0, 5)}
          </div>
        </div>

      </div>
      <FooterPages />
    </div>
  </>
  };
  
  export default SearchPage;