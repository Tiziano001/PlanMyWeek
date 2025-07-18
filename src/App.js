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

  useEffect(() => {
    const datiSalvati = localStorage.getItem('listaAttività');
    if (datiSalvati) {
      setListaAttività(JSON.parse(datiSalvati));
    }
  }, []);

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

    const nuovaAttività = { testo, completata: false };

    setListaAttività((prev) => ({
      ...prev,
      [giorno]: [...(prev[giorno] || []), nuovaAttività],
    }));

    setAttività((prev) => ({
      ...prev,
      [giorno]: '',
    }));
  };

  const toggleCompletata = (giorno, index) => {
    const nuove = [...listaAttività[giorno]];
    nuove[index].completata = !nuove[index].completata;
    setListaAttività((prev) => ({
      ...prev,
      [giorno]: nuove,
    }));
  };

  const eliminaAttività = (giorno, index) => {
    const nuove = [...listaAttività[giorno]];
    nuove.splice(index, 1);
    setListaAttività((prev) => ({
      ...prev,
      [giorno]: nuove,
    }));
  };

  const svuotaTutto = () => {
    if (window.confirm("Sei sicuro di voler cancellare tutte le attività?")) {
      setListaAttività({});
      localStorage.removeItem('listaAttività');
    }
  };

  return (
    <div className="app-container">
      <h1>Plan My Week</h1>
      <p className="legenda">
        <span>✅ = attività completata</span> &nbsp; | &nbsp;
        <span>❌ = elimina attività</span>
      </p>
      <button className="svuota-btn" onClick={svuotaTutto}>
        Svuota tutte le attività
      </button>
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
            <button onClick={() => handleAdd(giorno)}>Aggiungi</button>
            <ul>
              {(listaAttività[giorno] || []).map((item, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="checkbox"
                      checked={item.completata}
                      onChange={() => toggleCompletata(giorno, index)}
                    />
                    <span
                      style={{
                        textDecoration: item.completata ? 'line-through' : 'none',
                        marginLeft: '0.5rem',
                      }}
                    >
                      {item.testo}
                    </span>
                  </label>
                  <button
                    onClick={() => eliminaAttività(giorno, index)}
                    style={{ marginLeft: '0.5rem' }}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
