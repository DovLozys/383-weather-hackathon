import css from "./card.module.css";
import { Button } from "react-bootstrap";

import React from "react";
import DetailedCard from "../DetailedCard";
import { useState } from "react";

function Card({ dailyForecast }) {
  const date = new Date(dailyForecast.dt * 1000).toLocaleDateString();
  const options = { weekday: "long" };
  const day = new Intl.DateTimeFormat("en-GB", options).format(
    dailyForecast.dt * 1000
  );
  const iconURL = `http://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`;
  //   const [show, setShow] = useState(false);
  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  return (
    <div className={css.card}>
      <div className={css.cardHeader}>
        <h2>{day}</h2>
        <h3 className={css.date}>{date}</h3>
      </div>
      <p className={css.forecast}>{dailyForecast.weather[0].description}</p>
      <div className={css.cardWeatherInfo}>
        <p className={css.temperature}>
          {Math.round(dailyForecast.temp.day)}°C
        </p>
        <div className={css.minmax}>
          <p>Max: {dailyForecast.temp.max}</p>
          <p>Min: {dailyForecast.temp.min}</p>
        </div>
        <img src={iconURL} alt="weatherIcon" className={css.icon}></img>

        <DetailedCard dailyForecast={dailyForecast} />
      </div>
    </div>
  );
}

export default Card;
