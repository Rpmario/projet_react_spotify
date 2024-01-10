import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Sound.css';

const SoundList = () => {
  const [playlist, setPlaylist] = useState([]);

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
