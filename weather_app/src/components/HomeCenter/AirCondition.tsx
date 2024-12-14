import React from 'react'
import  style from '../HomeCenter/HomeCenter.module.css'
import { FaThermometerHalf, FaWind, FaCloudRain, FaSun } from 'react-icons/fa';
import { WeatherData } from '../Module/WeatherDataModule';

//My API Key:
//380a3e90b5fd46d6ad415316240912 

interface AirConditionProps{
  weather:WeatherData|null;
}

const AirCondition = ({weather}:AirConditionProps) => {

  var chanceOfRain = 0;
  var precip = weather?.current?.precip_mm??0;

  if(precip==0){

  }

  else if( precip< 0.3){
    chanceOfRain = 20;
  }else if(  precip< 0.7){
    chanceOfRain = 60;
  }else{
    chanceOfRain = 100;
    
  }

  return (
    <div className={style.airContainer}>

      <div className={style.titleContainer}>
        <p> <FaThermometerHalf /> Air Conditions</p>
        <p className={style.seeMoreBtn}>See more</p>
      </div>


      <div className={style.titleContainer}>
      
        <div className={style.airConditionBox}>
            <p> <FaThermometerHalf /> Real Feel</p>
            <p>{weather?.current.feelslike_c}°C</p>
        </div>
        
        <div className={style.airConditionBox}>
            <p><FaWind /> Wind Speed</p>
            <p>{weather?.current.gust_mph}mph</p>
        </div>
      
      </div>

      <div className={style.titleContainer}>
      
        <div className={style.airConditionBox}>
            <p> <FaCloudRain /> Chance Of Rain</p>
            <p>{chanceOfRain}%</p>
        </div>
        
        <div className={style.airConditionBox}>
            <p> <FaSun /> UV Index</p>
            <p>{weather?.current.uv}</p>
        </div>
      
      </div>

    </div>
  )

}


export default AirCondition
