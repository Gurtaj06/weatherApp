import { useEffect, useState } from 'react'
import './App.css'
import { CurrentCard } from './components/currentCard'
import { HourlyData, hourlyWeather, WeatherData, currentWeather, forecastWeather } from './services/weatherData'
import { ClimateData } from './services/types';
import { Stats } from './components/stats';
import { HourlyCard } from './components/hourly';


function App() {
  const [inputValue, setInputValue] = useState("");
  const [currentData, setCurrentData] = useState<WeatherData | null>(null);
  const [hourlyData, setHourlyData] = useState<HourlyData | null>(null);
  const [forecastData, setForecastData] = useState<ClimateData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentWeatherData = await currentWeather(inputValue);
        setCurrentData(currentWeatherData ? currentWeatherData : null);

        const hourlyWeatherData = await hourlyWeather(inputValue);
        setHourlyData(hourlyWeatherData ? hourlyWeatherData : null);
        console.log(hourlyWeatherData)
        const forecastWeatherData = await forecastWeather(inputValue);
        setForecastData(forecastWeatherData ? forecastWeatherData : null);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, [])

  return (
    <div className='h-screen p-8'>
      <CurrentCard currentData={currentData} />
      <Stats currentData={currentData} />
      <HourlyCard hourlyData={hourlyData} />
    </div >
  )
}

export default App
