import React from 'react';

const Track = ({ track, onSelect }) => {
  return (
    <div className="track-item" onClick={onSelect}>
      <p>{track.title}</p>
      <p>{track.artist}</p>
    </div>
  );
};

export default Track;
