import './App.css';
import { useState } from 'react';

const giorniSettimana = [
  'Lunedì',
  'Martedì',
  'Mercoledì',
  'Giovedì',
  'Venerdì',
  'Sabato',
  'Domenica',
];

function App() {
  const [attività, setAttività] = useState({});

  const handleChange = (giorno, testo) => {
    setAttività((prev) => ({
      ...prev,
      [giorno]: testo,
    }));
  };

  const handleAdd = (giorno) => {
    alert(`Hai aggiunto: "${attività[giorno]}" al giorno ${giorno}`);
    setAttività((prev) => ({
      ...prev,
      [giorno]: '',
    }));
  };

  return (
    <div className="app-container">
      <h1>Plan My Week</h1>
      <div className="giorni-container">
        {giorniSettimana.map((giorno) => (
          <div className="giorno" key={giorno}>
            <h2>{giorno}</h2>
            <input
              type="text"
              placeholder="Scrivi un'attività"
              value={attività[giorno] || ''}
              onChange={(e) => handleChange(giorno, e.target.value)}
            />
            <button onClick={() => handleAdd(giorno)}>Aggiungi +</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
