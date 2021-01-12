import React from 'react';
import { IconCloudRain, IconWind, IconHumidity, IconVisibility } from '../../../components/Icons';
import Spinner from '../../../components/Spinner';
import './index.scss';

const WeatherCard = ({ degree, isFetching, city, country, wind, humidity, visibility }) => {
  return (
    <div className="weather-card">
      {
        isFetching ?
        <Spinner/> 
        : 
       <React.Fragment>
          <div>
        <IconCloudRain />
        <div className="temp">
          <div className="degree">C</div>
          <div className="number">{parseFloat(degree).toFixed(1)}</div>
        </div>
        <div className="temp-city">
          {`${city}, ${country}`}
        </div>
      </div>
      <div className="temp-more">
        <div className="box" title="Wind">
          <IconWind />
          <span>{`${wind} KM/H`}</span>
        </div>
        <div className="box" title="Humidity">
          <IconHumidity />
          <span>{`${humidity} %`}</span>
        </div>
        <div className="box" title="Visibility">
          <IconVisibility />
          <span>{`${visibility} M`}</span>
        </div>
      </div>
       </React.Fragment>
      }
    </div>
  )
}

export default WeatherCard
