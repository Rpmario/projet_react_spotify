import React, { useState } from 'react';
import Player from './Player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const LocalStorageSoundList = () => {
    const storedSongs = JSON.parse(localStorage.getItem('storedSongs')) || [];
    const [soundUrl, setSoundUrl] = useState('');

    const definedUrl = (url) => {
        setSoundUrl(url)
      }

  return (
    <div className="sound-list">
      {storedSongs.map((song, index) => (
        <div className="sound-item" key={index}>
          <div className="song-info">
            <img
              className="spotify-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
              alt="Spotify Icon"
              style={{ backgroundColor: '#FF5733' }}
            />
            <img
              className='image_back'
              src='https://tse2.mm.bing.net/th?id=OIP.QbViIG0LQjtGeNTA2pRZBQAAAA&pid=Api&P=0&h=180'
              alt="Album Cover"
            />
            <FontAwesomeIcon className='play-button' icon={faPlay} onClick={() => definedUrl(song.url)} />
          </div>
          <div className='details'>
            <p className="song-album">Album: {song.albumName}</p>
            <p className="song-title">Titre: {song.title}</p>
          </div>
        </div>
      ))}
      <div className='lecteur'>
        <Player soundUrl={soundUrl} />
      </div>
    </div>
  );
};

export default LocalStorageSoundList;
