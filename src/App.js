// App.js
import React from 'react';
import Player from './components/Player';
import NarratorMode from './components/NarratorMode';
import PowerTrait from './components/PowerTrait';
import './App.css';
import BluetoothController from "./components/BluetoothController";
const App = () => {
  return (
    <div className="app">
      <header>
        <h1>Controlador de Trilhas Sonoras - Ordem Paranormal</h1>
      </header>

      <main>
        {/* PDF e Player/Narrator Side-by-Side */}
        <div className="main-content">
          <iframe 
            src="https://drive.google.com/file/d/1fdHRF0T3bVdQzos51woH201E4FOXXB0M/preview" 
            width="100%" 
            height="940px" 
            title="Visualizador de PDF"
            className="pdf-viewer"
          >
            Este navegador não suporta iframes.
          </iframe>

          <div className="player-narrator-container">
              <Player />
            <NarratorMode />
          </div>
        </div>
        
        <BluetoothController />

        {/* PowerTraits Section */}
        <div className="power-traits-container">
          <PowerTrait url="https://crisordemparanormal.com/agente/stream/0ac8Vn9XBdqnsBjbjQrJ" />
          <PowerTrait url="https://crisordemparanormal.com/agente/stream/oQl6FTmot7xyng49IEM5" />
          <PowerTrait url="https://crisordemparanormal.com/agente/stream/9mLr7h5W3delcc8iVFqt" />
        </div>
       
      </main>

      <footer>
        <p>Feito para sessões de RPG Ordem Paranormal</p>
      </footer>
    </div>
  );
};

export default App;