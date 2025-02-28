import { useState, useEffect } from 'react';
import './App.css';
import { TbLocationFilled } from 'react-icons/tb';
import {
  FaSearch,
  FaLinkedin,
  FaGithub,
  FaInstagramSquare,
} from 'react-icons/fa';

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
  const [backgroundVideo, setBackgroundVideo] = useState<string | undefined>(
    undefined
  );
  const [error, setError] = useState('');

  const getBackgroundVideo = (code: number) => {
    if (code === 0) {
      return 'backgrounds/clear.mov';
    } else if (code >= 1 && code <= 3) {
      return 'backgrounds/cloudy.mov';
    } else if (code >= 45 && code <= 48) {
      return 'backgrounds/fog.mov';
    } else if (
      (code >= 51 && code <= 67) ||
      (code >= 80 && code <= 82) ||
      code === 95
    ) {
      return 'backgrounds/rain.mov';
    } else if (
      (code >= 71 && code <= 77) ||
      (code >= 85 && code <= 86) ||
      (code >= 96 && code <= 99)
    ) {
      return 'backgrounds/snow.mov';
    } else {
      return 'backgrounds/clear.mov';
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
        const video =
          getBackgroundVideo(code) || 'src/assets/backgrounds/default.mp4';
        setBackgroundVideo(video);
      })
      .catch((error) => {
        console.error('Hava durumu yükleme hatası:', error);
        setError('Failed to load weather data. Please try again later.');
      });
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
          setError('City not found. Please try a different search.');
        }
      })
      .catch((error) => {
        console.error('API error:', error);
        setError('Failed to search for city. Please try again later.');
      });
  };

  return (
    <div className="relative h-screen bg-blue-500 w-full flex flex-col items-center justify-between">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg py-3 px-6 flex justify-between items-center z-40">
        <div className="flex items-center space-x-2">
          {/* Logo */}
          <TbLocationFilled className="text-3xl" />
          <h1 className="text-xl font-bold tracking-wide">Weather by Yusa</h1>
        </div>
        <ul className="flex space-x-6">
          <li>
            <a
              href="#home"
              className="text-white text-lg hover:text-sky-300 transition duration-200"
            >
              Home
            </a>
          </li>
          
        </ul>
      </nav>

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

      <div className="flex justify-center items-center h-screen w-full bg-gradient-to-b from-blue-500 to-sky-500">
        <div className="relative z-10 w-full max-w-md md:max-w-lg lg:max-w-2xl bg-gradient-to-r from-sky-500 to-blue-600 shadow-xl rounded-2xl p-6 text-white">
          <div className="flex flex-col items-center space-y-6">
            {/* Arama Kutusu */}
            <div className="bg-white w-full flex items-center justify-between rounded-lg px-4 py-2 shadow-lg">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Search for a location..."
                className="flex-grow bg-transparent text-gray-700 text-lg outline-none placeholder-gray-400"
              />
              <button
                onClick={handleGetWeather}
                className="text-sky-500 hover:text-blue-600 transition duration-200 text-2xl"
              >
                <FaSearch />
              </button>
            </div>

            {/* Şehir ve İkon */}
            <div className="flex items-center space-x-4">
              <TbLocationFilled className="text-white text-4xl" />
              <h1 className="text-3xl font-semibold tracking-wide">
                {tempCity}
              </h1>
            </div>

            {/* Güncel Sıcaklık */}
            <div className="text-center">
              <p className="text-lg">Today</p>
              <p className="text-6xl font-bold">{temperature}</p>
            </div>

            {/* Detaylar */}
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium">Precipitation</span>
                <span className="text-xl">{precipitation} mm</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium">Wind Speed</span>
                <span className="text-xl">{wind}</span>
              </div>
            </div>

            {/* Günlük Tahminler */}
            <div className="w-full grid grid-cols-3 gap-4 mt-4">
              {date.map((day, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center bg-white bg-opacity-20 rounded-xl p-3 shadow-md hover:bg-opacity-30 transition duration-200"
                >
                  <span className="text-sm font-medium">{day}</span>
                  <div className="text-center">
                    <p className="text-base font-semibold">
                      High: {dayTempsmax[index]}°C
                    </p>
                    <p className="text-base">Low: {dayTempsmin[index]}°C</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-4 px-6 flex flex-col md:flex-row items-center justify-center z-40 shadow-lg">
        <div className="flex items-center space-x-6">
          <a
            href="https://github.com/Yusagca"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl hover:text-sky-300 transition duration-200"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/halil-yusa-a%C4%9Fca-26197b1b6/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl hover:text-sky-300 transition duration-200"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.instagram.com/yusagca"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl hover:text-sky-300 transition duration-200"
          >
            <FaInstagramSquare />
          </a>
        </div>
      </footer>

      {/* Error Modal */}
      {error && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md w-full mx-4">
            <h2 className="text-red-500 text-xl font-bold mb-4">Error</h2>
            <p className="text-gray-700">{error}</p>
            <button
              onClick={() => setError('')}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
