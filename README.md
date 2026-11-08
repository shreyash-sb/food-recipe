# 🍽️ FlavorCraft Studio — Recipe Discovery & Culinary Companion

A clean, modern, and responsive **Recipe Discovery and Culinary Web Application** built with an easy and standard tech stack: **React**, **Tailwind CSS**, and **React Router**.

---

## ✨ What Makes It Useful For Everyday Users?

Most recipe websites are slow, cluttered with ads, and locked into rigid serving sizes. FlavorCraft Studio solves everyday cooking headaches with a fast, zero-friction interface:

- 🔍 **Instant Search & Autocomplete**: Search over 1,000,000+ recipes with recent search history and one-click cuisine filters (Pizza, Pasta, Mexican, Vegan, Desserts, etc.).
- ⚖️ **Live Servings Scaler**: Effortlessly adjust portions (`-` / `+`) — ingredient quantities automatically recalculate in real-time so users never have to do mental math.
- 📋 **Prep Checklist with Progress Bar**: Check off ingredients as you measure them to avoid missing a key ingredient.
- 🛒 **Smart Grocery List**: Add all recipe ingredients (or custom items) to a slide-over grocery list, and copy it to the clipboard formatted for WhatsApp or SMS.
- ⏱️ **Cooking Timer**: Built-in countdown timer with pleasant audio chime tones so you never burn a meal.
- ❤️ **Saved Favorites**: Save your favorite meals with instant local browser persistence and JSON export.
- 🌓 **Dark & Light Mode**: Seamless dark mode for comfortable evening cooking.
- 🖨️ **Print View**: Formats cleanly for sticking on the fridge or countertop.

---

## 🛠️ Easy & Clean Tech Stack

No heavy frameworks, complex microservices, or complicated DevOps tooling. Pure, idiomatic frontend architecture:

- **React 18**: Fast component-based user interface
- **Tailwind CSS 3**: Clean, responsive styling with dark mode support
- **React Router 6**: Client-side navigation (Home, Recipe Details, Favorites, 404)
- **Lucide React**: Lightweight, modern SVG icons
- **Forkify API**: Reliable public recipe catalog API

---

## 📁 Clean Project Structure

```
food-app/
├── public/
│   ├── favicon.ico            # Favicon
│   ├── index.html             # SEO & OpenGraph meta tags
│   ├── logo192.png            # Web App Manifest icon
│   ├── logo512.png            # Web App Manifest icon
│   ├── manifest.json          # App manifest
│   └── robots.txt             # Web crawler config
├── src/
│   ├── components/
│   │   ├── cooking-timer/     # Countdown timer with audio chime
│   │   ├── footer/            # Clean branding footer
│   │   ├── navbar/            # Responsive search & navigation bar
│   │   ├── recipe-item/       # Recipe card with image fallback & favorites toggle
│   │   ├── scroll-to-top/     # Auto scroll restoration on navigation
│   │   ├── shopping-drawer/   # Slide-over grocery list with clipboard export
│   │   └── toast/             # Floating toast notifications
│   ├── context/               # Global state with LocalStorage persistence
│   ├── pages/
│   │   ├── details/           # Immersive recipe view & servings scaler
│   │   ├── favorites/         # Saved recipes with live search & JSON export
│   │   ├── home/              # Hero search, cuisine chips & recipe feed
│   │   └── not-found/         # Friendly 404 page with navigation fallbacks
│   ├── services/
│   │   └── api.js             # Centralized recipe fetch client
│   ├── App.js                 # Main app routing
│   ├── App.test.js            # Automated unit tests
│   ├── index.css              # Tailwind styling
│   ├── index.js               # Application bootstrap
│   └── setupTests.js          # Testing setup
├── LICENSE                    # MIT License
├── package.json               # Dependencies & scripts
└── tailwind.config.js         # Theme styling configuration
```

---

## 🚀 Quick Start (2 Steps)

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Start Local Development
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 📦 Production Build & Deployment

To create an optimized production build:
```bash
npm run build
```
This generates a fast, static `build/` folder.

### Easy 1-Click Deployment Options:
- **Vercel**: Import this GitHub repository into Vercel and click **Deploy**.
- **Netlify**: Drag & drop the `build/` folder or connect the repository.
- **GitHub Pages**: Add `"homepage": "."` to `package.json` and deploy using `npm run build`.

---

## 🧪 Run Tests

```bash
npm test
```
All tests pass cleanly.

---

## 👨‍💻 Author

**Shreyash Bobalade**
- GitHub: [@shreyash-sb](https://github.com/shreyash-sb)

## 📄 License
This project is open-source under the [MIT License](LICENSE).
