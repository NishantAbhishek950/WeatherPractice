import React,{useEffect, useState} from 'react'
import style from '../HomeCenter/HomeCenter.module.css'
import sunLogo from '../../assets/sunLogo.png'
import HourlyForecast from './HourlyForecast'
import AirCondition from './AirCondition'
import { WeatherData } from '../../components/Module/WeatherDataModule';
import { FaSearch } from 'react-icons/fa'
import SearchPlaces from './SearchPlaces'
import CurrentPlaceStats from './CurrentPlaceStats'


//Full code for getting the HomeCenter Running in the Website
const HomeCenter = () => {

  //Current City Stored in the Search Bar

  //Weather Data for current Weather
  const [weatherData, setWeatheData] = useState<WeatherData | null>(null);

  //Boolean value for setting the loading to be true or false
  const[loading,setLoading] = useState<boolean>(false)

  //Setting and Error which we have received from the API response
  const[error,setError] = useState<string>("");

  //timer to start new callback from API
  const [debounceTimer, setDebounceTimer] = useState<number|null>(null);

  const[foreCastIndex,setForeCastIndex] = useState(0);

  
  useEffect(()=>{
    getCurrentLocationAndSet();
  },[])

  const getCurrentLocationAndSet = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          fetchWeatherData(lat,lng)
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  };

  //This function is called to get all the weather data
  const fetchWeatherData = async(lat,lng)=>{
    
    setLoading(true);

    //google place API KEY: AIzaSyDxQg3-lv8ZlmuPj9x3mS7NH7m4Lp6dJq8

    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=b61d71aee5a24c10a6a25442241012&q=${lat},${lng}&aqi=no&days=3`;
  

    try{
      const response = await fetch(apiUrl);

      console.log(response);


      if(!response.ok){
        throw new Error('Failed to fetch weather data')
      }

      const data = await response.json();
      setWeatheData(data);
      console.log("Checking if the API request give me the valid result")
      console.log(data);

    }catch(err){
      console.log("API request gave an error to me.")
      setError('An Error Occured')
    }finally{
      console.log("Setting to load to false.")
      setLoading(false)
    };

  }




  const makeWeatherRequest = (lat,lng) => {
  
    if(debounceTimer !== null){
      clearTimeout(debounceTimer);
    }
  
    const timer = window.setTimeout(()=>{
      fetchWeatherData(lat,lng);
    },1000);
  
    setDebounceTimer(timer);
  
  };


  return (
    
    <div className={style.homeContainer}>

        <div>
          
          <SearchPlaces
            makeWeatherRequest={makeWeatherRequest}
            getCurrentLocationAndSet={getCurrentLocationAndSet}
          />

          <CurrentPlaceStats weatherData={weatherData}></CurrentPlaceStats>
          <HourlyForecast forecast={weatherData?.forecast?.forecastday[foreCastIndex]}/>          
          <AirCondition weather={weatherData}></AirCondition>

        </div>
    
    </div>    
  
  )
}

export default HomeCenter