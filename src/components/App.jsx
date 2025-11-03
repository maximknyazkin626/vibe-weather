import { useState, useEffect } from 'react'
import './App.css'
import rain from "../assets/rain.mp4";
import sun from "../assets/sunny.mp4";
import snow from "../assets/snow.mp4";



const KEY = '9ed25195e11d4859947102643242211';



function App() {

  const [city, setCity] = useState("Нижний Новгород");
  const [weatherData, setWeatherData] = useState(null);
  
  useEffect(()=> {
    async function getData() {
    try { 
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${KEY}&q=${city}`);
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

  return (
    <div className="app">
      <div className="main-container">
        <video autoPlay muted loop className="video">
          <source src={snow} type="video/mp4"/>
        </video>
        <section className="header-info">
          <div className="date">
            <span className="date-current">26.10.25</span>
            <span className="date-week">Tuesday</span>
          </div>
          <span className="time">09:30</span>
          <h1>Vibe<br />weather</h1>
        </section>
      </div>
    </div>
  )
}

export default App
