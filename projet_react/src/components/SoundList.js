import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Sound.css';
import Player from './Player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

const SoundList = () => {
  const [playlist, setPlaylist] = useState([]);
  const [soundUrl, setSoundUrl] = useState('');

  const definedUrl = (url) => {
    setSoundUrl(url);
    saveToLocalStorage(url);
  };

  const saveToLocalStorage = (url, title, albumName) => {
    const storedSongs = JSON.parse(localStorage.getItem('storedSongs')) || [];
    storedSongs.push({ url, title, albumName });
    localStorage.setItem('storedSongs', JSON.stringify(storedSongs));
  };

  const fetchAlbumDetails = async (albumId) => {
    try {
      const response = await axios.get(`http://ec2-15-188-52-96.eu-west-3.compute.amazonaws.com/api/albums/${albumId}`);
      return response.data.name;
    } catch (error) {
      console.error('Erreur lors de la requête API pour les détails de l\'album:', error);
      return 'Nom de l\'album non disponible';
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://ec2-15-188-52-96.eu-west-3.compute.amazonaws.com/api/audios/', {
          params: {
            type: 'multi',
            offset: '0',
            limit: '10',
            numberOfTopResults: '5',
          },
        });

        const playlistWithAlbumDetails = await Promise.all(
          response.data.map(async (song) => {
            const albumName = await fetchAlbumDetails(song.album);
            return { ...song, albumName };
          })
        );

        setPlaylist(playlistWithAlbumDetails);
        console.log('Ca marche !!! :', playlistWithAlbumDetails);
      } catch (error) {
        console.error('Erreur lors de la requête API:', error);
      }
    };

    fetchData();
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
              style={{ backgroundColor: '#FF5733' }}
            />
            <img 
              className='image_back' 
              src='https://tse2.mm.bing.net/th?id=OIP.QbViIG0LQjtGeNTA2pRZBQAAAA&pid=Api&P=0&h=180'
              alt="Album Cover" 
            />
            <FontAwesomeIcon className='play-button' icon={faPlay} onClick={() => definedUrl(song.urlAudio, song.title, song.albumName)} />
          </div>
          <div className='details'>
            {/* <p className="song-album">{song.albumName}</p> */}
            <p className="song-album">{song.title}</p>
            {/* <p className="artist-name">{song.artist}</p> */}
          </div>
        </div>
      ))}
      <div className='lecteur'>
        <Player soundUrl={soundUrl} />
      </div>
    </div>
  );
};

export default SoundList;
