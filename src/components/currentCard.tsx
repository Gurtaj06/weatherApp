import { WeatherData, fetchIcon } from "@/services/weatherData";
import { Card, CardContent, CardHeader } from './ui/card'

export function CurrentCard({ currentData }: { currentData: WeatherData | null }) {

  const newDate = new Date()
  const date = newDate.getDate().toString();
  const month = newDate.toLocaleString('default', { month: 'long' })
  return (
    <Card className='w-full'>
      <CardHeader className="flex flex-row">
        <div>
          <div className="text-lg font-mediuim">{`Today, ${date} ${month.slice(0, 3)}`}</div>
          <div className="capitalize text-2xl font-bold">{currentData?.weather[0].description}</div>
        </div>
        <div>
          {fetchIcon(currentData?.weather[0].description, currentData?.dt, currentData?.sys.sunrise, currentData?.sys.sunset)}
        </div>
      </CardHeader>
      <CardContent className='flex flex-row items-end justify-between mt-10'>
        <div className='scroll-m-20 text-8xl font-bold tracking-tight lg:text-5xl'>
          {currentData ? Math.round(currentData.main.temp) + "°" : ""}
        </div>
        <div className="text-3xl font-semibold">{currentData ? Math.round(currentData?.main.temp_max) + "°" : ""}/{currentData ? Math.round(currentData?.main.temp_min) + "°" : ""}</div>
      </CardContent>
    </Card>
  )
}
