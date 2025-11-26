# 🌍 AQI Check - Real-time Air Quality Explorer

**AQI Check** is a robust full-stack application designed to monitor real-time Air Quality Index (AQI) and weather metrics for any city globally.

It features a modern, responsive React frontend with glassmorphism aesthetics and smooth animations, backed by a high-performance Node.js/Express server that handles caching, rate-limiting, and secure data proxying.

## 🚀 Key Features

### 🎨 Frontend (User Experience)

- **Global Search:** Instant search for any city worldwide using the WAQI database.
- **📍 Locate Me:** One-click geolocation to fetch air quality for your exact coordinates.
- **Smart History:** Automatically saves recent searches to LocalStorage for quick access.
- **Visual Data:** Color-coded AQI indicators (Good to Hazardous) and pollutant breakdowns (PM2.5, NO2, O3, etc.).
- **Responsive Design:** Fully adaptive layout that works seamlessly on Mobile, Tablet, and Desktop.
- **Animations:** Smooth layout transitions and entrance animations using Framer Motion.

### ⚙️ Backend (Engineering & Performance)

- **🛡️ Secure Proxy:** Hides the API Token from the client-side; all external requests are routed through the server.
- **⚡ Caching Strategy:** Implements in-memory caching to store API responses. If a user searches for "London" twice, the second result is served instantly from RAM, saving API quota.
- **🚦 Rate Limiting:** Uses `express-rate-limit` to prevent abuse and protect the external API quota (100 requests/10 mins per IP).
- **🔍 Smart Suggestion API:** A dedicated endpoint that proxies search suggestions, filtering and formatting data before it reaches the UI.

---

## 🛠️ Tech Stack

### Frontend

- **Framework:** React 19 (Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **HTTP Client:** Axios

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Utilities:** `node-cache` (Caching), `express-rate-limit` (Security), `cors`

---

## 🏁 Getting Started

Follow these instructions to run the project locally on your machine.

### Prerequisites

- **Node.js:** Ensure you have Node.js installed (v18+ recommended).
- **WAQI API Token:** You need a free API token from [aqicn.org](https://aqicn.org/data-platform/token/).

### 1. Clone the Repo

```bash
git clone https://github.com/surajbkale/AQI-Check.git
```

### 2. Setup Fronted

```bash
cd frontend

# install node modules
npm install

# copy .env.example to .env

# Run the frontend
npm run dev
```

### 3. Setup Backend

```bash
cd Backend

# install node modules
npm install

# copy .env.example to .env
# add your environment variables

# Run the Backend
npm run dev
```

### 4. Setup Backend

now you should be able to access the frontend on **_http://localhost:5173_**

and backend at **_http://localhost:3000_**

### Project stracture

```bash
AQICheck/
├
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── hooks/
    │   └── App.tsx
    └── package.json

```
