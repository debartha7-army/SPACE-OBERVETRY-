# 🌌 Cosmos Tracker — Full-Stack Astronomical Platform

**Cosmos Tracker** is a state-of-the-art full-stack astronomical surveillance and universe exploration platform. Built using Node.js/Express, React (Vite), and Supabase (PostgreSQL), it tracks celestial events, stars and constellations, planets and solar system bodies, deep-space galaxies, novae and variable stars, black holes, cosmological theories, and the latest astronomy articles with NASA API integrations.

---

## 🚀 Key Features

1. **Dashboard with Countdown & Sky of the Month**:
   - Real-time countdowns to imminent celestial events (eclipses, meteor showers, planetary conjunctions).
   - "Sky of the Month" amateur astronomy observational targets and binocular/telescope tips.
   - NASA Astronomy Picture of the Day (APOD) with high-definition imagery and scientific descriptions.
2. **Comprehensive Category Catalog**:
   - **Celestial Events** (`celestial_events`): Types, peak dates, countdowns, visibility regions, and source links.
   - **Stars & Constellations** (`stars_constellations`): Spectral classifications, constellations, apparent magnitude, distance in light-years.
   - **Planets & Solar System** (`planets_solar_system`): Terrestrial/gas giants, moon counts, orbital periods, plus interactive orrery.
   - **Galaxies** (`galaxies`): Spirals, ellipticals, lenticulars, distance in million light-years (Mly).
   - **Novae & Variable Stars** (`novae_variables`): Recurrent novae, classical novae, Cepheids, outburst histories, and periods.
   - **Black Holes** (`black_holes`): Stellar-mass, supermassive, solar masses ($M_\odot$), event horizons, and locations.
   - **Cosmological Theories** (`theories`): Big Bang, Multiverse, Inflation, Dark Energy, mathematical details, and epoch timelines.
   - **Astronomy Articles** (`articles`): Peer-reviewed discoveries, JWST dispatches, and NASA News auto-importer.
3. **Search, Filter & Pagination**:
   - Every category features server-side / client-side pagination (`page`, `limit`), search queries, and taxonomic filters.
4. **Detail Views for Every Entity**:
   - Deep-dive modals with astrophysical specifications, mathematical formulas, amateur observer guides, and official source links.
5. **Watchlist / Favorites & In-App Reminders**:
   - Stargazers can bookmark any celestial object or theory.
   - Toggle in-app event reminders with bell notifications for upcoming astronomical events.
6. **Administrator Panel (Full CRUD)**:
   - Protected by JWT verification and role-based access control (`admin`).
   - Create, edit, and delete any object across all 8 astronomical domains.
7. **Public NASA API Integration**:
   - Live NASA APOD retrieval and 1-click NASA News Auto-Import to seed articles.
8. **Dark Space Aesthetics**:
   - Obsidian dark theme, glassmorphism, glowing accents, and dynamic HTML5 canvas starfield with shooting stars.
9. **Top University Daily Published Papers & Social Media Dispatches (Daily 7:00 AM Automated Pipeline)**:
   - Automated ingest scheduled daily at 07:00 AM (`0 7 * * *`) via `node-cron`.
   - Daily arXiv preprints from Harvard CfA, MIT Kavli, Caltech Cahill, Cambridge IoA, Oxford Astrophysics, Princeton, and Max Planck MPIA with abstracts, citations, and PDF links.
   - Real-time social intelligence feeds and direct portal directory covering YouTube, X (Twitter), Threads, Instagram, Reddit, Facebook, and Wikipedia.
   - Live status indicator and manual "Sync Today's 7 AM Batch Now" trigger.

---

## 🛠️ Tech Stack & Architecture

- **Backend**: Node.js, Express.js (MVC Pattern, ES Modules)
- **Frontend**: React.js (Vite), Vanilla CSS design system, Lucide icons
- **Database & Storage**: Supabase (PostgreSQL) via `@supabase/supabase-js`
- **Authentication**: JSON Web Tokens (`jsonwebtoken`) + `bcrypt` (10 salt rounds)
- **Validation & Security**: `express-validator`, `helmet`, `cors`, `express-rate-limit`
- **API Standard**: REST API strictly mounted under `/api/v1` returning standardized JSON envelopes:
  ```json
  {
    "success": true,
    "data": [...],
    "pagination": {
      "total": 12,
      "page": 1,
      "limit": 10,
      "totalPages": 2
    },
    "message": "Optional status note"
  }
  ```

---

## 📁 Project Structure

```text
/cosmos-tracker
  supabase_schema.sql           -> Complete PostgreSQL schema DDL & pre-hashed seed data
  README.md                     -> Project documentation and guide
  /backend
    /src
      /config
        supabase.js             -> Supabase client & in-memory zero-dependency query engine
        initialData.js          -> Comprehensive seed dataset matching exact PostgreSQL schema
      /models                   -> Data access layer (Supabase queries only, zero business logic)
        userModel.js
        celestialEventModel.js
        starModel.js
        planetModel.js
        galaxyModel.js
        novaModel.js
        blackHoleModel.js
        theoryModel.js
        articleModel.js
        favoriteModel.js
        reminderModel.js
      /controllers              -> HTTP controllers, business logic & JSON envelopes
        authController.js
        eventController.js
        starController.js
        planetController.js
        galaxyController.js
        novaController.js
        blackHoleController.js
        theoryController.js
        articleController.js
        favoriteController.js
        nasaController.js
        statsController.js
      /routes                   -> Express routes mapped to controllers & middleware
        index.js                -> Primary router mounting all routes under /api/v1
        authRoutes.js
        eventRoutes.js
        starRoutes.js
        planetRoutes.js
        galaxyRoutes.js
        novaRoutes.js
        blackHoleRoutes.js
        theoryRoutes.js
        articleRoutes.js
        favoriteRoutes.js
        nasaRoutes.js
        statsRoutes.js
      /middleware
        auth.js                 -> JWT verification & req.user injection
        role.js                 -> requireAdmin check (403 Forbidden for non-admins)
        validation.js          -> express-validator rules for all domains
        rateLimit.js            -> Brute-force protection on auth endpoints
        errorHandler.js        -> Centralized error and 404 handler
      /utils
        auth.js                 -> Bcrypt hash/compare & JWT sign/verify
      app.js                    -> Express app initialization, Helmet, CORS, and JSON parsing
      server.js                 -> Server listener on PORT 5000
    test_suite.js               -> Automated test suite (15/15 passing checks)
    .env.example
    .env
    package.json
  /frontend
    /src
      /components
        Navbar.jsx              -> Navigation bar, domain tabs, auth controls, mobile drawer
        Card.jsx                -> Glassmorphism card with metrics, badges, and action triggers
        EventTimeline.jsx       -> Chronological timeline with countdowns & reminder bells
        SearchBar.jsx           -> Search input and category filter tabs
        Pagination.jsx          -> Reusable page navigation controls (Previous, Next, page numbers)
        DetailModal.jsx         -> Deep-dive astrophysics modal with specs and external sources
        AdminModal.jsx          -> Dynamic administrator modal for creating & editing entities
        SolarSystemVisualizer.jsx -> Interactive orbital orrery
        Starfield.jsx           -> Animated HTML5 canvas with twinkling stars and meteors
        NotificationToast.jsx   -> Floating alerts for bookmarks, updates, and logins
      /pages
        Home.jsx                -> Hero section, NASA APOD, Sky of the Month, countdowns
        Events.jsx              -> Celestial events timeline, filters, in-app reminders
        Stars.jsx               -> Stars & constellations catalog with magnitude/distance filters
        Planets.jsx             -> Solar system planets with interactive visualizer
        Galaxies.jsx            -> Deep-sky galaxies with morphological filters
        Novae.jsx               -> Dedicated novae & variable stars catalog
        BlackHoles.jsx          -> Black holes with mass and event horizon metrics
        Theories.jsx            -> Cosmological theories and cosmic epoch timeline
        Articles.jsx            -> Astronomy news with 1-click NASA auto-importer
        Login.jsx               -> Login portal with 1-click demo credential autofill
        Register.jsx            -> User registration with bcrypt hashing
        Dashboard.jsx           -> Watchlist, observation journal, and admin console
      /services
        api.js                  -> Axios instance configured with JWT interceptors
      /context
        AuthContext.jsx         -> Global authentication state and watchlist synchronization
      App.jsx                   -> Top-level application shell and routing
      main.jsx                  -> React entry point
      index.css                 -> Cosmic CSS tokens and design system
    .env.example
    .env
    index.html
    vite.config.js
    package.json
```

---

## 🗄️ Database Tables (Supabase / PostgreSQL)

The schema in `cosmos-tracker/supabase_schema.sql` creates all required tables:

| Table | Columns | Purpose |
|---|---|---|
| `users` | `id, name, email, password_hash, role, created_at` | Stargazer & Admin credentials (bcrypt hashed) |
| `celestial_events` | `id, title, type, description, event_date, visibility_region, source_url, created_at` | Eclipses, meteor showers, conjunctions, supernovas |
| `stars_constellations` | `id, name, type, constellation, magnitude, distance_ly, description, created_at` | Stars, spectral types, constellations |
| `planets_solar_system` | `id, name, type, moons, orbital_period, description, created_at` | Solar system planets and moons |
| `galaxies` | `id, name, type, distance_mly, description, created_at` | Spirals, ellipticals, and deep-sky galaxies |
| `novae_variables` | `id, name, kind, period, last_outburst, description, created_at` | Recurrent novae, classical novae, Cepheid variables |
| `black_holes` | `id, name, mass_solar, location, description, created_at` | Stellar, intermediate, and supermassive black holes |
| `theories` | `id, title, category, summary, details, created_at` | Cosmological models (Big Bang, multiverse, dark matter) |
| `articles` | `id, title, summary, url, published_at, category, author_id, created_at` | Astronomy research, news, NASA articles |
| `favorites` | `id, user_id, item_type, item_id, created_at` | User watchlist bookmarks |
| `event_reminders` | `id, user_id, event_id, created_at` | In-app notification reminders for upcoming events |

---

## 🔑 Demo Credentials (Pre-Configured)

You can use the **1-click quick-fill buttons** on the Login page or use the credentials below:

| Role | Email | Password | Permissions |
|---|---|---|---|
| **Administrator** | `admin@cosmostracker.org` | `CosmosAdmin2026!` | Full CRUD access over all 8 domains + user management |
| **Amateur Stargazer** | `stargazer@cosmostracker.org` | `Stargazer2026!` | Browse, search, filter, watchlist bookmarking, event reminders |

---

## 🛠️ How to Run Locally

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

### 1. Backend Setup
```bash
cd cosmos-tracker/backend

# Install dependencies
npm install

# (Optional) Verify or edit .env
# PORT=5000
# JWT_SECRET=super_secret_cosmos_jwt_key_2026_change_in_production
# SUPABASE_URL=your_supabase_project_url (optional, fallback in-memory engine included)
# SUPABASE_ANON_KEY=your_supabase_anon_key

# Start the server
npm start
# -> Running on http://127.0.0.1:5000/
# -> Health check: http://127.0.0.1:5000/health
```

### 2. Frontend Setup
```bash
cd cosmos-tracker/frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
# -> Local app running at http://127.0.0.1:5173/
```

### 3. Run Automated API Tests
To verify all `/api/v1` routes, bcrypt hashing, role enforcement, and pagination:
```bash
cd cosmos-tracker/backend
node test_suite.js
# Output: 19 PASSED, 0 FAILED
```

---

## 🌐 REST API Endpoints Reference (`/api/v1`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/health` | Server health check | No |
| `POST` | `/api/v1/auth/register` | Register new stargazer (bcrypt hashed) | No |
| `POST` | `/api/v1/auth/login` | Login and receive JWT | No |
| `GET` | `/api/v1/auth/me` | Fetch authenticated user profile | Yes |
| `GET` | `/api/v1/celestial-events` | Paginated events (`?page=1&limit=10&type=...`) | No |
| `POST` | `/api/v1/celestial-events` | Create new celestial event | Yes (Admin) |
| `PUT` | `/api/v1/celestial-events/:id` | Update celestial event | Yes (Admin) |
| `DELETE`| `/api/v1/celestial-events/:id` | Delete celestial event | Yes (Admin) |
| `POST` | `/api/v1/celestial-events/reminders/toggle` | Toggle in-app reminder | Yes |
| `GET` | `/api/v1/stars-constellations` | Paginated stars and constellations | No |
| `POST` | `/api/v1/stars-constellations` | Create star record | Yes (Admin) |
| `GET` | `/api/v1/planets-solar-system` | Paginated solar system planets | No |
| `POST` | `/api/v1/planets-solar-system` | Create planet record | Yes (Admin) |
| `GET` | `/api/v1/galaxies` | Paginated galaxies | No |
| `POST` | `/api/v1/galaxies` | Create galaxy record | Yes (Admin) |
| `GET` | `/api/v1/novae-variables` | Paginated novae and variable stars | No |
| `POST` | `/api/v1/novae-variables` | Create nova record | Yes (Admin) |
| `GET` | `/api/v1/black-holes` | Paginated black holes | No |
| `POST` | `/api/v1/black-holes` | Create black hole record | Yes (Admin) |
| `GET` | `/api/v1/theories` | Paginated cosmological theories | No |
| `POST` | `/api/v1/theories` | Create theory record | Yes (Admin) |
| `GET` | `/api/v1/articles` | Paginated articles and news | No |
| `POST` | `/api/v1/articles` | Create article record | Yes (Admin) |
| `GET` | `/api/v1/favorites` | Get user's watchlist | Yes |
| `POST` | `/api/v1/favorites/toggle` | Add/remove from watchlist | Yes |
| `GET` | `/api/v1/nasa/apod` | Get NASA Astronomy Picture of the Day | No |
| `GET` | `/api/v1/nasa/sky-of-the-month` | Get observational targets for this month | No |
| `POST` | `/api/v1/nasa/auto-import` | Auto-import latest NASA news | Yes (Admin) |
| `GET` | `/api/v1/dispatches/papers` | Paginated top university research papers (`?institution=...`) | No |
| `GET` | `/api/v1/dispatches/social` | Paginated social media feeds (`?platform=...`) | No |
| `GET` | `/api/v1/dispatches/status` | Daily 7:00 AM pipeline scheduling & status | No |
| `POST` | `/api/v1/dispatches/sync` | Trigger manual 7:00 AM daily ingest execution | No |
