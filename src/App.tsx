import { useState, useEffect } from 'react';
import './App.css';
import { TbLocationFilled } from 'react-icons/tb';
import { FaSearchLocation, FaLinkedin, FaGithub, FaInstagramSquare } from 'react-icons/fa';

function App() {
  const [coordinates, setCoordinates] = useState({
    longitude: '28.94966',
    latitude: '41.01384',
  });
  const [tempCity, setTempCity] = useState('Istanbul');
  const [temperature, setTemperature] = useState('Loading...');
  const [city, setCity] = useState('');
  const [precipitation, setPrecipitation] = useState('Loading...');
  const [wind, setWind] = useState('Loading...');
  const [dayTempsmax, setDaytempsmax] = useState([]);
  const [dayTempsmin, setDaytempsmin] = useState([]);
  const [date, setDate] = useState([]);
  const [, setResponse] = useState({});
  const [backgroundVideo, setBackgroundVideo] = useState<string | undefined>(undefined);

  const getBackgroundVideo = (code: number) => {
    if (code === 0) {
      return 'backgrounds/clear.mov'; // Açık Hava
    } else if (code >= 1 && code <= 3) {
      return 'backgrounds/cloudy.mov'; // Bulutlu
    } else if (code >= 45 && code <= 48) {
      return 'backgrounds/fog.mov'; // Sisli
    } else if (
      (code >= 51 && code <= 67) || // Hafif-Orta Şiddetli Yağmur
      (code >= 80 && code <= 82) || // Sağanak Yağmur
      code === 95 // Hafif Fırtına
    ) {
      return 'backgrounds/rain.mov'; // Yağmurlu
    } else if (
      (code >= 71 && code <= 77) || // Hafif-Orta Şiddetli Kar Yağışı
      (code >= 85 && code <= 86) || // Kar Sağanağı
      (code >= 96 && code <= 99) // Şiddetli Fırtına ve Kar
    ) {
      return 'backgrounds/snow.mov'; // Karlı
    } else {
      return 'backgrounds/clear.mov'; // Varsayılan
    }
  };

  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&current_weather=true&daily=temperature_2m_max,precipitation_sum,temperature_2m_min,weathercode&timezone=auto&forecast_days=3`
    )
      .then((response) => response.json())
      .then((response) => {
        setTemperature(response.current_weather.temperature + '°C');
        setWind(response.current_weather.windspeed + ' km/h');
        setDaytempsmax(response.daily.temperature_2m_max);
        setDaytempsmin(response.daily.temperature_2m_min);
        setDate(response.daily.time);
        setPrecipitation(response.daily.precipitation_sum[0]);
        const code = response.daily.weathercode[0];
        const video = getBackgroundVideo(code) || 'src/assets/backgrounds/default.mp4';
        setBackgroundVideo(video);
      })
      .catch((error) => console.error('Hava durumu yükleme hatası:', error));
  }, [coordinates]);

  const handleGetWeather = () => {
    fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.results && response.results.length > 0) {
          setResponse(response);
          setCity(response.results[0].name);
          setTempCity(response.results[0].name);
          setCoordinates({
            latitude: response.results[0].latitude,
            longitude: response.results[0].longitude,
          });
        } else {
          alert('Şehir bulunamadı.');
        }
      });
  };

  return (
    <div className="relative h-screen bg-blue-500 w-full flex flex-col items-center justify-center p-4">
      <video
        key={backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-60 pointer-events-none"
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <div className="relative z-10 w-full max-w-md md:max-w-lg lg:max-w-2xl bg-opacity-30 overflow-auto p-4 rounded-lg">
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-white w-full flex items-center justify-between rounded-md px-4 py-2">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search for a location..."
              className="flex-grow bg-transparent text-sky-500 text-center outline-none text-lg md:text-xl"
            />
            <button
              onClick={() => handleGetWeather()}
              className="text-2xl text-sky-500 hover:opacity-80"
            >
              <FaSearchLocation />
            </button>
          </div>
          <div className="flex flex-row items-start space-x-2">
            <TbLocationFilled className="text-3xl md:text-5xl text-sky-500" />
            <h1 className="font-bold text-2xl text-start md:text-4xl text-white">{tempCity}</h1>
          </div>
          <div className="text-center">
            <p className="text-lg md:text-xl text-white">Today</p>
            <p className="text-5xl md:text-7xl text-sky-500">{temperature}</p>
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 text-white">
              <span>Precipitation: {precipitation} mm</span>
              <span>Wind Speed: {wind}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-center text-white mt-4">
          {date.map((date, index) => (
            <div key={index} className="p-3 rounded-md">
              <span>{date}</span>
              <div>Highest: {dayTempsmax[index]}°C</div>
              <div>Lowest: {dayTempsmin[index]}°C</div>
            </div>
          ))}
        </div>
        <div className="flex space-x-4 items-center justify-center mt-4">
        <a
          href="https://github.com/Yusagca"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-2xl md:text-3xl hover:text-sky-500"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/halil-yusa-a%C4%9Fca-26197b1b6/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-2xl md:text-3xl hover:text-sky-500"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://www.instagram.com/yusagca"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-2xl md:text-3xl hover:text-sky-500"
        >
          <FaInstagramSquare />
        </a>
      </div>
      </div>
    </div>
  );
}

export default App;
