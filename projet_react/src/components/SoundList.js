import React from 'react';
import './styles/Sound.css';

const SoundList = ({ onSongClick, playlist }) => {
  return (
    <div className="sound-list">
      {playlist.map((song, index) => (
        <div className="sound-item" key={index} onClick={() => onSongClick(index)}>
          <div className="song-info">
            <img
              className="spotify-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
              alt="Spotify Icon"
              style={{ backgroundColor: '#FF5733' }}
            />
            <img className='image_back' src={song.imageUrl} alt="Album Cover" />
            <button className="play-button">Play</button>
          </div>
          <div className='details'>
            <p className="song-album">{song.albumName}</p>
            <p className="artist-name">{song.artistName}</p>
          </div>
          <div className='data_response'>
            <p><strong>Artiste:</strong> {song.artist}</p>
            <p><strong>URL de l'audio:</strong> <a href={song.urlAudio} target="_blank" rel="noopener noreferrer">{song.urlAudio}</a></p>
            <p><strong>Album:</strong> {song.albumName}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SoundList;
