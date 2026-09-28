-- ==============================================================================
-- COSMOS TRACKER - SUPABASE / POSTGRESQL DATABASE SCHEMA & SEED DATA
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CELESTIAL EVENTS TABLE
CREATE TABLE IF NOT EXISTS celestial_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL, -- eclipse, meteor shower, conjunction, supernova, transit, etc.
  description TEXT,
  event_date DATE NOT NULL,
  visibility_region TEXT,
  source_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. STARS & CONSTELLATIONS TABLE
CREATE TABLE IF NOT EXISTS stars_constellations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL, -- e.g. Main Sequence (A1V), Red Supergiant (M1-2), Cepheid, Blue Giant
  constellation VARCHAR(100) NOT NULL,
  magnitude VARCHAR(50),
  distance_ly VARCHAR(50),
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PLANETS & SOLAR SYSTEM TABLE
CREATE TABLE IF NOT EXISTS planets_solar_system (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  type VARCHAR(100) NOT NULL, -- Terrestrial Planet, Gas Giant, Ice Giant, Dwarf Planet
  moons INT DEFAULT 0,
  orbital_period VARCHAR(100),
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. GALAXIES TABLE
CREATE TABLE IF NOT EXISTS galaxies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL, -- Spiral, Barred Spiral, Giant Elliptical, Lenticular, Irregular
  distance_mly VARCHAR(50),
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. NOVAE & VARIABLE STARS TABLE
CREATE TABLE IF NOT EXISTS novae_variables (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  kind VARCHAR(100) NOT NULL, -- Classical Nova, Recurrent Nova, Cepheid Variable, Mira Variable, Cataclysmic
  period VARCHAR(100),
  last_outburst VARCHAR(100),
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. BLACK HOLES TABLE
CREATE TABLE IF NOT EXISTS black_holes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  mass_solar VARCHAR(100) NOT NULL,
  location VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. THEORIES TABLE
CREATE TABLE IF NOT EXISTS theories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL, -- universe, multiverse, dark matter, quantum gravity, cosmic fate
  summary TEXT NOT NULL,
  details TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. ARTICLES TABLE
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  summary TEXT NOT NULL,
  url TEXT,
  published_at DATE DEFAULT CURRENT_DATE,
  category VARCHAR(100) NOT NULL,
  author_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. FAVORITES / WATCHLIST TABLE
CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  item_type VARCHAR(50) NOT NULL,
  item_id VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, item_type, item_id)
);

-- 11. EVENT REMINDERS TABLE
CREATE TABLE IF NOT EXISTS event_reminders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  event_id UUID REFERENCES celestial_events(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, event_id)
);

-- Indexes for optimal querying and pagination
CREATE INDEX IF NOT EXISTS idx_celestial_events_date ON celestial_events(event_date);
CREATE INDEX IF NOT EXISTS idx_stars_constellation ON stars_constellations(constellation);
CREATE INDEX IF NOT EXISTS idx_articles_date ON articles(published_at);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_reminders_user ON event_reminders(user_id);

-- ==============================================================================
-- INITIAL SEED DATA (Includes Bcrypt pre-hashed user credentials)
-- ==============================================================================

-- Pre-seeded Users (Passwords hashed with bcrypt 10 rounds):
-- Admin: admin@cosmostracker.org / CosmosAdmin2026!
-- User: stargazer@cosmostracker.org / Stargazer2026!
INSERT INTO users (id, name, email, password_hash, role) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Cosmos Administrator', 'admin@cosmostracker.org', '$2b$10$SBXxip/Cm3IZq81yvpHe0uqHz4jFMaM/Uyg/6DpBhFEBSCl/.pE.C', 'admin'),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'Amateur Stargazer', 'stargazer@cosmostracker.org', '$2b$10$cU0OyJ/.9T6bkl1CKXin1Octp0NI3kxDCqqH3LpJNtqbXDVnc/gEq', 'user')
ON CONFLICT (email) DO NOTHING;

-- Celestial Events
INSERT INTO celestial_events (title, type, description, event_date, visibility_region, source_url) VALUES
  ('Total Solar Eclipse 2026', 'eclipse', 'Majestic total solar eclipse tracing across Greenland, Iceland, and Northern Spain low on the western twilight horizon.', '2026-08-12', 'Greenland, Western Iceland, Northern Spain', 'https://eclipse.gsfc.nasa.gov'),
  ('Perseid Meteor Shower Peak', 'meteor shower', 'Prolific swift meteors with persistent glowing ionization trains from periodic Comet 109P/Swift-Tuttle.', '2026-08-12', 'Northern Hemisphere (best midnight to dawn)', 'https://imo.net'),
  ('Saturn at Opposition', 'conjunction', 'Saturn arrives at its closest approach to Earth with its ring system appearing near razor-thin edge-on.', '2026-09-25', 'Global (Constellation Aquarius)', 'https://solarsystem.nasa.gov'),
  ('Geminid Meteor Shower', 'meteor shower', 'Yearly best meteor display originating from asteroid 3200 Phaethon with multi-colored fireballs.', '2026-12-13', 'Both Hemispheres', 'https://imo.net'),
  ('Venus-Jupiter Conjunction', 'conjunction', 'Blinding pre-dawn alignment of the two brightest solar planets separated by under 0.3 degrees.', '2026-11-22', 'Global (Eastern Morning Horizon)', 'https://in-the-sky.org'),
  ('Supernova SN 2026xy Alert', 'supernova', 'Type Ia thermonuclear supernova detected in spiral galaxy NGC 3810, bright enough for 8-inch telescopes.', '2026-10-04', 'Global Northern & Equatorial Latitudes', 'https://rochesterastronomy.org/snimages');

-- Stars & Constellations
INSERT INTO stars_constellations (name, type, constellation, magnitude, distance_ly, description) VALUES
  ('Sirius (Alpha Canis Majoris)', 'Binary (A1V + DA2 White Dwarf)', 'Canis Major', '-1.46', '8.6', 'The brightest individual star in the Earth night sky; companion Sirius B was the first confirmed white dwarf.'),
  ('Betelgeuse (Alpha Orionis)', 'Red Supergiant (M1-2 Ia-ab)', 'Orion', '+0.50 (Variable)', '642.5', 'A semiregular variable red supergiant nearing the end of its nuclear fuel, destined for a violent Type II supernova.'),
  ('Vega (Alpha Lyrae)', 'Main Sequence (A0Va)', 'Lyra', '+0.03', '25.0', 'Rapidly rotating oblate star with a circumstellar debris disk, landmark of the Summer Triangle.'),
  ('Polaris (Alpha Ursae Minoris)', 'Classical Cepheid (F7Ib)', 'Ursa Minor', '+1.98', '433.0', 'The North Star and navigational pivot of the northern hemisphere, pulsating with a 3.97-day period.'),
  ('Rigel (Beta Orionis)', 'Blue Supergiant (B8Ia)', 'Orion', '+0.13', '860.0', 'Extremely luminous blue supergiant emitting 120,000 times more light than our Sun.'),
  ('Proxima Centauri', 'Red Dwarf (M5.5Ve Flare Star)', 'Centaurus', '+11.13', '4.246', 'The closest known star to the Solar System, hosting terrestrial exoplanet Proxima b.');

-- Planets & Solar System
INSERT INTO planets_solar_system (name, type, moons, orbital_period, description) VALUES
  ('Mercury', 'Terrestrial Planet', 0, '88.0 days', 'Smallest planet with an iron-dense core, extreme surface temperature swings (-180°C to 430°C), and Caloris Basin.'),
  ('Venus', 'Terrestrial Planet', 0, '224.7 days', 'Runaway greenhouse atmosphere composed of 96.5% CO2 with sulfuric acid clouds; hottest planetary surface at 465°C.'),
  ('Earth', 'Terrestrial Planet', 1, '365.25 days', 'Only known cosmic haven of life, dynamic plate tectonics, expansive liquid water oceans, and protective magnetic field.'),
  ('Mars', 'Terrestrial Planet', 2, '687.0 days', 'The Red Planet, hosting the massive Olympus Mons volcano and the 4,000-km-long Valles Marineris rift canyon.'),
  ('Jupiter', 'Gas Giant', 95, '11.86 years', 'King of planets containing more mass than all others combined, legendary Great Red Spot, and ocean world moons Europa & Ganymede.'),
  ('Saturn', 'Gas Giant', 146, '29.45 years', 'Famed for its spectacular icy ring system spanning 282,000 km, smoggy moon Titan, and cryogenic geysers of Enceladus.');

-- Galaxies
INSERT INTO galaxies (name, type, distance_mly, description) VALUES
  ('Andromeda Galaxy (M31)', 'Barred Spiral (SA(s)b)', '2.537', 'Dominant spiral galaxy of the Local Group containing 1 trillion stars; set to merge with the Milky Way in 4.5 billion years.'),
  ('Milky Way', 'Barred Spiral (SBbc)', '0.0', 'Our cosmic home spanning 100,000 light-years across, housing 100-400 billion stars and central black hole Sagittarius A*.'),
  ('Whirlpool Galaxy (M51a)', 'Grand Design Spiral', '23.16', 'Pristine spiral arms interacting gravitationally with dwarf companion NGC 5195, triggering explosive starburst regions.'),
  ('Sombrero Galaxy (M104)', 'Lenticular / Unbarred Spiral', '31.1', 'Extraordinary bright central core flanked by an uncommonly dense, symmetrical equatorial dust lane.'),
  ('Messier 87 (Virgo A)', 'Giant Elliptical (E0-p)', '53.5', 'Colossal Virgo Cluster elliptical galaxy powering a 5,000-light-year relativistic jet and the first imaged black hole shadow.');

-- Novae & Variable Stars
INSERT INTO novae_variables (name, kind, period, last_outburst, description) VALUES
  ('T Coronae Borealis (Blaze Star)', 'Recurrent Nova', '80 years', '1946 (Imminent Peak Expected)', 'A binary system consisting of a white dwarf and red giant; undergoes thermonuclear runaway eruptions visible to the naked eye.'),
  ('Delta Cephei', 'Classical Cepheid Variable', '5.366 days', 'Continuous Pulsation', 'Prototype Cepheid whose luminosity-period relationship discovered by Henrietta Leavitt standardizes cosmic distance measuring.'),
  ('Mira (Omicron Ceti)', 'Pulsating Red Giant (Mira Variable)', '332 days', 'Annual cycles', 'Giant pulsating red star that swings from naked-eye 2nd magnitude to invisible 10th magnitude in a rhythmic cosmic heartbeat.'),
  ('SS Cygni', 'Dwarf Nova (Cataclysmic Variable)', '49.5 days', 'Recent (Bi-monthly)', 'Accreting white dwarf exhibiting rapid brightness leaps driven by accretion disk thermal instability.'),
  ('Eta Carinae', 'Luminous Blue Variable (Hypergiant)', '5.54 years', '1843 (The Great Eruption)', 'Unstable hypergiant with mass over 100 Suns surrounded by the hourglass-shaped Homunculus Nebula.');

-- Black Holes
INSERT INTO black_holes (name, mass_solar, location, description) VALUES
  ('Sagittarius A*', '4.3 Million M☉', 'Milky Way Galactic Center', 'The supermassive gravitational anchor of our galaxy, surrounded by the fast-orbiting S-stars and imaged by EHT in 2022.'),
  ('M87* Black Hole', '6.5 Billion M☉', 'Messier 87 Galaxy Core', 'Gargantuan supermassive black hole powering a 5,000-light-year relativistic plasma jet; first black hole ever directly photographed.'),
  ('Cygnus X-1', '21.2 M☉', 'HDE 226868 Binary (Cygnus)', 'The first widely accepted stellar-mass black hole, stripping solar wind matter from its blue supergiant partner.'),
  ('TON 618', '66 Billion M☉', 'Hyperluminous Quasar in Canes Venatici', 'One of the most massive cosmic bodies known, illuminating an accretion disk that outshines 140 trillion suns.');

-- Cosmological Theories
INSERT INTO theories (title, category, summary, details) VALUES
  ('The Big Bang Model (ΛCDM)', 'universe', 'The consensus cosmological framework describing the expansion of spacetime from an initial singularity 13.8 billion years ago.', 'Supported by cosmological redshift (Hubble-Lemaître law), abundance of primordial light isotopes from nucleosynthesis, and the uniform 2.7255 K cosmic microwave background radiation.'),
  ('Cosmic Inflation Theory', 'universe', 'Exponential expansion of the universe during the first 10^-36 seconds driven by negative-pressure vacuum energy.', 'Conceived by Alan Guth and Andrei Linde, resolving the Flatness and Horizon problems and generating microscopic quantum perturbations that seeded large-scale galaxies.'),
  ('The Multiverse Hypothesis', 'multiverse', 'Concept that our observable bubble universe is merely one pocket among an infinite ensemble of disconnected universes.', 'Emerges naturally from eternal chaotic inflation and string theory landscape calculations with 10^500 possible vacuum compactification geometries.'),
  ('String Theory & M-Theory', 'quantum gravity', 'Fundamental physics framework replacing 0D point particles with 1D vibrating quantum strings in 11 dimensions.', 'Unifies General Relativity with quantum field theory, deriving the spin-2 graviton naturally and calculating black hole microscopic Bekenstein-Hawking entropy.'),
  ('Dark Matter & Dark Energy', 'dark matter', '95% of cosmic energy density resides in non-luminous Cold Dark Matter (27%) and accelerating Dark Energy (68%).', 'Evidenced by galactic rotation velocity curves (Vera Rubin), gravitational lensing in colliding galaxy clusters (Bullet Cluster), and Type Ia supernovae standard candles.');

-- Articles
INSERT INTO articles (title, summary, url, published_at, category) VALUES
  ('James Webb Telescope Unveils Massive Primordial Galaxies', 'JWST deep near-infrared surveys detect mature galaxies existing merely 350-500 million years after the Big Bang, challenging standard hierarchical assembly timelines.', 'https://webbtelescope.org/news', '2026-09-15', 'Deep Space Observation'),
  ('Magnetic Polarization Maps Around Sagittarius A*', 'The Event Horizon Telescope collaboration captures twisted magnetic spirals encircling the Milky Way supermassive black hole event horizon.', 'https://eventhorizontelescope.org', '2026-09-02', 'Black Holes & Gravity'),
  ('The Hubble Tension Crisis: New Standard Candles Confirm 5-Sigma Gap', 'Local Cepheid and supernova measurements yield 73 km/s/Mpc while early Planck CMB models predict 67.4 km/s/Mpc, hinting at new physics.', 'https://hubblesite.org', '2026-08-20', 'Cosmological Physics'),
  ('Europa Clipper and JUICE: The Odyssey to Ocean Worlds', 'NASA and ESA spacecraft cruise toward the Jovian system to sound the depths of subsurface saltwater oceans on Europa and Ganymede.', 'https://europa.nasa.gov', '2026-08-01', 'Planetary Exploration');
