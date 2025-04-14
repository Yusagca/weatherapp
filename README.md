
# HaloWeather ☁️🌤️🌎

> A modern, interactive and multilingual weather app with map-based search experience powered by Open-Meteo and React.

---

## 🌐 Description / Açıklama

**EN:**  
HaloWeather is an interactive weather forecasting application that allows users to explore current and future weather data through a map interface. The app supports multilingual search (city/state/country), dynamic weather displays, and zoomable global navigation.

**TR:**  
HaloWeather, kullanıcıların dünya haritası üzerinden şehir/semt/seviye bazlı hava durumu verilerini görüntülemesini sağlayan, çok dilli destekli, modern bir hava durumu uygulamasıdır. Harita üzerinden şehir arayabilir, hava durumunu anlık olarak görebilir, yaklaşarak detaylara ulaşabilirsiniz.

---

## 🚀 Features / Özellikler

✅ Real-time weather data (current, hourly, daily)  
✅ Multilingual support (EN / TR)  
✅ City + State + Country based search results  
✅ Responsive design (Mobile/Desktop optimized)  
✅ Dynamic red ping marker for selected location  
✅ Hoverable country highlighting  
✅ Soft zoom & pan transitions with animation  
✅ TailwindCSS styled modern interface  
✅ Weather charts and forecast with visual icons  
✅ Smooth UI with dark/light mode support

---

## 🔍 Usage / Kullanım

1. **Open the App:**  
   [🌐 Live Demo](https://haloweather.vercel.app)

2. **Search Locations:**  
   Start typing 3+ characters to search for cities or regions.  
   Results are shown with City, State, Country.

3. **Explore on Map:**  
   The map zooms and highlights selected locations with a red marker.  
   Only states have weather markers. Cities are used for precision search.

4. **Check Details:**  
   View current weather, apparent temp, humidity, wind, UV, sunrise/sunset.

5. **Chart Preview:**  
   See 3-day forecast and temperature chart for selected location.

---

## 🛠️ Technologies Used

- **React** – SPA architecture
- **TailwindCSS** – UI styling & animations
- **Vite** – Lightning-fast build tool
- **Open-Meteo API** – Real-time weather forecast provider
- **React Simple Maps** – Interactive SVG-based map rendering
- **i18next** – Multilingual localization system
- **Recharts** – Weather data visualization (line charts)

---

## 📁 Project Structure

```bash
📦 src/
├── App.jsx              # Main app logic and state
├── components/
│   └── MapChart.jsx     # Interactive map component
├── i18n.js              # Language config
├── locales/             # Translation JSON files
├── assets/              # Icons, backgrounds, styles
└── countries_states_cities.json  # World location data
```

---

## 🧑‍💻 Development

```bash
# Install dependencies
npm install

# Start dev server (host mode)
npm run dev -- --host

# Deploy to Vercel
vercel --prod
```

---

## 🌍 Localization & Search Logic

- Every search result checks both original name and translated `country.translations[language]`
- Cities inherit country translations + state names for complete location strings
- Results are shown as: `Reykjavík, Capital, Iceland` or `İstanbul, Marmara, Türkiye` based on locale

---

## ⚙️ Environment Requirements

- Node.js 18+
- Vercel account (for deployment)
- Modern browser for full visual support

---

## 🧑‍🎨 Author & Contact

- **GitHub:** [Yusagca](https://github.com/Yusagca)
- **Email:** hyagca@hotmail.com  
- **LinkedIn:** [Halil Yuşa Ağca](https://www.linkedin.com/in/halil-yusa-a%C4%9Fca-26197b1b6/)

---

## 🎉 Live Demo

[🔗 https://haloweather.vercel.app](https://haloweather.vercel.app)

Happy weather tracking! ☀️🌧️❄️
