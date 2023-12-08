import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeUp, faVolumeMute, faStepBackward, faStepForward, faRandom, faRedo } from '@fortawesome/free-solid-svg-icons';
import { Howl } from 'howler';

const Player = ({ tracks }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const track = tracks[currentTrackIndex];

  useEffect(() => {
    const sound = new Howl({
      src: [track.url],
      volume: isMuted ? 0 : volume,
      onplay: () => {
        setIsPlaying(true);
      },
      onpause: () => {
        setIsPlaying(false);
      },
      onend: () => {
        // Gérer la fin de la piste (par exemple, passer à la suivante)
        handleSkipForward();
      },
    });

    audioRef.current = sound;

    return () => {
      // Nettoyer la ressource audio lors du démontage du composant
      sound.unload();
    };
  }, [currentTrackIndex, isMuted, volume, track]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const handleSkipBackward = () => {
    // Gérer le passage à la piste précédente
    setCurrentTrackIndex((prevIndex) => (prevIndex === 0 ? tracks.length - 1 : prevIndex - 1));
  };

  const handleSkipForward = () => {
    // Gérer le passage à la piste suivante
    setCurrentTrackIndex((prevIndex) => (prevIndex === tracks.length - 1 ? 0 : prevIndex + 1));
  };

  const handleRandom = () => {
    // Gérer la lecture aléatoire des pistes
    const randomIndex = Math.floor(Math.random() * tracks.length);
    setCurrentTrackIndex(randomIndex);
  };

  const handleRepeat = () => {
    // Gérer la répétition de la playlist
    audioRef.current.loop(true);
  };

  const handleRepeatOne = () => {
    // Gérer la répétition d'une seule piste
    audioRef.current.loop(!audioRef.current.loop());
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    audioRef.current.volume(newVolume);
  };

  const handleMute = () => {
    setIsMuted((prevMuted) => !prevMuted);
    audioRef.current.mute(!isMuted);
  };

  const handleProgressChange = (event) => {
    const newProgress = parseFloat(event.target.value);
    setProgress(newProgress);
    audioRef.current.seek(audioRef.current.duration() * (newProgress / 100));
  };

  return (
    <div className="player-container">
      {/* Affichage des informations sur la piste */}
      <div className="track-info">
        <p>{track.title}</p>
        <p>{track.artist}</p>
      </div>

      {/* Contrôles du lecteur */}
      <div className="player-controls">
        <FontAwesomeIcon icon={faRandom} onClick={handleRandom} />
        <FontAwesomeIcon icon={faStepBackward} onClick={handleSkipBackward} />
        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} onClick={handlePlayPause} />
        <FontAwesomeIcon icon={faStepForward} onClick={handleSkipForward} />
        <FontAwesomeIcon icon={faRedo} onClick={handleRepeat} />
        <FontAwesomeIcon icon={faRedo} onClick={handleRepeatOne} />
        <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} onClick={handleMute} />
        <input type="range" min={0} max={100} value={progress} onChange={handleProgressChange} />
        <input type="range" min={0} max={1} step={0.1} value={volume} onChange={handleVolumeChange} />
      </div>
    </div>
  );
};

export default Player;
