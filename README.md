
# 🌎 HaloWeather — The Ultimate Weather Experience 💫

> A breathtakingly modern, map-driven, multilingual weather application powered by React, Open-Meteo, and a sprinkle of frontend magic ✨

---

## 🧠 What is HaloWeather?

**EN:**  
HaloWeather is not just another weather app. It’s your personal climate explorer. Powered by real-time weather APIs, enhanced with interactive maps, and optimized with blazing-fast Vite + React, this app delivers detailed meteorological insights with a truly global perspective.

**TR:**  
HaloWeather sadece bir hava durumu uygulaması değil, senin kişisel iklim keşif rehberin. Gerçek zamanlı verilerle donatılmış, harita ile etkileşimli hale getirilmiş ve Vite + React ile ışık hızında çalışan bu uygulama, dünyanın dört bir yanından hava durumu verilerini etkileyici bir deneyimle sunar.

---

## 🚀 Features That Set It Apart

- 🔎 **Smart Multilingual Search**: Search any city or state globally with support for locale-aware translations (EN/TR). Start typing just 3 characters and discover intelligent results.
- 🌐 **Hierarchical Location Display**: Results formatted as `City, State, Country`, dynamically adapting to language.
- 🗺️ **Interactive World Map**: Explore global states with hover highlights, click-activated detail markers, and country-level color emphasis.
- 📍 **Animated Selection Marker**: The chosen location is spotlighted with a pulsating red circle—clean, minimal, and impossible to miss.
- 🌤️ **Real-Time Weather Data**: View live temperature, humidity, wind speed, UV index, visibility, sunrise/sunset and apparent temperature.
- 📊 **Weather Visualization**: Integrated charts showcasing daily highs and lows using Recharts.
- 🎨 **Flawless Theming**: Full dark/light mode support with smooth Tailwind transitions.
- 📱 **Fully Responsive**: Stunning performance across mobile, tablet and desktop.

---

## 🔍 How It Works

1. **Start Searching**  
   Type 3+ characters and get smart results across all cities and states—search respects the selected UI language.

2. **Select a Location**  
   Once clicked, the map zooms smoothly with animated transitions. A red glowing marker locks on the destination.

3. **Explore the Weather**  
   See today’s weather at a glance and inspect a 3-day forecast with custom visuals, all sourced from Open-Meteo.

4. **Stay Immersed**  
   Enjoy hover-reactive countries, clean typography, smooth zoom/pan effects, and weather-aware UX elements.

---

## 🛠️ Tech Stack

| Technology     | Purpose                                     |
|----------------|---------------------------------------------|
| **React**       | Dynamic user interface                     |
| **Vite**        | Ultra-fast bundling and HMR                |
| **TailwindCSS** | Modern, utility-first styling              |
| **Open-Meteo API** | Real-time weather data feed           |
| **React Simple Maps** | Interactive SVG-based world map    |
| **Recharts**    | Weather forecast data visualization        |
| **i18next**     | Seamless localization (EN/TR)              |

---

## 📁 Folder Structure

```bash
📦 src/
├── App.jsx              # Main logic & weather state
├── components/
│   └── MapChart.jsx     # Fully dynamic and interactive map
├── i18n.js              # Language setup and resources
├── locales/             # en.json, tr.json
├── assets/              # Custom weather icons
└── countries_states_cities.json  # Enriched location data
```

---

## 🧑‍💻 Development & Deployment

```bash
# Install dependencies
npm install

# Start local dev server with LAN sharing
npm run dev -- --host

# Deploy to Vercel in one command
vercel --prod
```

> 🌐 Public demo: [haloweather.vercel.app](https://haloweather.vercel.app)

---

## 🌍 Search & Localization Logic

- Minimum 3 characters to trigger smart search
- Supports matching by translated `country.translations[locale]`
- Cities inherit country translations and parent state names
- Clean display formatting:  
  `"Adana, Adana, Türkiye"` or `"Reykjavík, Capital, Iceland"`

---

## 📦 Requirements

- Node.js >= 18
- Internet access for API requests
- Modern browser with SVG support
- Optional: Vercel account for 1-click deployment

---

## 🤝 Contact

- **GitHub:** [Yusagca](https://github.com/Yusagca)
- **LinkedIn:** [Halil Yuşa Ağca](https://www.linkedin.com/in/halil-yusa-a%C4%9Fca-26197b1b6/)
- **Mail:** hyagca@hotmail.com

---

## 🔥 Final Words

HaloWeather is not just technically solid—it’s emotionally intuitive.  
From hovering over countries to watching a red marker pulse on a state you love, it’s a delightful experience from start to forecast.

**Try it. Feel it. Ship it.** 🚢☁️
