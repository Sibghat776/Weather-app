import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import CountryCard from './Components/CountryCard';
import WeatherCard from './Components/WeatherCard';
import { Link, NavLink, Route, Routes } from 'react-router-dom';

function App() {

  const [capital, setCapital] = useState("")
  return (
    <>
      <div style={{
        display: "flex",
        gap: "1rem",
        justifyContent: "center",
        flexWrap: "wrap",
        flexDirection: 'column'
      }}>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: 'center',
          gap: "2rem",
        }}>
          <NavLink to="/country" className={({ isActive }) => ""}>
            {({ isActive }) => (
              <button path="/country" className={ isActive ? "active" : "button"}>Country</button>
            )}
          </NavLink>
          <NavLink className={({ isActive }) => ""} to="/weather">
            {({ isActive }) => (
              <button className={isActive ? "active" : "button"} path="/weather">Weather</button>
            )}
          </NavLink>
        </div>
        <Routes>
          <Route path="/country" element={<CountryCard setCapital={setCapital} />} />
          <Route path="/weather" element={<WeatherCard capital={capital} />} />
        </Routes>
        {/* <CountryCard setCapital={setCapital} capital={capital} /> */}

      </div>
    </>
  );
}

export default App;
