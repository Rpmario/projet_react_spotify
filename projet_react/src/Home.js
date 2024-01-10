import React, { useEffect, useState } from 'react';
import MusicApiService from './services/api';

const Home = () => {
  const [latestTracks, setLatestTracks] = useState([]);
  const [latestArtists, setLatestArtists] = useState([]);
  const [latestAlbums, setLatestAlbums] = useState([]);

  useEffect(() => {
    const musicApiService = new MusicApiService('https://example-music-api.com'); // Remplacez cela par l'URL réelle de votre API

    // Charger les dernières pistes
    musicApiService.getLatestTracks()
      .then(data => setLatestTracks(data))
      .catch(error => console.error(error));

    // Charger les derniers artistes
    musicApiService.getLatestArtists()
      .then(data => setLatestArtists(data))
      .catch(error => console.error(error));

    // Charger les derniers albums
    musicApiService.getLatestAlbums()
      .then(data => setLatestAlbums(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Derniers Sons</h2>
      <ul>
        {latestTracks.map(track => (
          <li key={track.id}>{track.title}</li>
        ))}
      </ul>

      <h2>Derniers Artistes</h2>
      <ul>
        {latestArtists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>

      <h2>Derniers Albums</h2>
      <ul>
        {latestAlbums.map(album => (
          <li key={album.id}>{album.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
