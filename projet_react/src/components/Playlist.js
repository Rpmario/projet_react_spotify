import React from 'react';
import Track from './Track';

const Playlist = ({ tracks, onTrackSelect }) => {
  return (
    <div className="playlist-container">
      <h2>Playlist</h2>
      <ul>
        {tracks.map((track, index) => (
          <li key={index}>
            <Track track={track} onSelect={() => onTrackSelect(index)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
