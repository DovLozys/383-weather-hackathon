import { useState, useEffect } from "react";

import Card from "./components/Card/Card";

import css from "./App.module.css";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("london");
  const [forecastData, setForecastData] = useState(null)

  useEffect(() => {
    getCoordinates();
  }, []);

  useEffect(() => {
    getCoordinates();
  }, [searchTerm]);

  async function getCoordinates() {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`);
    const data = await res.json();
    getWeeklyForecast(data.coord);
  }

  async function getWeeklyForecast(coords) {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=current,minutely,hourly&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`);
    const data = await res.json();
    setForecastData(data.daily);
  }

  function handleInputChange(event) {
    setSearchInput(event.target.value);
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchInput);
  };

  return (
    <div className={css.App}>
      <h1>383 Weather App</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="text" placeholder="enter town/post code" className={css.userInput} onChange={handleInputChange}/>
        <button type="submit" className={css.searchButton}>Submit</button>
      </form>
      <main className={css.container}>
        {forecastData && 
          forecastData.map((day) => {
            return <Card dailyForecast={day} />
          })
        }
      </main>
    </div>
  );
}

export default App;
