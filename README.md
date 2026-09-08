# 🍽️ Food Recipe App

A modern, responsive, and aesthetic **Recipe Discovery and Culinary Companion Web Application** built with React, Tailwind CSS, and the Forkify API.

---

## ✨ Features & Highlights

- 🔍 **Instant Search & Autocomplete**: Search over 1,000,000+ top-rated recipes with search history dropdown, clear buttons, and category chips.
- 🍕 **Interactive Cuisine Categories**: Quick-filter by popular foods (Pizza, Pasta, Burgers, Salads, Desserts, Sushi, Mexican, Vegan, Curry, Steak, and more).
- ⚖️ **Dynamic Servings Scaler**: Live interactive servings multiplier (`-` / `+`) that automatically recalculates ingredient quantities in real-time.
- 📋 **Ingredient Prep Checklist**: Interactive checkboxes with visual progress tracking to prepare your ingredients like a pro chef.
- 🛒 **Integrated Grocery Shopping List**: Slide-over drawer with persistent items, instant clipboard export for messaging, custom item entries, and check-off functionality.
- ⏱️ **Integrated Cooking Timer**: Built-in interactive countdown timer with audio chime completion tones and quick preset buttons.
- ❤️ **Persistent Favorites & Confetti Micro-interaction**: Save favorite recipes to localStorage with confetti celebration and export favorites to JSON.
- 🌓 **Dark / Light Theme Toggle**: Adaptive UI with ambient blur effects, tailored food color accents, and persistent theme settings.
- 📱 **100% Mobile Responsive**: Beautiful glassmorphic design that adapts seamlessly from small phones to large desktop screens.
- 🖨️ **Print Recipe Support**: Clean print view with unwanted controls stripped for the kitchen.

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Styling:** Tailwind CSS 3 (Custom color palette, Glassmorphism, Dark Mode, Micro-animations)
- **Icons:** Lucide React
- **Animations & FX:** Canvas Confetti & Web Audio API Chimes
- **Routing:** React Router DOM v6
- **State Management:** React Context API with LocalStorage Synchronization
- **API:** Forkify API v2

---

## 🚀 Quick Start & Installation

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Run the App Locally
```bash
npm start
```
The app will start at `http://localhost:3000`.

### 3️⃣ Build for Production
```bash
npm run build
```

---

## 📁 Project Architecture

```
src/
 ├── components/
 │    ├── navbar/           # Sticky glassmorphic navbar with search & theme switch
 │    ├── recipe-item/      # Recipe card with image skeleton, tags & favorite toggle
 │    ├── cooking-timer/    # Interactive audio-chime countdown timer
 │    ├── shopping-drawer/  # Slide-over grocery list manager
 │    └── toast/            # Floating toast notification system
 ├── pages/
 │    ├── home/             # Hero search, category chips, sort controls & feed
 │    ├── details/          # Immersive recipe view, servings scaler & checklist
 │    └── favorites/        # Saved recipe collection with search & export
 ├── context/               # Global state with LocalStorage sync & toast dispatcher
 ├── App.js                 # App routing and global drawers/toasts
 ├── index.css              # Custom font typography, glassmorphism, scrollbars
 └── index.js               # Application bootstrap
```

---

## 👨‍💻 Author

**Shreyash Bobalade**
- GitHub: [shreyash-sb](https://github.com/shreyash-sb)
