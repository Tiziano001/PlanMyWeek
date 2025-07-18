import './App.css';

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
  return (
    <div className="app-container">
      <h1>Plan My Week</h1>
      <div className="giorni-container">
        {giorniSettimana.map((giorno) => (
          <div className="giorno" key={giorno}>
            <h2>{giorno}</h2>
            {/* Qui andranno le attività */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
