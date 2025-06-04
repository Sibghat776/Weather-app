import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import CountryCard from './Components/CountryCard';
import WeatherCard from './Components/WeatherCard';

function App() {
  
    const [capital, setCapital] = useState("")
  return (
    <>
      <div style={{
        display: "flex",
        gap: "100px",
        justifyContent: "center",
        flexWrap: "wrap"
      }}>
        <CountryCard setCapital={setCapital} capital={capital}/>
        <WeatherCard capital={capital}/>
      </div>
    </>
  );
}

export default App;
