import React, { useState } from "react";
import axios from "axios";
import { FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import './SearchCity.css'

export default function SearchCity() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState("");
  const apiKey = process.env.REACT_APP_OPEN_WEATHER_KEY;
  const language = "pt_br";

  const searchCity = (event) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=${language}&appid=${apiKey}`;

    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setCity("");
    }
  };

  return (
    <body>
      <div className="home-container">
        <h2 className="home-title">Search Weather</h2>
        <input
          value={city}
          type="text"
          className="input"
          placeholder="Escolha uma cidade e pressione ENTER"
          onChange={(event) => setCity(event.target.value)}
          onKeyPress={searchCity}
        ></input>
      </div>
      {data !== null && (
        <div className="degrees-container">
          <div className="items-container">
            <h4 className="name-city">
              <GoLocation className="icon-location-temp" size={20} />
              {data.name}
            </h4>
            {data.weather[0].icon && (
              <img
                alt="icon"
                className="temp-icon"
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
              ></img>
            )}
            <h4 className="temp-description">{data.weather[0].description}</h4>
            <h1 className="temp-current">{data.main.temp.toFixed()}°C</h1>
            <h5 className="temp-max">
              <FaTemperatureHigh className="icon-max-temp" size={20} />
              {data.main.temp_max.toFixed()}°C
            </h5>
            <h5 className="temp-min">
              <FaTemperatureLow className="icon-low-temp" size={20} />
              {data.main.temp_min.toFixed()}°C
            </h5>
          </div>
        </div>
      )}
    </body>
  );
}
