# 🍽️ FlavorCraft Studio — Recipe Discovery & Culinary Companion

A production-grade, responsive, and aesthetic **Recipe Discovery and Culinary Companion Web Application** built with React 18, Tailwind CSS, and the Forkify API.

---

## ✨ Features & Highlights

- 🔍 **Instant Search & Autocomplete**: Search over 1,000,000+ top-rated recipes with recent search history, instant clear triggers, and autocomplete chips.
- 🍕 **Interactive Cuisine Categories**: Quick-filter by 14+ popular food groups (Pizza, Pasta, Burgers, Salads, Desserts, Sushi, Mexican, Vegan, Curry, Steak, and more).
- ⚖️ **Dynamic Servings Scaler**: Live interactive servings multiplier (`-` / `+`) that automatically recalculates ingredient quantities in real-time.
- 📋 **Ingredient Prep Checklist**: Interactive checkboxes with visual progress tracking to prepare your ingredients like a pro chef.
- 🛒 **Integrated Grocery Shopping List**: Slide-over drawer with persistent items, instant clipboard export for messaging, custom item entries, and check-off functionality.
- ⏱️ **Integrated Cooking Timer**: Built-in interactive countdown timer with Web Audio API chime completion tones and quick adjustment presets.
- ❤️ **Persistent Favorites & Confetti Micro-interaction**: Save favorite recipes to localStorage with confetti celebration and export favorites to JSON.
- 🌓 **Dark / Light Theme Toggle**: Adaptive UI with ambient blur effects, tailored food color accents, and persistent theme settings.
- 📱 **100% Mobile Responsive**: Beautiful glassmorphic design that adapts seamlessly from small mobile screens to ultra-wide displays.
- 🖨️ **Kitchen Print Support**: Dedicated print stylesheet stripping away navigation controls for kitchen use.
- 🛡️ **Graceful 404 & Error Handling**: Custom friendly 404 page with navigation fallbacks and robust network failure recovery.

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Styling:** Tailwind CSS 3 (Custom color palette, Glassmorphism, Dark Mode, Micro-animations)
- **Icons:** Lucide React
- **Animations & FX:** Canvas Confetti & Web Audio API Synthesized Chimes
- **Routing:** React Router DOM v6 (SPA routing with fallback configuration)
- **State Management:** React Context API with LocalStorage Synchronization
- **API Service:** Forkify API v2 (Centralized HTTP client with environment variable configuration)
- **Containerization & Web Server:** Docker multi-stage build + Nginx Alpine

---

## 📁 Project Structure

```
food-app/
├── public/
│   ├── _redirects             # Netlify SPA routing fallback
│   ├── favicon.ico            # Favicon
│   ├── index.html             # Production-optimized HTML with SEO & OpenGraph tags
│   ├── logo192.png            # Web App Manifest icon (192x192)
│   ├── logo512.png            # Web App Manifest icon (512x512)
│   ├── manifest.json          # PWA web app manifest
│   └── robots.txt             # Web crawler configuration
├── src/
│   ├── components/
│   │   ├── cooking-timer/     # Audio chime countdown timer
│   │   ├── footer/            # Responsive branding & credits footer
│   │   ├── navbar/            # Sticky glassmorphic navbar with search & theme switch
│   │   ├── recipe-item/       # Recipe card with image fallback, skeleton & favorites toggle
│   │   ├── scroll-to-top/     # Route-change automatic scroll reset
│   │   ├── shopping-drawer/   # Slide-over grocery list manager with clipboard export
│   │   └── toast/             # Floating toast notification system
│   ├── context/               # Global state with LocalStorage sync & toast dispatcher
│   ├── pages/
│   │   ├── details/           # Immersive recipe view, servings scaler & checklist
│   │   ├── favorites/         # Saved recipe collection with live search & JSON export
│   │   ├── home/              # Hero search, category chips, sort controls & recipe feed
│   │   └── not-found/         # 404 page with quick navigation back to kitchen
│   ├── services/
│   │   └── api.js             # Centralized API service for Forkify v2 endpoints
│   ├── App.js                 # App routing layout and global drawers/toasts
│   ├── App.test.js            # Automated unit and integration test suite
│   ├── index.css              # Custom font typography, glassmorphism, scrollbars
│   ├── index.js               # Application bootstrap
│   ├── reportWebVitals.js     # Web performance telemetry
│   └── setupTests.js          # Jest DOM configuration
├── .dockerignore              # Docker build ignore patterns
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
├── Dockerfile                 # Multi-stage Dockerfile (Node.js -> Nginx Alpine)
├── netlify.toml               # Netlify build & rewrite configuration
├── nginx.conf                 # Production Nginx configuration (gzip, caching, SPA fallback)
├── package.json               # Project manifest, dependencies, and scripts
├── tailwind.config.js         # Tailwind styling tokens and keyframes
└── vercel.json                # Vercel SPA routing rewrite rules
```

---

## 🚀 Local Development

### 1️⃣ Clone and Install Dependencies
```bash
git clone https://github.com/shreyash-sb/food-app.git
cd food-app
npm install
```

### 2️⃣ Configure Environment (Optional)
```bash
cp .env.example .env
```
Default configuration points to the Forkify v2 public API.

### 3️⃣ Start Development Server
```bash
npm start
```
The application will launch at `http://localhost:3000`.

### 4️⃣ Run Test Suite
```bash
npm test
```

### 5️⃣ Create Production Build
```bash
npm run build
```
Creates an optimized static bundle in the `build/` directory ready for deployment.

---

## 🌐 Deployment Guide

### Option 1: Deploy to Vercel (Recommended)
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your `food-app` repository.
4. Framework Preset: **Create React App** (detected automatically).
5. Click **Deploy**.
> The included `vercel.json` automatically configures SPA route rewrites for client-side routing.

---

### Option 2: Deploy to Netlify
1. Push your repository to GitHub.
2. Sign in to [Netlify](https://www.netlify.com) and select **Import from Git**.
3. Settings (automatically read from `netlify.toml`):
   - **Build command:** `npm run build`
   - **Publish directory:** `build`
4. Click **Deploy site**.
> The included `public/_redirects` and `netlify.toml` prevent 404 errors on deep-link refreshes.

---

### Option 3: Deploy with Docker
Run the application inside a lightweight, highly-optimized Nginx Alpine container:

```bash
# 1. Build Docker image
docker build -t flavorcraft-app .

# 2. Run container on port 80 (or port 3000)
docker run -d -p 80:80 --name flavorcraft flavorcraft-app
```
Access the application at `http://localhost`.

---

### Option 4: Deploy to GitHub Pages
1. In `package.json`, set your homepage URL:
   ```json
   "homepage": "https://<your-username>.github.io/<repo-name>"
   ```
2. Install `gh-pages`:
   ```bash
   npm install --save-dev gh-pages
   ```
3. Add deploy scripts to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
4. Run:
   ```bash
   npm run deploy
   ```

---

### Option 5: Static File Hosting (Render / AWS S3 + CloudFront / Firebase Hosting)
- Simply run `npm run build` and upload the contents of the `build/` folder to your static hosting bucket or service. Ensure you configure URL rewriting so all paths fallback to `/index.html`.

---

## 👨‍💻 Author

**Shreyash Bobalade**
- GitHub: [@shreyash-sb](https://github.com/shreyash-sb)

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
