import { useRef, useState } from "react";
import ClearIcon from "./assets/Clear1.png";
import RainIcon from "./assets/Rain1.png";
import SnowIcon from "./assets/Snow1.png";
import CloudsIcon from "./assets/Clouds1.png";
import HazeIcon from "./assets/Haze1.png";
import SmokeIcon from "./assets/Smoke1.png";
import MistIcon from "./assets/Mist1.png";
import DrizzleIcon from "./assets/Drizzle1.png";
import NotFoundIcon from "./assets/NotFound1.png";
import TempIcon from "./assets/Temp1.png";
import SearchIcon from "./assets/SearchIcon1.png";
import LoadingIcon from "./assets/Loading1.png";

const Api_key = "";

const App = () => {
  // State
  const inputRef = useRef(null);
  const [apiData, setApiData] = useState(null);
  const [showWeather, setShowWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [temperatureUnit, setTemperatureUnit] = useState("celsius");

  // Weather Types
  const WeatherTypes = [
    { type: "Clear", img: ClearIcon },
    { type: "Rain", img: RainIcon },
    { type: "Snow", img: SnowIcon },
    { type: "Clouds", img: CloudsIcon },
    { type: "Haze", img: HazeIcon },
    { type: "Smoke", img: SmokeIcon },
    { type: "Mist", img: MistIcon },
    { type: "Drizzle", img: DrizzleIcon },
  ];

  // Fetch Weather Data
  const fetchWeather = async () => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=metric&appid=${Api_key}`;
    setLoading(true);
    try {
      const res = await fetch(URL);
      const data = await res.json();
      setApiData(null);
      if (data.cod === 404 || data.cod === 400) {
        setShowWeather([{ type: "Not Found", img: NotFoundIcon }]);
      }
      setShowWeather(
        WeatherTypes.filter((weather) => weather.type === data.weather[0].main)
      );
      console.log(data);
      setApiData(data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  // Toggle Temperature Unit
  const toggleTemperatureUnit = () => {
    setTemperatureUnit((prevUnit) =>
      prevUnit === "celsius" ? "fahrenheit" : "celsius"
    );
  };

  return (
    <div className="bg-gray-800 h-screen grid place-items-center">
      <div className="bg-white w-96 p-4 rounded-md">
        {/* Search Input */}
        <div className="flex items-center justify-between">
          <input
            type="text"
            ref={inputRef}
            placeholder="Enter Your Location"
            className="text-xl border-b p-1 border-gray-200 font-semibold uppercase flex-1"
          />
          <button onClick={fetchWeather}>
            <img src={SearchIcon} alt="Search" className="w-8" />
          </button>
        </div>
        {/* Weather Display */}
        <div
          className={`duration-300 delay-75  overflow-hidden
         ${showWeather ? "h-[27rem]" : "h-0"}`}
        >
          {loading ? (
            <div className="grid place-items-center h-full">
              <img
                src={LoadingIcon}
                alt="Loading"
                className="w-14 mx-auto mb-2 animate-spin"
              />
            </div>
          ) : (
            showWeather && (
              <div className="text-center flex flex-col gap-6 mt-10">
                {/* Location Name */}
                {apiData && (
                  <p className="text-xl font-semibold">
                    {apiData?.name + "," + apiData?.sys?.country}
                  </p>
                )}
                {/* Weather Icon */}
                <img
                  src={showWeather[0]?.img}
                  alt="Weather"
                  className="w-52 mx-auto"
                />
                {/* Weather Type */}
                <h3 className="text-2xl font-bold text-zinc-800">
                  {showWeather[0]?.type}
                </h3>
                {/* Temperature */}
                {apiData && (
                  <div className="flex items-center justify-center">
                    <h2 className="text-4xl font-extrabold">
                      {temperatureUnit === "celsius"
                        ? `${apiData?.main?.temp}°C`
                        : `${((apiData?.main?.temp * 9) / 5 + 32).toFixed(
                            2
                          )}°F`}
                    </h2>
                    <img
                      src={TempIcon}
                      alt="Temperature Icon"
                      className="w-6 ml-2 cursor-pointer"
                      onClick={toggleTemperatureUnit}
                    />
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
