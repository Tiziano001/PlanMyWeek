import './App.css';
import { useState, useEffect } from 'react';

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
  const [listaAttività, setListaAttività] = useState({});

  // Carica le attività da LocalStorage al primo caricamento
  useEffect(() => {
    const datiSalvati = localStorage.getItem('listaAttività');
    if (datiSalvati) {
      setListaAttività(JSON.parse(datiSalvati));
    }
  }, []);

  // Salva ogni volta che listaAttività cambia
  useEffect(() => {
    localStorage.setItem('listaAttività', JSON.stringify(listaAttività));
  }, [listaAttività]);

  const handleChange = (giorno, testo) => {
    setAttività((prev) => ({
      ...prev,
      [giorno]: testo,
    }));
  };

  const handleAdd = (giorno) => {
    const testo = attività[giorno]?.trim();
    if (!testo) return;

    setListaAttività((prev) => ({
      ...prev,
      [giorno]: [...(prev[giorno] || []), testo],
    }));

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
            <ul>
              {(listaAttività[giorno] || []).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
