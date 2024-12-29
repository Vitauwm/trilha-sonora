import React, { useState, useRef } from 'react';
import './Player.css';

const Player = () => {
  const [audioFiles, setAudioFiles] = useState([
    { name: 'Luta contra o Anárquico', file: '/audio/lutacontraoanarquico.mp3' },
    { name: 'Fundo de Suspense', file: '/audio/FundodeSuspense.mp3' },
    { name: 'Investigação', file: '/audio/investigação.mp3' },
    { name: 'Produção Anfitrião', file: '/audio/Produção-Anfitrião.mp3' },
    { name: 'Ciborgue - Cordado Antes da Hora', file: '/audio/Ciborgue-cordadoantesdahora.mp3' },
    { name: 'Luta contra o Ciborgue', file: '/audio/lutacontraociborgue.mp3' },
  ]);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  const handleVolumeChange = (volume) => {
    audioRef.current.volume = volume / 100;
  };

  const handleProgressChange = (value) => {
    audioRef.current.currentTime = value;
  };

  const handleSelectTrack = (index) => {
    setCurrentTrack(index);
    setIsPlaying(true);
    audioRef.current.load();
    audioRef.current.play();
  };

  return (
    <div className="player-container">
      <h2>Player de Áudios</h2>
      <div className="player-layout">
        {/* Lista de Áudios */}
        <div className="audio-list">
          <h3>Lista de Áudios</h3>
          <ul>
            {audioFiles.map((audio, index) => (
              <li
                key={index}
                className={currentTrack === index ? 'active' : ''}
                onClick={() => handleSelectTrack(index)}
              >
                {audio.name}
              </li>
            ))}
          </ul>
        </div>
        {/* Player Principal */}
        <div className="player">
          <div className="track-info">
            <h3>{audioFiles[currentTrack].name}</h3>
          </div>
          <audio ref={audioRef} loop>
            <source src={audioFiles[currentTrack].file} type="audio/mp3" />
            Seu navegador não suporta áudio.
          </audio>
          <div className="controls">
            <button
              className="control-btn"
              onClick={() => handleSelectTrack((currentTrack - 1 + audioFiles.length) % audioFiles.length)}
            >
              ⏮️
            </button>
            <button className="control-btn play-pause" onClick={handlePlayPause}>
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            <button
              className="control-btn"
              onClick={() => handleSelectTrack((currentTrack + 1) % audioFiles.length)}
            >
              ⏭️
            </button>
            <button className="control-btn stop" onClick={handleStop}>
              ⏹️
            </button>
          </div>
          <div className="progress">
            <input
              type="range"
              min="0"
              max={audioRef.current?.duration || 0}
              value={audioRef.current?.currentTime || 0}
              onChange={(e) => handleProgressChange(e.target.value)}
            />
          </div>
          <div className="volume">
            <label>
              🔊
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="50"
                onChange={(e) => handleVolumeChange(e.target.value)}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
