import { WeatherData } from "@/services/weatherData";
import { MapPin } from "lucide-react";
import { Input } from "./ui/input";
import { useSetRecoilState } from "recoil";
import { inputState } from "@/atom/globalState";
import { useState } from "react";


export function SearchBar({ currentData }: { currentData: WeatherData | null }) {

  const [text, setText] = useState('');
  const setInput = useSetRecoilState(inputState)

  const handleChange = (event: any) => {
    setText(event.target.value);
  };

  const handleSubmit = () => {
    setInput(text)
  }

  const handleClick = (event: any) => {
    if (event.key == "Enter") {
      handleSubmit()
    }
  }
  return (
    <div className="flex items-center gap-3 text-2xl font-medium my-6 py-3 px-3 bg-accent rounded-3xl">
      <MapPin className="" /><Input type="text" onKeyDown={handleClick} onChange={handleChange} placeholder={currentData?.name} className="ring-0 text-2xl font-medium px-0" />
    </div>
  )
}
