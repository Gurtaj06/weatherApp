import { ClimateData } from "@/services/types";
import { Card, CardTitle, CardFooter, CardHeader, CardContent, CardDescription } from "./ui/card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

import { fetchIcon } from "@/services/weatherData";
import { CalendarClock } from "lucide-react";

function getDayName(dt: Date, index: number) {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const dayOfWeek = dt.getDay();
  const dayName = index === 0 ? "Today" : dayNames[dayOfWeek];

  return dayName;
}

export function Weekly({ forecastData }: { forecastData: ClimateData | null }) {

  return (
    <Card className="mt-6">
      <div className="flex items-center gap-2 p-6 pb-0 font-semibold text-xl tracking-tight text-muted-foreground"><CalendarClock /> 7-day forecast</div>
      <ScrollArea className="w-full ">
        <div className="flex flex-col border-none">
          {forecastData?.list.map((day, index) => (
            <Card className="flex items-center justify-between flex-row border-none rounded-3xl" key={day.dt}>
              <CardHeader className="text-left w-[35%] scroll-m-20 text-xl font-medium tracking-tight">
                {getDayName(new Date(day.dt * 1000), index)}
              </CardHeader>
              <CardContent>
                <div className="h-[60px] w-[60px] ">
                  {fetchIcon(day.weather[0].description, day.dt)}
                </div>
              </CardContent>
              <CardFooter className="scroll-m-20 text-lg justify-center text-center font-medium tracking-tight">
                {Math.round(day.temp.max) + "°" + "/" + Math.round(day.temp.min) + "°"}
              </CardFooter>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </Card>

  )
}
