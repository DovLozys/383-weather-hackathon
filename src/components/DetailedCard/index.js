import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import css from "./detailedCard.module.css";

function DetailedCard({ dailyForecast }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const date = new Date(dailyForecast.dt * 1000).toLocaleDateString();
  const options = { weekday: "long" };
  const day = new Intl.DateTimeFormat("en-GB", options).format(
    dailyForecast.dt * 1000
  );
  const iconURL = `http://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`;

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        See more...
      </Button>

      <Modal show={show} onHide={handleClose} className={css.modal}>
        <Modal.Header className={css.modalHeader} closeButton>
          {/* <Modal.Title>Weather details</Modal.Title> */}
          <div className={css.cardHeader}>
            <h2>{day}</h2>
            <h3 className={css.date}>{date}</h3>
          </div>
        </Modal.Header>
        <Modal.Body className={css.modalBody}>
          <p className={css.forecast}>{dailyForecast.weather[0].description}</p>
          <div className={css.cardWeatherInfo}>
            <p className={css.temperature}>
              {Math.round(dailyForecast.temp.day)}°C
            </p>
            <div className={css.minmax}>
              <p>Max: {Math.round(dailyForecast.temp.max)}°C</p>
              <p>Min: {Math.round(dailyForecast.temp.min)}°C</p>
            </div>
            <div className={css.suntimes}>
              <p>
                Sunrise:{" "}
                {new Date(dailyForecast.sunrise * 1000).toLocaleTimeString(
                  "en-US",
                  { hour: "numeric", minute: "numeric" }
                )}
              </p>
              <p>
                Sunset:{" "}
                {new Date(dailyForecast.sunset * 1000).toLocaleTimeString(
                  "en-US",
                  { hour: "numeric", minute: "numeric" }
                )}
              </p>
            </div>
            <p>Cloud cover: {dailyForecast.clouds}%</p>
          </div>
          <img src={iconURL} alt="weatherIcon" className={css.icon}></img>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DetailedCard;
