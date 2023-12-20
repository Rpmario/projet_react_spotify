import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightAndDownLeftFromCenter, faDownLeftAndUpRightToCenter } from '@fortawesome/free-solid-svg-icons';
import './styles/Fullscreen.css';

const Fullscreen = ({ isFullScreen, onToggleFullscreen }) => (
  <div className={`fullscreen ${isFullScreen ? 'active' : ''}`} onClick={onToggleFullscreen}>
    <FontAwesomeIcon icon={isFullScreen ? faDownLeftAndUpRightToCenter : faUpRightAndDownLeftFromCenter} />
  </div>
);

export default Fullscreen;
