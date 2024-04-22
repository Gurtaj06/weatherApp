import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API;
const BASE_URL = "https://pro.openweathermap.org/data/2.5/";

export type WeatherData = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export interface ClimateData {
  list: {
    dt: number;
    temp: {
      min: number;
      max: number;
      day: number;
      morn: number;
      eve: number;
      night: number;
    };
    weather: {
      description: string;
    }[];

    speed: number;
    deg: number;
    pressure: number;
    humidity: number;
  }[];
}

export interface HourlyData {
  city: {
    id: number,
    name: string,
    sunrise: number,
    sunset: number
  }
  list: {
    dt: number;
    main: {
      temp: number
      feels_like: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
  }[];
}

const getCoords = (): Promise<{ latitude: number; longitude: number }> => {
  return new Promise<{ latitude: number; longitude: number }>((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
        error => reject(error)
      );
    } else {
      reject(new Error("Geolocation is not supported."));
    }
  });
};

const getLocation = async (): Promise<string> => {
  try {
    const { latitude, longitude } = await getCoords();
    const response = await axios.get(`${BASE_URL}forecast/climate?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
    return response.data.city.name;
  } catch (error) {
    console.error("Error fetching location:", error);
    throw error;
  }
};

export const currentWeather = async (location: string = ""): Promise<WeatherData> => {
  try {
    const cityName = location ? location : await getLocation();
    const response = await axios.get<WeatherData>(`${BASE_URL}weather?q=${cityName}&units=metric&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching current weather data:", error);
    throw error;
  }
};

export const hourlyWeather = async (location: string = ""): Promise<HourlyData> => {
  try {
    const cityName = location ? location : await getLocation();
    const response = await axios.get<HourlyData>(`${BASE_URL}forecast/hourly?q=${cityName}&cnt=24&units=metric&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching hourly weather data:", error);
    throw error;
  }
};

export const forecastWeather = async (location: string = ""): Promise<ClimateData> => {
  try {
    const cityName = location ? location : await getLocation();
    const response = await axios.get<ClimateData>(`${BASE_URL}forecast/climate?q=${cityName}&cnt=7&units=metric&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching forecast weather data:", error);
    throw error;
  }
};

export const fetchIcon = (code: string | undefined, dt: number | undefined) => {
  let time = new Date(dt ? dt * 1000 : 0).getHours();
  if (code === "clear sky" && (time >= 20 || time <= 7)) {
    return <img src={`../../icons/moon.svg`} alt="Moon Icon" />;
  } else if ((code === "few clouds" || code === "overcast clouds") && time >= 20 || time <= 7) {
    return <img src={`../../icons/cloudy night.svg`} alt="Cloudy Night Icon" />;
  }
  return (
    <img src={`../../icons/${code}.svg`} alt="Weather Icon" />
  )
}
