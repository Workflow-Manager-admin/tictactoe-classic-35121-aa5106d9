import React from 'react';
import './App.css';
import TicTacToeClassic from './TicTacToeClassic';

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <button className="btn">Template Button</button>
          </div>
        </div>
      </nav>

      <main>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh', paddingTop: 120 }}>
          <TicTacToeClassic />
        </div>
      </main>
    </div>
  );
}

export default App;