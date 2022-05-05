import css from "./App.module.css";
import { useState } from "react";
import useFetch from "react-fetch-hook";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("london");
  const [isLoading, setIsLoading] = useState(true);
  const [latitude, setLatitude] = useState(51.5085);
  const [longitude, setLongitude] = useState(-0.1257);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchClick = (e) => {
    setSearchTerm(searchInput);
  };

  const dailyForecast = useFetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
  );

  const weeklyForecast = useFetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
  );

  console.log("dailyForecast", dailyForecast);
  console.log("weeklyForecast", weeklyForecast);

  if (weeklyForecast.isLoading) {
    return <div> Loading ... </div>;
  }

  return (
    <div className={css.App}>
      <h1>383 Weather App</h1>
    </div>
  );
}

export default App;
