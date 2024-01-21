import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Sound.css';

const SoundArtist = () => {
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://ec2-15-188-52-96.eu-west-3.compute.amazonaws.com/api/artistes/', {
          params: {
            type: 'multi',
            offset: '0',
            limit: '10',
            numberOfTopResults: '5',
          },
        });

        setPlaylist(response.data);
        console.log('Artistes :', response);
      } catch (error) {
        console.error('Erreur lors de la requête API:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="sound-list">
      {playlist.map((artiste, index) => (
        <div className="sound-item" key={index}>
            <div className="song-info">
                <img
                className="spotify-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                alt="Spotify Icon"
                style={{ backgroundColor: artiste.iconColor }}
                />
                <img 
                  className='image_back' 
                  src='https://tse3.explicit.bing.net/th?id=OIP.27iCSOf--ZGhI1OhBENn6AHaGI&pid=Api&P=0&h=180'
                  alt="Album Cover" 
                  style={{ backgroundColor: 'green', width: '200%', height: '100%' }}
                />

            </div>
            <div className='details'>
              <p className="song-album">{artiste.name}</p>
            </div>
        </div>
      ))}
    </div>
  );
};

export default SoundArtist;
