import { HourlyData, fetchIcon } from "@/services/weatherData";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export function HourlyCard({ hourlyData }: { hourlyData: HourlyData | null }) {

  function formatAMPM(date: Date, index: number) {
    let hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strTime = (index === 0 ? "Now" : hours + ampm);
    return strTime;
  }
  return (
    <ScrollArea className="border rounded-3xl mt-6 w-full ">
      <div className="flex border-none">
        {hourlyData?.list.map((hour, index) => (
          <Card className="border-none rounded-none" key={hour.dt}>
            <CardHeader className="text-center scroll-m-20 text-2xl font-semibold tracking-tight">{Math.round(hour.main.temp) + "°"}</CardHeader>
            <CardContent>
              <div className="h-[60px] w-[60px]">
                {fetchIcon(hour.weather[0].description, hour.dt)}
              </div>
            </CardContent>
            <CardFooter className="scroll-m-20 text-lg justify-center text-center font-medium tracking-tight">
              {formatAMPM(new Date(hour.dt * 1000), index)}
            </CardFooter>
          </Card>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
