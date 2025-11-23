import { useState, useEffect } from 'react'
import './App.css'
import rain from "../assets/rain.mp4";
import sun from "../assets/sunny.mp4";
import snow from "../assets/snow.mp4";



const KEY = '9ed25195e11d4859947102643242211';

// function translateCondition(weatherCond) {
//   if (weatherCond.current.condition.text === 'Partly cloudy') {
//     return setWeatherCondition('Частично облачно');
//   }
// }

function App() {

  const [city, setCity] = useState("Нижний Новгород");
  const [weatherData, setWeatherData] = useState(null);
  const [weatherCondition,setWeatherCondition] = useState(null);
  
  useEffect(()=> {
    async function getData() {
    try { 
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${KEY}&q=${city}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}; ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        setWeatherData(data);


    } catch (error) {
      console.log("Error fetching data:", error);
      setError(error.message);
    }
  }
    getData();
  }, []);

  // let dateTime = weatherData?.location?.localtime;
  // console.log(dateTime);
  // let time = dateTime.split(" ");
  // let curTime = time[time.length - 1];
  // console.log(curTime);

  return (
    <div className="app">
      <div className="main-container">
        <video autoPlay muted loop className="video">
          <source src={snow} type="video/mp4"/>
        </video>
        <section className="header-info">
          <div className="date">
            <span className="date-current">{weatherData?.location?.localtime.split(" ")[0].split("-").reverse().join().replace(/,/g, ".")}</span>
            <span className="date-week">Tuesday</span>
          </div>
          <span className="time">{weatherData?.location?.localtime.split(" ")[1]}</span>
          <h1>Vibe<br />weather</h1>
        </section>
        <section className="main-info">
          <div className="weather-info">
            <p className="weather-temp">{Math.round(weatherData?.current?.temp_c)}°</p>
            <img src={`${weatherData?.current?.condition.icon}`} alt="weather icon" />
          </div>
          <div className="weather-state">
            <p className="weather-state__text">{weatherData?.current?.condition.text}</p>
          </div>
          <span className="weather-city">{city}</span>
        </section>
      </div>
    </div>
  )
}

export default App
