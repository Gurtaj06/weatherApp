import { WeatherData, fetchIcon } from "@/services/weatherData";
import { Card, CardContent, CardHeader } from './ui/card'

export function CurrentCard({ currentData }: { currentData: WeatherData | null }) {

  const newDate = new Date()
  const date = newDate.getDate().toString();
  const month = newDate.toLocaleString('default', { month: 'long' })
  const style = {
    backgroundImage: "url('../../public/Vector 1 (2).svg')",
    backgroundSize: 'contain', // Adjust this property to control the image size
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  }
  return (
    <div style={style}>
      <Card className='w-full h-[100%]'>
        <CardHeader className="flex flex-row justify-between">
          <div>
            <div className="text-lg font-mediuim">{`Today, ${date} ${month.slice(0, 3)}`}</div>
            <div className="capitalize text-2xl font-bold">{currentData?.weather[0].description}</div>
          </div>
          <div className="mix-blend-screen h-auto w-[200px]">
            {fetchIcon(currentData?.weather[0].description, currentData?.dt)}
          </div>
        </CardHeader>
        <CardContent className='flex flex-row items-end justify-between'>
          <div className='scroll-m-20 text-8xl font-bold tracking-tight lg:text-5xl'>
            {currentData ? Math.round(currentData.main.temp) + "°" : ""}
          </div>
          <div className="text-3xl font-semibold">{currentData ? Math.round(currentData?.main.temp_max) + "°" : ""}/{currentData ? Math.round(currentData?.main.temp_min) + "°" : ""}</div>
        </CardContent>
      </Card >
    </div>
  )
}
