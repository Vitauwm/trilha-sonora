import React, { useState, useRef, useEffect } from 'react';
import aguacaindo from './SonsNarracao/aguacaindo.mp3';
import chuvacalma from './SonsNarracao/chuvacalma.mp3';
import chuvaforte from './SonsNarracao/chuvaforte.mp3';
import coracaobatidas from './SonsNarracao/coracaobatidas.mp3';
import eletricidade from './SonsNarracao/eletricidade.mp3';
import respiracaofunda from './SonsNarracao/respiracaofunda.mp3';
import vultoassustado from './SonsNarracao/vultoassustado.mp3';
import './narrator-mode.css';

const NarratorMode = () => {
  const [audioFiles, setAudioFiles] = useState([
    { name: 'Aguaceiro', file: aguacaindo },
    { name: 'Chuva Calma', file: chuvacalma },
    { name: 'Chuva Forte', file: chuvaforte },
    { name: 'Batidas do Coração', file: coracaobatidas },
    { name: 'Eletricidade', file: eletricidade },
    { name: 'Respiração Profunda', file: respiracaofunda },
    { name: 'Vulto Assustado', file: vultoassustado },
  ]);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const handleStop = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const handleVolumeChange = (volume) => {
    audioRef.current.volume = volume / 100;
  };

  const handleProgressChange = (value) => {
    audioRef.current.currentTime = value;
  };

  const handleSelectTrack = (index) => {
    setCurrentTrack(index);
    audioRef.current.load();
    audioRef.current.play();
  };

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, []);

  return (
    <div className="narrator-mode-container">
      <h2>Modo Narrador</h2>
      <div className="player-layout">
        {/* Lista de Áudios */}
        <div className="audio-list">
          <h3>Lista de Sons</h3>
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
          <audio ref={audioRef}>
            <source src={audioFiles[currentTrack].file} type="audio/mp3" />
            Seu navegador não suporta áudio.
          </audio>
          <div className="controls">
            <button className="control-btn" onClick={() => handleSelectTrack((currentTrack - 1 + audioFiles.length) % audioFiles.length)}>
              ⏮️
            </button>
            <button className="control-btn play-pause" onClick={handlePlayPause}>
              ▶️ / ⏸️
            </button>
            <button className="control-btn" onClick={() => handleSelectTrack((currentTrack + 1) % audioFiles.length)}>
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

export default NarratorMode;
