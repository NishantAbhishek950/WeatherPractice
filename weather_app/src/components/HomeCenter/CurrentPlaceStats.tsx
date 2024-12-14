import React from 'react'
import style from '../HomeCenter/HomeCenter.module.css'
import { WeatherData } from '../Module/WeatherDataModule'

interface WeatherDataProps{
    weatherData:WeatherData|null|undefined
}

const CurrentPlaceStats = ({weatherData}:WeatherDataProps) => {
  return (
    <div className={style.currentStats}>
    
      <div className={style.left}>
        <h2 className={style.currentCity}>{weatherData?.location.name} ({weatherData?.location.region})</h2>
        <p className={style.rainChance}>Chance of Rain: 0%</p>
        <p className={style.currentTemp}>{weatherData?.current.temp_c}°C</p>
      </div>        

    <div className={style.right}>
      <img className={style.sunLogo} src={weatherData?.current.condition.icon}></img>
    </div>                  

  </div>   
  )
}

export default CurrentPlaceStats
