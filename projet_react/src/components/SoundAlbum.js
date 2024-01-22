import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Sound.css';
import './styles/details.css';

const SoundAlbum = () => {
  const [playlist, setPlaylist] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

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
      } catch (error) {
        console.error('Erreur lors de la requête API:', error);
      }
    };

    fetchData();
  }, []);

  const handleAlbumClick = (album) => {
    setSelectedAlbum(album);
  };

  return (
    <div className="sound-container">
      <div className="sound-list">
        {playlist.map((album, index) => (
          <div className="sound-item" key={index} onClick={() => handleAlbumClick(album)}>
            <div className="song-info">
              <img
                className="spotify-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                alt="Spotify Icon"
                style={{ backgroundColor: album.iconColor }}
              />
              <img
                className='image_back'
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
      {selectedAlbum && (
        <div className="audio-cards">
          <h2>{selectedAlbum.title}</h2>
          <div className="audio-list">
            {selectedAlbum.audios.map((audio, index) => (
              <div className="audio-card" key={index}>
                <p>{audio}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SoundAlbum;
