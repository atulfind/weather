import React, { useCallback, useEffect, useRef, useState } from 'react';
import { service } from '../../services';
import './index.scss';
import { getAuth } from '../../utils';
import WeatherCard from './WeatherCard';
import Input from '../../components/Input';
import { IconSearch } from '../../components/Icons';
import Button from '../../components/Button';
import { useHistory } from 'react-router-dom';


export const Dashboard = () => {

  const inputRef = useRef()
  const history = useHistory();
  const [authState] = useState(getAuth());
  const [state, setState] = useState({});
  const [isFetching, setFetching] = useState(true);

  const getWeather = useCallback((city) => {
    setFetching(true);
    service.getAll(city).then(res => {
      if (res.cod === 200) {
        setState(res)
      } else {
        setState(null)
      }
      setFetching(false)
    }).catch(error => console.log(error))
  }, [])

  useEffect(() => {
    if(authState.location){
      getWeather(authState.location.city);
    }
  }, [authState, getWeather]);

  const searchWeather = () => {
    const city = inputRef.current.value;
    getWeather(city);
  }

  const logoutHandler = () => {
    localStorage.removeItem('weatherSession');
    history.push('/login')
  }

  return (
    <div className="dashboard">
      <Button text="Logout" onClick={logoutHandler}/>
      <div className="other-details">
        <div className="page-heading">
          Temprature
        </div>
        <div className="weather-search">
          <Input placeholder="Enter City" ref={inputRef} />
          <div className="search-button" onClick={searchWeather}>
            <IconSearch />
          </div>
        </div>
      </div>
      {
        state &&
        <WeatherCard
          isFetching={isFetching}
          humidity={state.main && state.main.humidity}
          visibility={state.visibility}
          wind={state.wind && state.wind.speed}
          city={state.name}
          degree={state.main && state.main.temp}
          country={state.sys && state.sys.country} />
      }
    </div>
  )
}
