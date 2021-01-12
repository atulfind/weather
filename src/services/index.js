import { api_key } from "../config"

const getAll = (city) => {
  return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`).then(res=> res.json())
}


export const service = {
  getAll
}