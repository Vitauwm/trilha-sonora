
// components/ThemeSwitcher.js
import React from 'react';

const ThemeSwitcher = ({ theme, toggleTheme }) => {
  return (
    <div className="theme-switcher">
      <button onClick={toggleTheme}>
        Mudar para tema {theme === 'dark' ? 'claro' : 'escuro'}
      </button>
    </div>
  );
};

export default ThemeSwitcher;
