import React from 'react'
import { FaWind,FaCloud,FaCity,FaCog, FaMap, FaPen } from 'react-icons/fa'
import style from '../HomeLeftSide/Homeleft.module.css'

const Homeleft = () => {
  return (
    
    <div className={style.sideBarMainContainer}>

      <FaWind className={style.topIcon} />

      <div className={style.itemContainer}>
        <FaCloud className={style.bottomIcon} ></FaCloud>
        <p>Weather</p>

      </div>

      <div className={style.itemContainer}>
        <FaCity className={style.bottomIcon}></FaCity>
        <p>Nearby Cities</p>
      </div>


      <div className={style.itemContainer}>
        <FaPen className={style.bottomIcon}></FaPen>
        <p>Modify</p>
      </div>            

    </div>


  )
}

export default Homeleft
