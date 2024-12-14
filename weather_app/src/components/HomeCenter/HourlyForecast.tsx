import React from 'react'
import style from '../HomeCenter/HomeCenter.module.css'
import { ForecastDay } from '../Module/WeatherDataModule';

//My API Key:
//380a3e90b5fd46d6ad415316240912 

interface ForecastDayProps{
  forecast:ForecastDay|null|undefined;
}


const HourlyForecast = ({forecast}:ForecastDayProps) => {
    const currentTime = new Date();
    currentTime.setHours(currentTime.getHours() - 1);

    const fileterForeCast = forecast?.hour.filter((predicted)=>{
      const foreCastTime = new Date(predicted.time);
      return foreCastTime>=(currentTime);
    })

    const renderWeeklyList =fileterForeCast?.map((predictted,index)=>{
        return(
        <div className={`${style.hourlyItemContainer} ${index === 0 ? style.currentHour : ''}`}>
          <div className={style.hourlyItem}>
            <h3>{new Date(predictted.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h3>
            <p>{predictted.temp_c}°C</p>
              <p>{predictted.condition.text}</p>
              <img src={predictted.condition.icon}></img>
            </div>
            {index !== fileterForeCast.length - 1 && index !== 0 &&  <div className={style.line}></div>}
            
          </div>

            
        )
    })

  return (
    <div className={style.todaysForecastContainer}>
      {renderWeeklyList}
    </div>
  )
}

export default HourlyForecast
