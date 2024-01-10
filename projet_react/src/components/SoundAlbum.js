import React, { useState, useEffect } from 'react';
import './styles/Sound.css';

const SoundList = () => {
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const randomSongs = [
      { album: 'album 1', title: 'Song 1', artist: 'Artist 1', iconColor: '#FF5733' },
      { album: 'album 2', title: 'Song 2', artist: 'Artist 2', iconColor: '#33FF57' },
      { album: 'album 3', title: 'Song 3', artist: 'Artist 3', iconColor: '#FF5733' },
      { album: 'album 4', title: 'Song 4', artist: 'Artist 4', iconColor: '#33FF57' },
      { album: 'album 5', title: 'Song 5', artist: 'Artist 5', iconColor: '#FF5733' },
      { album: 'album 6', title: 'Song 6', artist: 'Artist 6', iconColor: '#33FF57' },
      { album: 'album 7', title: 'Song 7', artist: 'Artist 7', iconColor: '#FF5733' },
      { album: 'album 8', title: 'Song 8', artist: 'Artist 8', iconColor: '#33FF57' },
      { album: 'album 9', title: 'Song 9', artist: 'Artist 9', iconColor: '#FF5733' },
      { album: 'album 10', title: 'Song 10', artist: 'Artist 10', iconColor: '#33FF57' },
      { album: 'album 11', title: 'Song 11', artist: 'Artist 11', iconColor: '#33FF57' },
    ];

    const selectedSongs = randomSongs.slice(0, 10);

    setPlaylist(selectedSongs);
  }, []);

  return (
    <div className="sound-list">
      {playlist.map((song, index) => (
        <div className="sound-item" key={index}>
            <div className="song-info">
                <img
                className="spotify-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                alt="Spotify Icon"
                style={{ backgroundColor: song.iconColor }}
                />
                <img className='image_back' src='https://tse1.mm.bing.net/th?id=OIP.MpptNkZg8tNIwrfcthRj2QHaDt&pid=Api&P=0&h=180' />
                <button className="play-button">Play</button>
            </div>
            <div className='details'>
              <p className="song-album">{song.album}</p>
              <p className="artist-name">{song.artist}</p>
              <p className="song-title">{song.title}</p>
            </div>
        </div>
      ))}
    </div>
  );
};

export default SoundList;
