import axios from 'axios'
import React, { useEffect, useState } from 'react'

function CountryCard({ setCapital, capital }) {
    const [countryName, setCountryName] = useState("")
    const [countryApiRes, setCountryApiRes] = useState(null)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const countryData = async () => {
        if (countryName.trim() === "") {
            setError("Please enter a country name.")
            setCountryApiRes(null)
            return
        }

        setLoading(true)
        setError("")
        try {
            const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`)
            setCountryApiRes(response.data)
            setCapital(response.data[0]?.capital?.[0])

        } catch (err) {
            setCountryApiRes(null)
            setError("Country not found or API error.")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (capital) {
            console.log(capital)
        }
    }, [capital])

    return (
        <div className="card">
            <h1>Country Info Finder 🌍</h1>

            <div className="input-section">
                <form style={{
                    display: "flex"
                }} onSubmit={(e) => {
                    e.preventDefault()
                }} action="">
                    <input
                        type="text"
                        onChange={(e) => setCountryName(e.target.value)}
                        value={countryName}
                        placeholder="Enter country name..."
                    />
                    <button onClick={() => {
                        countryData()
                        setCountryName("")
                    }}>Search</button>
                </form>
            </div>

            {loading && <p className="loading">Loading...</p>}

            {error && <p className="error">{error}</p>}

            {countryApiRes && !loading && (
                <div className="country-details" style={{
                    color: "white"
                }}>
                    <img
                        src={countryApiRes[0].flags?.svg}
                        alt={`${countryApiRes[0].name.common} flag`}
                        className="flag"
                    />
                    <h2>{countryApiRes[0].name.common}</h2>
                    <p><strong>Capital:</strong> {countryApiRes[0].capital?.[0]}</p>
                    <p><strong>Region:</strong> {countryApiRes[0].region}</p>
                    <p><strong>Population:</strong> {countryApiRes[0].population.toLocaleString()}</p>
                    <p><strong>Borders:</strong> {countryApiRes[0].borders.join("  ")}</p>
                </div>
            )}
        </div>
    )
}

export default CountryCard
