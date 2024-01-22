import React, { useState, useRef, useEffect } from 'react';
import './styles/player.css';
import Like from './like.jsx';
import Fullscreen from './FullScreen.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faVolumeUp,
  faVolumeMute,
  faStepBackward,
  faStepForward,
  faRandom,
  faRotateRight,
  faRotate,
} from '@fortawesome/free-solid-svg-icons';
import { LuRepeat, LuRepeat1 } from 'react-icons/lu';
import { PiMicrophoneStageDuotone } from 'react-icons/pi';
import { Howl } from 'howler';
import song1 from '../assets/musics/song1.mp3';
import song2 from '../assets/musics/song2.mp3';
import song3 from '../assets/musics/song3.mp3';
import song4 from '../assets/musics/song4.mp3';
import image from '../assets/images/image.jpeg';

const playListData = [song1, song2, song3, song4];

const PlayerControls1 = ({
  soundUrl,
  isPlaying,
  onRandom,
  onSkipBackward,
  onPlayPause,
  onSkipForward,
  onRepeatOne,
  isRepeatOne,
  onRepeatAll,
  isRepeatAll,
  progress,
  onProgressChange,
  formatTime,
  audioRef,
  elapsedTime,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  // const handleVolumeClick = (event) => {
  //   updateVolume(event);
  // };

  const handleVolumeDragStart = () => {
    setIsDragging(true);
  };

  const handleVolumeDragEnd = () => {
    setIsDragging(false);
  };

  const handleVolumeDrag = (event) => {
    if (isDragging) {
      updateVolume(event);
    }
  };

  const updateVolume = (event) => {
    const boundingRect = event.target.getBoundingClientRect();
    const clickX = event.clientX - boundingRect.left;
    const barWidth = boundingRect.width;
    const newVolume = clickX / barWidth;

    audioRef.current.volume(newVolume);
  };

  return (
    <div className="player-controls1">
      <p className="icones">
        <PiMicrophoneStageDuotone className="microphone" />
        <FontAwesomeIcon icon={faRandom} onClick={onRandom} />
        <FontAwesomeIcon icon={faStepBackward} onClick={onSkipBackward} />
        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} onClick={onPlayPause} />
        <FontAwesomeIcon icon={faStepForward} onClick={onSkipForward} />
        {isRepeatOne ? (
          <LuRepeat1 className="fa-repeat-1" onClick={onRepeatOne} />
        ) : (
          <LuRepeat className="fa-repeat" onClick={onRepeatOne} />
        )}
        <FontAwesomeIcon icon={isRepeatAll ? faRotate : faRotateRight} onClick={onRepeatAll} />
      </p>
      <p className="piste">
        <span>{formatTime(elapsedTime)}</span>
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={onProgressChange}
          onMouseDown={handleVolumeDragStart}
          onMouseMove={handleVolumeDrag}
          onMouseUp={handleVolumeDragEnd}
          onMouseLeave={handleVolumeDragEnd}
        />
        <span>{formatTime(audioRef.current ? audioRef.current.duration() : 0)}</span>
      </p>
    </div>
  );
};

const PlayerControls2 = ({ isMuted, onMute, onVolumeChange, onVolumeClick, volume }) => (
  <div className="player-controls2">
    <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} onClick={onMute} />
    <input
      type="range"
      min={0}
      max={100}
      step={2}
      value={volume}
      onChange={onVolumeChange}
      onClick={onVolumeClick}
    />
  </div>
);

export const Player = ({soundUrl}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [playList, setPlayList] = useState(playListData);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeatOne, setIsRepeatOne] = useState(false);
  const [isRepeatAll, setIsRepeatAll] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(50);
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const audioRef = useRef(null);
  let animationFrameId;

  const handleToggleFullscreen = () => {
    const playerContainer = document.querySelector('.player-container');

    if (!document.fullscreenElement) {
      playerContainer.requestFullscreen();
    } else {
      document.exitFullscreen();
    }

    setIsFullScreen(!isFullScreen);
  };

  const track = playList[currentTrackIndex];

  useEffect(() => {
    const sound = new Howl({
      src: [soundUrl],
      volume: isMuted ? 0 : volume,
      onload: () => {
        if (isPlaying) {
          audioRef.current.play();
        }
      },
      onplay: () => {
        setIsPlaying(true);
        animateProgress();
      },
      onpause: () => {
        setIsPlaying(false);
        cancelAnimationFrame(animationFrameId);
      },
      onend: () => {
        if (isRepeatOne) {
          setCurrentTrackIndex(currentTrackIndex);
          audioRef.current.play();
        }
        if (isRepeatAll) {
          handleSkipForward();
        } else {
          setIsPlaying(false);
          cancelAnimationFrame(animationFrameId);
        }
      },
    });

    audioRef.current = sound;

    return () => {
      sound.unload();
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentTrackIndex, track, soundUrl]);

  const animateProgress = () => {
    const update = () => {
      const newElapsedTime = audioRef.current.seek();
      setElapsedTime(newElapsedTime);
      setProgress((newElapsedTime / audioRef.current.duration()) * 100);

      animationFrameId = requestAnimationFrame(update);
    };

    update();
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const handleSkipBackward = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex === 0 ? playList.length - 1 : prevIndex - 1));
    if (!isPlaying) {
      audioRef.current.play();
    }
  };

  const handleSkipForward = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex === playList.length - 1 ? 0 : prevIndex + 1));
    if (!isPlaying) {
      audioRef.current.play();
    }
  };

  const handleRandom = () => {
    const shuffledPlaylist = [...playList];
    for (let i = shuffledPlaylist.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPlaylist[i], shuffledPlaylist[j]] = [shuffledPlaylist[j], shuffledPlaylist[i]];
    }
    setPlayList(shuffledPlaylist);
    setCurrentTrackIndex(0);
  };

  const handleRepeatAll = () => {
    setIsRepeatAll((prevRepeatAll) => !prevRepeatAll);
    audioRef.current.loop(true);
  };

  const handleRepeatOne = () => {
    setIsRepeatOne((prevRepeatOne) => !prevRepeatOne);
    audioRef.current.loop(!audioRef.current.loop());
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
  };

  const handleVolumeClick = (event) => {
    const boundingRect = event.target.getBoundingClientRect();
    const clickX = event.clientX - boundingRect.left;
    const barWidth = boundingRect.width;
    const newVolume = clickX / barWidth;

    setVolume(newVolume * 100);
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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    return formattedTime;
  };

  return (
    <div className={`player-container ${isFullScreen ? 'fullscreen-mode' : ''}`}>
      <div className="track-info">
        <img src={image} alt="Imagee" />
        <p className="titre_artiste">Titre de la musique - Nom artiste test longueu</p>
        <Like />
      </div>

      <PlayerControls1
        isPlaying={isPlaying}
        onRandom={handleRandom}
        onSkipBackward={handleSkipBackward}
        onPlayPause={handlePlayPause}
        onSkipForward={handleSkipForward}
        onRepeatOne={handleRepeatOne}
        isRepeatOne={isRepeatOne}
        onRepeatAll={handleRepeatAll}
        progress={progress}
        onProgressChange={handleProgressChange}
        elapsedTime={elapsedTime}
        audioRef={audioRef}
        formatTime={formatTime}
        isRepeatAll={isRepeatAll}
      />

      <PlayerControls2
        isMuted={isMuted}
        onMute={handleMute}
        onVolumeChange={handleVolumeChange}
        onVolumeClick={handleVolumeClick}
        volume={volume}
        isPlaying={isPlaying}
        progress={progress}
        onProgressChange={handleProgressChange}
        isFullScreen={isFullScreen}
      />

      <Fullscreen isFullScreen={isFullScreen} onToggleFullscreen={handleToggleFullscreen} />
    </div>
  );
};

export default Player;