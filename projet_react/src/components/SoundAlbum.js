import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Sound.css';

const SoundAlbum = () => {
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://ec2-15-188-52-96.eu-west-3.compute.amazonaws.com/api/albums/', {
          params: {
            type: 'multi',
            offset: '0',
            limit: '10',
            numberOfTopResults: '5',
          },
        });

        setPlaylist(response.data);
        console.log('Albums :', response);
      } catch (error) {
        console.error('Erreur lors de la requête API:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="sound-list">
      {playlist.map((album, index) => (
        <div className="sound-item" key={index}>
            <div className="song-info">
                <img
                className="spotify-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                alt="Spotify Icon"
                style={{ backgroundColor: album.iconColor }}
                />
                <img 
                  className='image_back' 
                  // src={`http://ec2-15-188-52-96.eu-west-3.compute.amazonaws.com${album.cover_url}`} 
                  src='https://tse1.mm.bing.net/th?id=OIP.PUqzkyjtg3G5Gg3Tw0E1QQHaE8&pid=Api&P=0&h=180'
                  alt="Album Cover" 
                />

            </div>
            <div className='details'>
              <p className="song-album">{album.title}</p>
            </div>
        </div>
      ))}
    </div>
  );
};

export default SoundAlbum;
