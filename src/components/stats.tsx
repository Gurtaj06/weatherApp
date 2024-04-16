import { WeatherData } from "@/services/weatherData";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Droplets, Wind, ThermometerSunIcon } from "lucide-react";

function FeeksLikeCard({ currentData }: { currentData: WeatherData | null }) {
  const feelsLike = (currentData ? Math.round(currentData?.main.feels_like) : 0)
  const temp = (currentData ? Math.round(currentData?.main.temp) : 0)
  return (
    <Card className="mt-6">
      <CardContent className="flex justify-between pt-4">
        <div className="flex flex-col items-start gap-2 w-1/2">
          <div className="scroll-m-20 text-lg font-semibold tracking-tight text-muted-foreground">Feels like</div>
          <div className="flex items-center gap-2">
            <ThermometerSunIcon />
            <div className="scroll-m-20 text-2xl font-semibold tracking-tight">
              {feelsLike + "°"}
            </div>
          </div>
        </div>
        <div className="pl-12 my-auto scroll-m-20 text-lg font-semibold tracking-tight text-muted-foreground">
          Humidity is making it feel {temp > feelsLike ? "cooler" : "warmer"}
        </div>
      </CardContent>
    </Card >
  )
}

function Humidiy({ currentData }: { currentData: WeatherData | null }) {
  return (
    <Card className="mt-6 w-full">
      <CardHeader className="scroll-m-20 text-lg font-semibold tracking-tight text-muted-foreground pb-2">Humidity</CardHeader>
      <CardContent className="flex items-center gap-2 scroll-m-20 text-2xl font-semibold tracking-tight mt-0">
        <Droplets />
        <div>
          {currentData ? Math.round(currentData?.main.humidity) + "%" : ""}
        </div>
      </CardContent>
    </Card >
  )
}

function WindCard({ currentData }: { currentData: WeatherData | null }) {
  return (
    <Card className="mt-6 w-full">
      <CardHeader className="scroll-m-20 text-lg font-semibold tracking-tight text-muted-foreground pb-2">Wind Speed</CardHeader>
      <CardContent className="flex items-center gap-2 scroll-m-20 text-2xl font-semibold tracking-tight mt-0">
        <Wind />
        <div>
          {currentData ? Math.round(currentData?.wind.speed) + "km/h" : ""}
        </div>
      </CardContent>
    </Card >
  )
}

export function Stats({ currentData }: { currentData: WeatherData | null }) {
  return (
    <div>
      <FeeksLikeCard currentData={currentData} />
      <div className="flex gap-4">
        <WindCard currentData={currentData} />
        <Humidiy currentData={currentData} />
      </div>
    </div>
  )
} 
