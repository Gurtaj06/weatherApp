import { useEffect, useState } from 'react'
import './App.css'
import { CurrentCard } from './components/currentCard'
import { HourlyData, hourlyWeather, WeatherData, currentWeather, forecastWeather } from './services/weatherData'
import { ClimateData } from './services/types';
import { Stats } from './components/stats';
import { HourlyCard } from './components/hourly';
import { SearchBar } from './components/search';
import { Weekly } from './components/weekly';
import { useRecoilValue } from 'recoil';
import { inputState } from './atom/globalState';


function App() {
  const inputValue = useRecoilValue(inputState);
  const [currentData, setCurrentData] = useState<WeatherData | null>(null);
  const [hourlyData, setHourlyData] = useState<HourlyData | null>(null);
  const [forecastData, setForecastData] = useState<ClimateData | null>(null);
  console.log(forecastData)
  useEffect(() => {
    const fetchData = async () => {
      try {

        const currentWeatherData = await currentWeather(inputValue);
        setCurrentData(currentWeatherData ? currentWeatherData : null);

        const hourlyWeatherData = await hourlyWeather(inputValue);
        setHourlyData(hourlyWeatherData ? hourlyWeatherData : null);

        const forecastWeatherData = await forecastWeather(inputValue);
        setForecastData(forecastWeatherData ? forecastWeatherData : null);

      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, [inputValue])

  return (
    <div className='h-full p-5 pt-4'>
      <SearchBar currentData={currentData} />
      <CurrentCard currentData={currentData} />
      <Stats currentData={currentData} />
      <HourlyCard hourlyData={hourlyData} />
      <Weekly forecastData={forecastData} />
    </div >
  )
}

export default App
