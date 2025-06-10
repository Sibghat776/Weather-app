import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import CountryCard from './Components/CountryCard';
import WeatherCard from './Components/WeatherCard';
import { Link, Route, Routes } from 'react-router-dom';

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
        <Link to="/country">

          <button path="/country">Country</button>
        </Link>
        {/* <Link to={<WeatherCard capital={capital} />}>

          <button path="/weather">Weather</button>
        </Link> */}
        <Routes>
          <Route path="/country" element={<CountryCard setCapital={setCapital} capital={capital} />} />
          <Route path="/weather" element={<WeatherCard capital={capital} />} />
        </Routes>
        {/* <CountryCard setCapital={setCapital} capital={capital} /> */}

      </div>
    </>
  );
}

export default App;
