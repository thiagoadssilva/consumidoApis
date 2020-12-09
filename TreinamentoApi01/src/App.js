import './App.css';
import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [weather, setWeather] = useState(false);
  const [location, setLocation] = useState(false);

  let getWeather = async (lat, long) => {
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: '339bd2b4d8ef83230b99fb5cd37809ab',
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true);

      console.log()
    })
  }, [])

  if (location === false) {
    return (
      <Fragment>
        Você precisa habilitar a localização no browser o/
      </Fragment>
    )
  } else if (weather === false) {
    return (
      <Fragment>
        Carregando o clima...
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <h3>Clima nas suas Coordenadas ({weather['weather'][0]['description']})</h3>
        <hr />
        <ul>
          <li>Temperatura atual: {weather['main']['temp']}°</li>
          <li>Temperatura máxima: {weather['main']['temp_max']}°</li>
          <li>Temperatura minima: {weather['main']['temp_min']}°</li>
          <li>Pressão: {weather['main']['pressure']} hpa</li>
          <li>Humidade: {weather['main']['humidity']}%</li>
        </ul>
      </Fragment>
    );
  }
}

export default App;
