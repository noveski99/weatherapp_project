import './style/App.css';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { MdLocationPin } from "react-icons/md";
import { RiCelsiusLine } from "react-icons/ri";
import { Toaster, toast } from 'react-hot-toast';
import { GiWaterDrop } from "react-icons/gi";
import { MdOutlineVisibility } from "react-icons/md";
import { TbWind } from "react-icons/tb";
import { IoMdSpeedometer } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { FetchData } from './services/requests/FetchData';
import { Navigator } from './services/Navigator';

function App() {
  const [location, setLocation] = useState({ latitude: null, longitude: null })
  const [data, setData] = useState()
  const [city, setCity] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3b42eb99c84688de6a89de62815d71cd`
  const locationURL = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=3b42eb99c84688de6a89de62815d71cd`
  useEffect(() => {
    Navigator(setLocation);
  }, [])
  useEffect(() => {
    if (location.latitude !== null && location.longitude !== null) {
      FetchData(locationURL, setData);
    }
  }, [location, locationURL])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data)
    }).catch((error) => {
      toast(`Oops, city not found!`, {
        position: "bottom-center",
        style: {
          backgroundColor:'transparent',
          color: 'white'
        }
      });
    })
    setCity('')
  }
  return (
    <div className="App">
      <Toaster />
      <section className='form-wrapper'>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Search location' value={city} onChange={(e) => setCity(e.target.value)}></input>
          <button title='Search'><CiSearch style={{ color: 'light-blue' }} size={15} /></button>
        </form>
      </section>
      <div className='city'><p><MdLocationPin />{data ? <span>{data.name}</span> : null}</p></div>
      <section className='degrees-container'>
        <div className='degrees'>{data ? <p>{Math.round(data.main.temp)}</p> : null}</div>
        <div className='short-desc'>{data ? data.weather[0].main : null}</div>
        <div className='feels-like'>Feels like {Math.round(data ? data.main.feels_like : null)}° </div>
      </section>
      <section className='data-container'>
        <div className='first-row'>
          <div className='wind'><TbWind size={20} /> <span>Wind</span> <br></br>{data ? data.wind.speed : null} km/h</div>
          <div className='pressure'> <IoMdSpeedometer size={20} />
            Pressure <br></br>{data ? data.main.pressure : null} hPa</div>
        </div>
        <div className='second-row'>
          <div className='visibility'><MdOutlineVisibility size={20} />
            Visibility <br></br>{data ? data.visibility : null} km</div>
          <div className='humidity'>
            <GiWaterDrop size={20} />
            Humidity <br></br>{data ? data.main.humidity : null}%</div>
        </div>
      </section>

<footer className='footer'>
© 2024 React Waily
</footer>
    </div>
  );
}

export default App;
