import React, { useState } from 'react';
import style from '../HomeCenter/HomeCenter.module.css';
import { FaMapMarkedAlt, FaMapPin, FaSearch } from 'react-icons/fa';
import { CurrentPlaceSearchCoordinate, Predictions } from '../Module/PlaceSearch';

interface SearchPlacesProps {
  makeWeatherRequest: (lat: number, lng: number) => void;
  getCurrentLocationAndSet: () => void;
}


const SearchPlaces = ({ makeWeatherRequest ,getCurrentLocationAndSet}:SearchPlacesProps) => {
  const [currentCity, setCurrentCity] = useState('');
  const [predictions, setPredictions] = useState<Predictions | null>(null);
  const[currentPlaceSearchCoordinate,setCurrentPlaceSearchCoordinate] = useState<CurrentPlaceSearchCoordinate|null>(null)

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const autoFillPlaces = async (placeReccomUrl: string) => {
    if (!placeReccomUrl) {
      return;
    }

    setLoading(true);
    setError('');


    //in future I will have to remove
    const url = `http://localhost:8081/map/placeAutoComplete?place=${placeReccomUrl}`

    console.log(url)
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Origin': 'http://localhost:5173', // Replace with your local or production domain
          'X-Requested-With': 'XMLHttpRequest',
        },
      });

      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to fetch places data');
      }

      const data = await response.json();
      setPredictions(data);
    } catch (err) {
      setError('Failed to fetch places data. Please try again.');
      console.log('Places API request failed', err);
    } finally {
      setLoading(false); 
    }
  };



  const getPlaceCoordinateFromApi = async(placeID:string)=>{
    if(!placeID){
      return;
    }

    const url = `http://localhost:8081/map/placeById?placeId=${placeID}`
    console.log(url)

    try{
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Origin': 'http://localhost:5173', // Replace with your local or production domain
          'X-Requested-With': 'XMLHttpRequest',
        },
      });

      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to fetch places data');
      }
      const data = await response.json();
      setCurrentPlaceSearchCoordinate(data);

      console.log(currentPlaceSearchCoordinate?.result.geometry.location.lat)


      if (currentPlaceSearchCoordinate?.result?.geometry?.location?.lat != null && currentPlaceSearchCoordinate?.result?.geometry?.location?.lng != null) {
          makeWeatherRequest(
            currentPlaceSearchCoordinate.result.geometry.location.lat,
            currentPlaceSearchCoordinate.result.geometry.location.lng
          );
      }else {
        console.error("Latitude or Longitude is missing from the place search coordinate.");
      }


    } catch (err) {
      setError('Failed to fetch places data. Please try again.');
      console.log('Places API request failed', err);
    } finally {
      setLoading(false); // Set loading to false once the request completes
    }

  }

  

  const setCityHandler = (event) => {
    const cityName = event.target.value.trim();
    setCurrentCity(cityName);

    if(cityName===''){
      setPredictions(null)
      return;
    }

    autoFillPlaces(cityName);
  };

  const handlePredictionClick=(placeId:string)=>{
    console.log(placeId)
    getPlaceCoordinateFromApi(placeId);
  }

  function getCurrentLocationWeather(){
    console.log("get current location is called here.")
    getCurrentLocationAndSet()
  }

  return (
    <div>

      <div className={style.seeMoreBtn} onClick={getCurrentLocationWeather}>
        <FaMapPin className={style.geoCurrent} />
        <p>Current Location</p>
      </div>

      <div className={style.searchContainer}>
        <input
          className={style.citySearchField}
          type="text"
          name="name"
          placeholder="Search for cities"
          onChange={setCityHandler}
          value={currentCity}
        />
        <FaSearch className={style.search} />
      </div>
      
      <div className={style.predictionList}>
          {predictions?.predictions.map((pred, index) => (
            <div key={index} className={style.predictionItem} onClick={()=>handlePredictionClick(pred.place_id)}>
              <p>{pred.description}</p>
              <FaMapMarkedAlt className={style.placeIcon}></FaMapMarkedAlt>
            </div>
          ))}
        </div>
    </div>
  );
};

export default SearchPlaces;
