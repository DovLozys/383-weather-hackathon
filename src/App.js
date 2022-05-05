import { useState, useEffect } from "react";
import useFetch from "react-fetch-hook";

import Card from "./components/Card/Card";

import css from "./App.module.css";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("london");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [latitude, setLatitude] = useState(51.5085);
  const [longitude, setLongitude] = useState(-0.1257);
  const [weeklyForecast, setWeeklyForecast] = useState([]);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchClick = (e) => {
    setSearchTerm(searchInput);
  };

  // const dailyForecast = useFetch(
  //   `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
  // );

  // const weeklyForecast = useFetch(
  //   `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
  // );

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
      );
      const data = await response.json();
      setData(data);
      setIsLoading(false);
      console.log(data);
    }
    fetchData();
  }, [searchTerm]);

  const fetchWeeklyForecast = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
    );
    const data = await response.json();
    console.log(data);
  };

  console.log("weeklyForecast", weeklyForecast);

  if (weeklyForecast.isLoading) {
    return <div> Loading ... </div>;
  }

  return (
    <div className={css.App}>
      <h1>383 Weather App</h1>
      <main className="container">
        {!weeklyForecast.isLoading &&
          weeklyForecast.data.daily.map((day) => {
            return <Card dailyForecast={day} />;
          })}
      </main>
    </div>
  );
}

export default App;
