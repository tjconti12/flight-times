import { useState } from 'react';
import { IFlight } from './models/models';
import './App.css';
import FlightSearch from './components/FlightSearch/FlightSearch';

function App() {
  const [foundFlights, setFoundFlights] = useState<IFlight[] | []>([]);

  return (
    <div>
      <h1>Flight Times</h1>
      <FlightSearch setFoundFlights={setFoundFlights}/>
    </div>
  );
}

export default App;
