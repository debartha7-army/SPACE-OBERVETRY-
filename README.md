# SPACE-OBERVETRY-

🌌 **Cosmos Tracker — Full-Stack Astronomical & Cosmological Observatory**

Cosmos Tracker is an all-in-one astronomical web platform designed for stargazers, amateur astronomers, and astrophysicists to track celestial events, solar system bodies, variable stars, deep-sky galaxies, black holes, cosmological theories, academic research papers, and live social astronomy feeds.

---

## 🚀 Key Features

- **Heliocentric Solar System & Orrery**:
  - Full interactive 2D orbital model of the Solar System.
  - Complete planetary lineup: Terrestrial planets, Gas Giants, Ice Giants (**Uranus**, **Neptune**), and Dwarf Planets (**Pluto, Ceres, Eris, Haumea, Makemake, Quaoar, Orcus, Sedna, Gonggong**).
  - **All Moons Explorer**: Catalogs 24 major natural satellites (Ganymede, Titan, Europa, Triton, Enceladus, Io, Charon, etc.) with diameters, orbital periods, and authentic NASA imagery.
  - **Main Asteroid Belt**: Detailed circumstellar torus architecture, Kirkwood gaps, and protoplanets (**4 Vesta, 16 Psyche, 2 Pallas**).

- **Celestial Events & Reminders**:
  - Countdown tracking for total solar eclipses, meteor showers (Perseids, Geminids), and planetary oppositions.
  - In-app reminder toggling and custom alerts.

- **Deep Space & Stellar Catalog**:
  - Variable stars and novae (**T Coronae Borealis**, Eta Carinae, Mira).
  - Supermassive black holes (**TON 618, M87\*, Sagittarius A\*, Cygnus X-1**).
  - Galaxies (**Andromeda M31, Whirlpool M51, Sombrero M104**).

- **Cosmological Theories & Academic Hub**:
  - Deep-dive theoretical guides on the Big Bang, Cosmic Inflation, Multiverse, and String Theory.
  - **Top University Research Papers**: Daily updated preprints from Harvard, MIT, Caltech, Cambridge, Oxford, Princeton, and Max Planck Institute.
  - **Social Astronomy Feeds**: Aggregated feeds from YouTube, X, Reddit, Threads, and Wikipedia.
  - **Automated Cron Pipeline**: Scheduled daily at 7:00 AM (`0 7 * * *`) via Node-cron.

- **Authentication & Security**:
  - JWT-based authentication with Bcrypt password hashing (rounds 10–12).
  - Role-based access control (Admin / Stargazer).
  - Seamless auto-registration for instant onboarding.

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Vanilla CSS design system, Lucide icons.
- **Backend**: Node.js, Express.js (MVC Architecture).
- **Database & Query Engine**: Supabase (PostgreSQL) client with in-memory resilient fallback store.
- **Scheduler**: Node-cron (`0 7 * * *`).
- **Security**: JWT (`jsonwebtoken`), Bcrypt password hashing (`bcrypt`).

---

## 🏃 Quick Start

### 1. Clone & Setup
```bash
git clone https://github.com/debartha7-army/SPACE-OBERVETRY-.git
cd SPACE-OBERVETRY-
```

### 2. Backend Setup
```bash
cd cosmos-tracker/backend
npm install
npm run dev
# Running on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
# Running on http://localhost:5173
```

---

## 🧪 Automated Testing
To run the automated verification test suite:
```bash
cd cosmos-tracker/backend
node test_suite.js
# 21/21 Automated tests passing
```
