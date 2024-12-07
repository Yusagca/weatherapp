import { useState, useEffect } from 'react';
import './App.css';
import { TbLocationFilled } from 'react-icons/tb';
import { FaSearchLocation,FaLinkedin,FaGithub,FaInstagramSquare } from 'react-icons/fa';

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
  const [,setResponse] = useState({});
  const [backgroundVideo, setBackgroundVideo] = useState<string | undefined>(undefined);


  // Hava durumuna göre arka plan videosunu belirleme fonksiyonu
const getBackgroundVideo = (code: number) => {
  if (code === 0) {
    return 'dist/backgrounds/clear.mov'; // Açık Hava
  } else if ((code >= 1 && code <= 3)) {
    return 'dist/backgrounds/cloudy.mov'; // Sisli veya Bulutlu
  }else if ((code >= 45 && code <= 48)) {
    return 'dist/backgrounds/fog.mov'; // Sisli veya Bulutlu
  }
   else if (
    (code >= 51 && code <= 67) || // Hafif-Orta Şiddetli Yağmur
    (code >= 80 && code <= 82) || // SağanakYağmur
    (code === 95)                 // Hafif Fırtına
  ) {
    return 'dist/backgrounds/rain.mov'; // Yağmurlu
  } else if (
    (code >= 71 && code <= 77) || // Hafif-Orta Şiddetli Kar Yağışı
    (code >= 85 && code <= 86) || // Kar Sağanağı
    (code >= 96 && code <= 99)    // Şiddetli Fırtına ve Kar
  ) {
    return 'dist/backgrounds/snow.mov'; // Karlı
  } else {
    return 'dist/backgrounds/clear.mov'; // Varsayılan
  }
};


  // Koordinatlar değiştiğinde
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
        setPrecipitation(response.daily.precipitation_sum[0])
        const code = response.daily.weathercode[0];
        const video = getBackgroundVideo(code) || "src/assets/backgrounds/default.mp4";
        setBackgroundVideo(video);

        console.log(code)
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
          console.log(backgroundVideo)
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
    <div className="relative h-[900px] bg-blue-500 w-full flex flex-col items-center justify-center p-11">
      <video
      key={backgroundVideo}
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <div className="relative z-10 h-[500px] w-[490px] rounded-lg bg-opacity-30 object-contain overflow-auto items-center p-2 ">
        <div className="flex flex-row h-[40px] items-center justify-center">
          <div className='bg-white transition-all w-auto flex items-center justify-center h-full rounded-md'>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search for a location..."
            className="bg-transparent text-sky-500 resize-none w-[400px] h-[40px] outline-none text-center items-center text-xl transition ease-in-out delay-150"
          ></input>
          <br />
          <i className='flex items-center justify-center' onClick={() => handleGetWeather()}>
            <FaSearchLocation className="text-3xl hover:opacity-100 opacity-50 text-sky-500 text-center m-4 transition-all cursor-pointer" />
          </i>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <TbLocationFilled className="text-5xl text-sky-500 font-extrabold"></TbLocationFilled>
          <h1 className="font-bold text-6xl text-white p-3">{tempCity}</h1>
        </div>

        <div className="flex flex-col items-center justify-center">
          <span className="p-4 text-5xl font-thin text-white mt-1">
            Today
          </span>
          <span className=" text-6xl font-bold text-sky-500">
            {temperature}
          </span>
          <div className="flex flex-row m-3 gap-4 text-white">
            <span>Precipitation: {precipitation} mm </span>
            <span>Wind Speed: {wind}</span>
          </div>
          <br></br>
          <span className="font-black text-white text-lg">
            DAILY WEATHER
          </span>
        </div>

        <div className="w-full h-auto grid grid-cols-3 grid-rows-2 justify-items-center text-center rounded-2xl p-3 text-white">
          {date.map((date, index) => (
            <span key={index}>{date}</span>
          ))}

          {dayTempsmax.map((maxData, index) => (
            <span key={index}>Highest {maxData}°C</span>
          ))}
          {dayTempsmin.map((minData, index) => (
            <span key={index}>Lowest {minData}°C</span>
          ))}
        </div>
      </div>
      <div className='flex space-x-2 flex-row '>
      <a target="_blank" rel="noopener noreferrer" href="https://github.com/Yusagca" className="relative z-10 text-white mt-4 hover:text-sky-500 transition-all text-3xl"><FaGithub></FaGithub></a>
      <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/halil-yusa-a%C4%9Fca-26197b1b6/" className="relative z-10 text-white mt-4 hover:text-sky-500 transition-all text-3xl"><FaLinkedin></FaLinkedin></a>
      <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/yusagca" className="relative z-10 text-white mt-4 hover:text-sky-500 transition-all text-3xl"><FaInstagramSquare></FaInstagramSquare></a>

      </div>
    </div>
  );
}

export default App;
