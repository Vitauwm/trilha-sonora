import React from 'react';
import './PowerTrait.css';

const PowerTrait = ({ url, height = '200px' }) => {
  return (
    <div className="power-trait" style={{ height }}>
      <iframe 
        src={url} 
        title="Power Trait"
      >
        Este navegador não suporta iframes.
      </iframe>
    </div>
  );
};

export default PowerTrait;
