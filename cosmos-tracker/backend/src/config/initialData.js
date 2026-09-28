// Seed data matching exact Supabase tables with high-resolution authentic astronomical photography
export const initialData = {
  users: [
    {
      id: "a1b2c3d4-0001-4000-8000-000000000001",
      name: "Cosmos Administrator",
      email: "admin@cosmostracker.org",
      password_hash: "$2b$10$SBXxip/Cm3IZq81yvpHe0uqHz4jFMaM/Uyg/6DpBhFEBSCl/.pE.C",
      role: "admin",
      created_at: "2026-01-01T00:00:00.000Z"
    },
    {
      id: "a1b2c3d4-0002-4000-8000-000000000002",
      name: "Amateur Stargazer",
      email: "stargazer@cosmostracker.org",
      password_hash: "$2b$10$cU0OyJ/.9T6bkl1CKXin1Octp0NI3kxDCqqH3LpJNtqbXDVnc/gEq",
      role: "user",
      created_at: "2026-01-15T12:00:00.000Z"
    },
    {
      id: "a1b2c3d4-0003-4000-8000-000000000003",
      name: "Debartha Ghosh",
      email: "debarthaghosh262@gmail.com",
      password_hash: "$2b$10$SBXxip/Cm3IZq81yvpHe0uqHz4jFMaM/Uyg/6DpBhFEBSCl/.pE.C",
      role: "admin",
      created_at: "2026-01-01T00:00:00.000Z"
    }
  ],

  celestial_events: [
    {
      id: "evt-001",
      title: "Total Solar Eclipse 2026",
      type: "eclipse",
      description: "Majestic total solar eclipse tracing across Greenland, Iceland, and Northern Spain low on the western twilight horizon.",
      event_date: "2026-08-12",
      visibility_region: "Greenland, Western Iceland, Northern Spain",
      source_url: "https://eclipse.gsfc.nasa.gov",
      image_url: "/images/events/total_solar_eclipse.jpg"
    },
    {
      id: "evt-002",
      title: "Perseid Meteor Shower Peak",
      type: "meteor shower",
      description: "Prolific swift meteors with persistent glowing ionization trains from periodic Comet 109P/Swift-Tuttle.",
      event_date: "2026-08-12",
      visibility_region: "Northern Hemisphere (best midnight to dawn)",
      source_url: "https://imo.net",
      image_url: "/images/events/perseids.jpg"
    },
    {
      id: "evt-003",
      title: "Saturn at Opposition",
      type: "conjunction",
      description: "Saturn arrives at its closest approach to Earth with its ring system appearing near razor-thin edge-on.",
      event_date: "2026-09-25",
      visibility_region: "Global (Constellation Aquarius)",
      source_url: "https://solarsystem.nasa.gov",
      image_url: "/images/events/saturn_opposition.jpg"
    },
    {
      id: "evt-004",
      title: "Geminid Meteor Shower",
      type: "meteor shower",
      description: "Yearly best meteor display originating from asteroid 3200 Phaethon with multi-colored fireballs.",
      event_date: "2026-12-13",
      visibility_region: "Both Hemispheres",
      source_url: "https://imo.net",
      image_url: "/images/events/geminids.jpg"
    },
    {
      id: "evt-005",
      title: "Venus-Jupiter Conjunction",
      type: "conjunction",
      description: "Blinding pre-dawn alignment of the two brightest solar planets separated by under 0.3 degrees.",
      event_date: "2026-11-22",
      visibility_region: "Global (Eastern Morning Horizon)",
      source_url: "https://in-the-sky.org",
      image_url: "/images/events/conjunction.jpg"
    },
    {
      id: "evt-006",
      title: "Supernova SN 2026xy Alert",
      type: "supernova",
      description: "Type Ia thermonuclear supernova detected in spiral galaxy NGC 3810, bright enough for 8-inch telescopes.",
      event_date: "2026-10-04",
      visibility_region: "Global Northern & Equatorial Latitudes",
      source_url: "https://rochesterastronomy.org/snimages",
      image_url: "/images/events/supernova.jpg"
    }
  ],

  stars_constellations: [
    {
      id: "star-001",
      name: "Sirius (Alpha Canis Majoris)",
      type: "Binary (A1V + DA2 White Dwarf)",
      constellation: "Canis Major",
      magnitude: "-1.46",
      distance_ly: "8.6",
      description: "The brightest individual star in the Earth night sky; companion Sirius B was the first confirmed white dwarf.",
      image_url: "/images/stars/sirius.jpg"
    },
    {
      id: "star-002",
      name: "Betelgeuse (Alpha Orionis)",
      type: "Red Supergiant (M1-2 Ia-ab)",
      constellation: "Orion",
      magnitude: "+0.50 (Variable)",
      distance_ly: "642.5",
      description: "A semiregular variable red supergiant nearing the end of its nuclear fuel, destined for a violent Type II supernova.",
      image_url: "/images/stars/betelgeuse.jpg"
    },
    {
      id: "star-003",
      name: "Vega (Alpha Lyrae)",
      type: "Main Sequence (A0Va)",
      constellation: "Lyra",
      magnitude: "+0.03",
      distance_ly: "25.0",
      description: "Rapidly rotating oblate star with a circumstellar debris disk, landmark of the Summer Triangle.",
      image_url: "/images/stars/vega.jpg"
    },
    {
      id: "star-004",
      name: "Polaris (Alpha Ursae Minoris)",
      type: "Classical Cepheid (F7Ib)",
      constellation: "Ursa Minor",
      magnitude: "+1.98",
      distance_ly: "433.0",
      description: "The North Star and navigational pivot of the northern hemisphere, pulsating with a 3.97-day period.",
      image_url: "/images/stars/polaris.jpg"
    },
    {
      id: "star-005",
      name: "Rigel (Beta Orionis)",
      type: "Blue Supergiant (B8Ia)",
      constellation: "Orion",
      magnitude: "+0.13",
      distance_ly: "860.0",
      description: "Extremely luminous blue supergiant emitting 120,000 times more light than our Sun.",
      image_url: "/images/stars/vega.jpg"
    },
    {
      id: "star-006",
      name: "Pleiades (Seven Sisters - M45)",
      type: "Open Cluster (B-type Stars)",
      constellation: "Taurus",
      magnitude: "+1.6",
      distance_ly: "444.0",
      description: "Spectacular open star cluster enveloped in dazzling luminous blue reflection nebulosity.",
      image_url: "/images/stars/pleiades.jpg"
    }
  ],

  planets_solar_system: [
    {
      id: "planet-001",
      name: "Mercury",
      type: "Terrestrial Planet",
      moons: 0,
      major_moons: "None (0 natural satellites)",
      orbital_period: "88.0 days",
      distance_sun: "0.39 AU (57.9 million km)",
      description: "Smallest planet with an iron-dense core, extreme surface temperature swings (-180°C to 430°C), and Caloris Basin. Holds no moons due to extreme solar gravitational proximity.",
      image_url: "/images/planets/mercury.jpg",
      moons_list: []
    },
    {
      id: "planet-002",
      name: "Venus",
      type: "Terrestrial Planet",
      moons: 0,
      major_moons: "None (0 natural satellites)",
      orbital_period: "224.7 days",
      distance_sun: "0.72 AU (108.2 million km)",
      description: "Runaway greenhouse atmosphere composed of 96.5% CO2 with sulfuric acid clouds; hottest planetary surface at 465°C. Rotates clockwise (retrograde) and possesses no natural satellites.",
      image_url: "/images/planets/venus.jpg",
      moons_list: []
    },
    {
      id: "planet-003",
      name: "Earth",
      type: "Terrestrial Planet",
      moons: 1,
      major_moons: "The Moon (Luna)",
      orbital_period: "365.25 days",
      distance_sun: "1.00 AU (149.6 million km)",
      description: "Only known cosmic haven of life, dynamic plate tectonics, expansive liquid water oceans, and protective magnetic field, accompanied by our massive solitary natural satellite.",
      image_url: "/images/planets/earth.jpg",
      moons_list: [
        {
          name: "The Moon (Luna)",
          diameter_km: "3,474 km",
          orbital_period: "27.3 days (Synchronous)",
          distance_km: "384,400 km",
          image_url: "/images/moons/moon.jpg",
          description: "Fifth-largest natural satellite in the Solar System. Formed ~4.5 billion years ago in the giant Theia impact; stabilizes Earth's 23.5° axial tilt and governs planetary oceanic tides."
        }
      ]
    },
    {
      id: "planet-004",
      name: "Mars",
      type: "Terrestrial Planet",
      moons: 2,
      major_moons: "Phobos, Deimos",
      orbital_period: "687.0 days",
      distance_sun: "1.52 AU (227.9 million km)",
      description: "The Red Planet, hosting the massive Olympus Mons volcano and the 4,000-km-long Valles Marineris rift canyon, orbited by two tiny captured asteroid moons.",
      image_url: "/images/planets/mars.jpg",
      moons_list: [
        {
          name: "Phobos",
          diameter_km: "22.2 km (irregular)",
          orbital_period: "7.66 hours",
          distance_km: "9,376 km",
          image_url: "/images/moons/phobos.jpg",
          description: "Inner moon orbiting closer to its primary than any other moon in the Solar System; orbits Mars three times daily and is spiraling inward toward destruction or ring formation in ~50 million years."
        },
        {
          name: "Deimos",
          diameter_km: "12.4 km (irregular)",
          orbital_period: "30.35 hours",
          distance_km: "23,463 km",
          image_url: "/images/moons/deimos.jpg",
          description: "Outer moon named after the Greek god of dread. Smooth potato-shaped body enveloped in a thick regolith dust blanket that softens impact craters."
        }
      ]
    },
    {
      id: "planet-005",
      name: "Jupiter",
      type: "Gas Giant",
      moons: 95,
      major_moons: "Ganymede, Callisto, Io, Europa (Galilean Moons), Amalthea, Himalia",
      orbital_period: "11.86 years",
      distance_sun: "5.20 AU (778.5 million km)",
      description: "King of planets containing more mass than all other planets combined, iconic Great Red Spot storm, and a colossal miniature solar system of 95 known moons.",
      image_url: "/images/planets/jupiter.jpg",
      moons_list: [
        {
          name: "Ganymede",
          diameter_km: "5,268 km",
          orbital_period: "7.15 days",
          distance_km: "1,070,400 km",
          image_url: "/images/moons/ganymede.jpg",
          description: "Largest moon in the Solar System—larger than planet Mercury and Pluto. Only moon known to generate its own internal magnetic field; harbors an internal saltwater ocean deeper than Earth's oceans combined."
        },
        {
          name: "Europa",
          diameter_km: "3,122 km",
          orbital_period: "3.55 days",
          distance_km: "670,900 km",
          image_url: "/images/moons/europa.jpg",
          description: "Pristine ice-shell world crisscrossed by reddish mineral fractures (lineae). Underneath lies a global liquid ocean 100 km deep containing twice as much water as Earth; prime candidate for extraterrestrial life."
        },
        {
          name: "Io",
          diameter_km: "3,643 km",
          orbital_period: "1.77 days",
          distance_km: "421,700 km",
          image_url: "/images/moons/io.jpg",
          description: "Most geologically and volcanically active body in the Solar System. Extreme tidal gravitational kneading between Jupiter, Europa, and Ganymede powers over 400 active volcanoes venting sulfurous plumes 500 km high."
        },
        {
          name: "Callisto",
          diameter_km: "4,821 km",
          orbital_period: "16.69 days",
          distance_km: "1,882,700 km",
          image_url: "/images/moons/callisto.jpg",
          description: "Third-largest moon in the Solar System with the most heavily cratered surface known, virtually unchanged for 4 billion years; features the vast multi-ring impact basin Valhalla."
        }
      ]
    },
    {
      id: "planet-006",
      name: "Saturn",
      type: "Gas Giant",
      moons: 146,
      major_moons: "Titan, Enceladus, Mimas, Iapetus, Rhea, Dione, Tethys, Hyperion, Phoebe",
      orbital_period: "29.45 years",
      distance_sun: "9.58 AU (1.43 billion km)",
      description: "Magnificent ringed gas giant spanning 282,000 km across its ring system, reigning over the largest planetary satellite court in the Solar System with 146 confirmed moons.",
      image_url: "/images/planets/saturn.jpg",
      moons_list: [
        {
          name: "Titan",
          diameter_km: "5,149 km",
          orbital_period: "15.95 days",
          distance_km: "1,221,870 km",
          image_url: "/images/moons/titan.jpg",
          description: "Second-largest moon in the Solar System and the only satellite with a dense nitrogen-methane atmosphere (1.5x Earth surface pressure). Features liquid methane lakes (Kraken Mare), rivers, rain, and hydrocarbon dunes."
        },
        {
          name: "Enceladus",
          diameter_km: "504 km",
          orbital_period: "1.37 days",
          distance_km: "238,000 km",
          image_url: "/images/moons/enceladus.jpg",
          description: "Dazzling cryogenic world reflecting nearly 100% of sunlight. South polar 'tiger stripe' hydrothermal vents blast high-speed geysers of water vapor, silica nano-grains, and complex organics into space."
        },
        {
          name: "Mimas",
          diameter_km: "396 km",
          orbital_period: "0.94 days",
          distance_km: "185,520 km",
          image_url: "/images/moons/mimas.jpg",
          description: "The 'Death Star' moon dominated by the colossal 130-km Herschel impact crater. Subtle orbital libration measurements reveal a stealth global liquid water ocean hidden 20-30 km beneath its icy shell."
        },
        {
          name: "Iapetus",
          diameter_km: "1,469 km",
          orbital_period: "79.32 days",
          distance_km: "3,560,820 km",
          image_url: "/images/moons/iapetus.jpg",
          description: "The 'Yin-Yang' two-toned moon with pitch-black leading hemisphere (Cassini Regio) and blinding white trailing hemisphere, flanked by an extraordinary 20-km high equatorial mountain wall."
        }
      ]
    },
    {
      id: "planet-007",
      name: "Uranus",
      type: "Ice Giant",
      moons: 28,
      major_moons: "Miranda, Ariel, Umbriel, Titania, Oberon, Puck, Cordelia, Ophelia",
      orbital_period: "84.0 years",
      distance_sun: "19.2 AU (2.87 billion km)",
      description: "Cyan ice giant knocked onto its side with an extreme 97.8° axial tilt, causing 42-year perpetual days and nights. Ringed by 13 faint rings and 28 moons named after literary characters from Shakespeare and Pope.",
      image_url: "/images/planets/uranus.jpg",
      moons_list: [
        {
          name: "Miranda",
          diameter_km: "471 km",
          orbital_period: "1.41 days",
          distance_km: "129,390 km",
          image_url: "/images/moons/miranda.jpg",
          description: "Most extreme geologic mosaic in the solar system. Features jumbled fault canyons, giant chevron coronae, and Verona Rupes—the tallest cliff face known in the Solar System at 20 km high."
        },
        {
          name: "Titania",
          diameter_km: "1,577 km",
          orbital_period: "8.71 days",
          distance_km: "435,910 km",
          image_url: "/images/moons/titania.jpg",
          description: "Eighth-largest moon in the Solar System and largest satellite of Uranus. Cut by gigantic rift valleys and tectonic fault scarps including Messina Chasma spanning over 1,500 km."
        },
        {
          name: "Oberon",
          diameter_km: "1,523 km",
          orbital_period: "13.46 days",
          distance_km: "583,520 km",
          image_url: "/images/moons/oberon.jpg",
          description: "Outermost major Uranian moon. Heavily cratered dirty ice surface featuring dark unknown carbonaceous floor deposits and impact mountain peaks rising 6 km high."
        }
      ]
    },
    {
      id: "planet-008",
      name: "Neptune",
      type: "Ice Giant",
      moons: 16,
      major_moons: "Triton, Proteus, Nereid, Larissa, Galatea, Despina, Thalassa, Naiad",
      orbital_period: "164.8 years",
      distance_sun: "30.1 AU (4.50 billion km)",
      description: "Deep azure ice giant with supersonic winds of 2,100 km/h (the fastest recorded in the solar system). Accompanied by 16 moons led by captured Kuiper Belt ocean dwarf Triton.",
      image_url: "/images/planets/neptune.jpg",
      moons_list: [
        {
          name: "Triton",
          diameter_km: "2,706 km",
          orbital_period: "5.88 days (Retrograde)",
          distance_km: "354,759 km",
          image_url: "/images/moons/triton.jpg",
          description: "Captured Kuiper Belt dwarf planet orbiting Neptune backwards (retrograde). Features bizarre 'cantaloupe terrain', cryogenic nitrogen ice geysers shooting plumes 8 km into the sky, and an active liquid subsurface ocean."
        },
        {
          name: "Proteus",
          diameter_km: "420 km (irregular)",
          orbital_period: "1.12 days",
          distance_km: "117,647 km",
          image_url: "/images/moons/proteus.jpg",
          description: "Second-largest moon of Neptune and one of the darkest objects in the solar system, reflecting only 6% of incoming sunlight. Carved by the giant Pharos crater 230 km across."
        }
      ]
    },
    {
      id: "planet-009",
      name: "Pluto",
      type: "Dwarf Planet",
      moons: 5,
      major_moons: "Charon, Styx, Nix, Kerberos, Hydra",
      orbital_period: "248.0 years",
      distance_sun: "39.5 AU (5.91 billion km)",
      description: "King of the Kuiper Belt possessing Tombaugh Regio (the giant heart-shaped nitrogen ice glacier Sputnik Planitia), towering 3.5-km water ice mountains, blue atmospheric hazes, and a binary 5-moon system.",
      image_url: "/images/planets/pluto.jpg",
      moons_list: [
        {
          name: "Charon",
          diameter_km: "1,212 km",
          orbital_period: "6.39 days (Mutually Locked)",
          distance_km: "19,591 km",
          image_url: "/images/moons/charon.jpg",
          description: "Mutually tidally locked binary companion half the diameter of Pluto. Features a reddish tholin-stained north polar hood (Mordor Macula) and massive chasm canyons 4 times deeper than the Grand Canyon."
        }
      ]
    },
    {
      id: "planet-010",
      name: "Ceres",
      type: "Dwarf Planet",
      moons: 0,
      major_moons: "None (0 natural satellites)",
      orbital_period: "4.60 years (1,682 days)",
      distance_sun: "2.77 AU (414 million km)",
      description: "Largest celestial body in the asteroid belt between Mars and Jupiter. Visited by NASA Dawn; features a water-ice and hydrated mineral mantle, bright reflective sodium carbonate salt domes in Occator Crater (Cerealia Facula), and the solitary 4-km cryovolcano Ahuna Mons.",
      image_url: "/images/planets/ceres.jpg",
      moons_list: []
    },
    {
      id: "planet-011",
      name: "Eris",
      type: "Dwarf Planet",
      moons: 1,
      major_moons: "Dysnomia",
      orbital_period: "558.0 years",
      distance_sun: "67.8 AU (10.14 billion km)",
      description: "Most massive known dwarf planet (~27% more massive than Pluto). Its 2005 discovery in the scattered disc by Caltech catalyzed the IAU's formal planetary definition. Highly reflective surface coated with frozen methane and nitrogen frost.",
      image_url: "/images/planets/eris.jpg",
      moons_list: [
        {
          name: "Dysnomia",
          diameter_km: "700 km",
          orbital_period: "15.77 days",
          distance_km: "37,350 km",
          image_url: "/images/moons/dysnomia.jpg",
          description: "Solitary moon of Eris named after the Greek spirit of lawlessness. The orbital period of Dysnomia enabled astronomers to calculate Eris's mass, proving Eris is significantly denser and heavier than Pluto."
        }
      ]
    },
    {
      id: "planet-012",
      name: "Haumea",
      type: "Dwarf Planet",
      moons: 2,
      major_moons: "Hi'iaka, Namaka (+ Ring System)",
      orbital_period: "284.1 years",
      distance_sun: "43.1 AU (6.45 billion km)",
      description: "Fastest-spinning equilibrium world in the Solar System, completing a rotation every 3.9 hours. Centrifugal forces stretch it into a bizarre triaxial ellipsoid. Encircled by a dense 70-km icy ring and two crystalline water-ice moons.",
      image_url: "/images/planets/haumea.jpg",
      moons_list: [
        {
          name: "Hi'iaka",
          diameter_km: "310 km",
          orbital_period: "49.12 days",
          distance_km: "49,880 km",
          image_url: "/images/moons/hiiaka.jpg",
          description: "Outer, larger moon of Haumea named after the Hawaiian patron goddess of hula dancers. Covered in ultra-pure crystalline water ice, formed from the debris of a titanic proto-planetary impact."
        },
        {
          name: "Namaka",
          diameter_km: "170 km",
          orbital_period: "18.28 days",
          distance_km: "25,657 km",
          image_url: "/images/moons/hiiaka.jpg",
          description: "Inner satellite of Haumea named after the Hawaiian sea goddess. Experiences non-Keplerian orbital torque and tidal heating due to gravitational resonances with larger sibling Hi'iaka."
        }
      ]
    },
    {
      id: "planet-013",
      name: "Makemake",
      type: "Dwarf Planet",
      moons: 1,
      major_moons: "S/2015 (136472) 1 (MK2)",
      orbital_period: "309.9 years",
      distance_sun: "45.8 AU (6.85 billion km)",
      description: "Classical Kuiper Belt dwarf planet discovered in 2005 and named after the creator god of Rapa Nui (Easter Island). Extremely cold (-243°C) with a reddish-brown methane ice surface laced with ethane and tholins.",
      image_url: "/images/planets/makemake.jpg",
      moons_list: [
        {
          name: "MK2 (S/2015 (136472) 1)",
          diameter_km: "175 km",
          orbital_period: "12.4 days",
          distance_km: "21,100 km",
          image_url: "/images/moons/mk2.jpg",
          description: "Discovered in 2016 by the Hubble Space Telescope. Displays a pitch-black charcoal surface (albedo 0.04) contrasting sharply with Makemake's blazing white-red reflective surface."
        }
      ]
    },
    {
      id: "planet-014",
      name: "Quaoar",
      type: "Dwarf Planet",
      moons: 1,
      major_moons: "Weywot (+ 2 Outer Rings)",
      orbital_period: "288.8 years",
      distance_sun: "43.7 AU (6.54 billion km)",
      description: "Prominent Kuiper Belt dwarf planet discovered in 2002. Surrounded by two enigmatic ring systems orbiting well outside its classical Roche limit, challenging textbook planetary ring formation physics.",
      image_url: "/images/planets/quaoar.jpg",
      moons_list: [
        {
          name: "Weywot",
          diameter_km: "80 km",
          orbital_period: "12.44 days",
          distance_km: "14,500 km",
          image_url: "/images/moons/weywot.jpg",
          description: "Moon of Quaoar named after the Tongva sky god. Believed to be collisional mantle ejecta produced when a massive impactor stripped Quaoar of its outer volatile ice crust."
        }
      ]
    },
    {
      id: "planet-015",
      name: "Orcus",
      type: "Dwarf Planet",
      moons: 1,
      major_moons: "Vanth",
      orbital_period: "247.5 years",
      distance_sun: "39.4 AU (5.90 billion km)",
      description: "The 'Anti-Pluto' Plutino, locked in the exact same 2:3 Neptune orbital resonance as Pluto, but positioned at the opposite phase of its orbit. Accompanied by massive satellite Vanth, forming an equal binary system.",
      image_url: "/images/planets/orcus.jpg",
      moons_list: [
        {
          name: "Vanth",
          diameter_km: "442 km",
          orbital_period: "9.54 days (Synchronous)",
          distance_km: "9,030 km",
          image_url: "/images/moons/vanth.jpg",
          description: "Massive tidally locked companion nearly half the size of Orcus. Named after the Etruscan underworld psychopomp, Vanth possesses a dark carbonaceous surface contrasting with Orcus's neutral water-ice spectrum."
        }
      ]
    },
    {
      id: "planet-016",
      name: "Sedna",
      type: "Dwarf Planet",
      moons: 0,
      major_moons: "None (0 natural satellites)",
      orbital_period: "11,400 years",
      distance_sun: "84.3 AU (Perihelion) to 937 AU (Aphelion)",
      description: "Mysterious detached inner Oort Cloud sednoid with one of the most distant and prolonged orbits known. Takes over 11 millennia to complete a single circuit around the Sun. Its deep crimson hue is one of the reddest in the Solar System.",
      image_url: "/images/planets/sedna.jpg",
      moons_list: []
    },
    {
      id: "planet-017",
      name: "Gonggong",
      type: "Dwarf Planet",
      moons: 1,
      major_moons: "Xiangliu",
      orbital_period: "552.5 years",
      distance_sun: "88.5 AU (13.24 billion km)",
      description: "Third-largest trans-Neptunian object after Pluto and Eris (diameter ~1,230 km). Reddish surface rich in water ice and methane. Named after the Chinese water deity who caused catastrophic floods.",
      image_url: "/images/planets/gonggong.jpg",
      moons_list: [
        {
          name: "Xiangliu",
          diameter_km: "100 km",
          orbital_period: "25.22 days",
          distance_km: "24,020 km",
          image_url: "/images/moons/weywot.jpg",
          description: "Satellite of Gonggong discovered in 2015 using Hubble Space Telescope imagery. Its orbital period allowed precise determination of Gonggong's mass and high density of 1.74 g/cm³."
        }
      ]
    },
    {
      id: "planet-018",
      name: "The Main Asteroid Belt",
      type: "Asteroid Belt",
      moons: 0,
      major_moons: "Over 1 Million Asteroids (Ceres, Vesta, Pallas, Hygiea)",
      orbital_period: "3.0 to 6.0 years",
      distance_sun: "2.1 to 3.3 AU (314 to 494 million km)",
      description: "A vast circumstellar torus of primordial planetesimal debris situated between Mars and Jupiter. Spanning ~180 million km, it preserves primordial material from the 4.6-billion-year-old solar nebula that was prevented by Jupiter's tidal gravitational disruption from ever accreting into a planet. Total mass is ~3% of Earth's Moon (~2.4 × 10²¹ kg). Carved with orbital voids called Kirkwood Gaps.",
      image_url: "/images/planets/asteroid_belt.jpg",
      moons_list: []
    },
    {
      id: "planet-019",
      name: "4 Vesta",
      type: "Asteroid Belt",
      moons: 0,
      major_moons: "None (Differentiated Protoplanet)",
      orbital_period: "3.63 years (1,325 days)",
      distance_sun: "2.36 AU (353 million km)",
      description: "Second-largest body in the asteroid belt (diameter 525 km, ~9% of total belt mass) and the brightest asteroid visible to the naked eye. A true differentiated protoplanet with an iron-nickel core, olivine mantle, and basaltic crust. Home to the gigantic Rheasilvia impact crater, whose central peak towers 22 km high (nearly three times the height of Mt. Everest).",
      image_url: "/images/planets/vesta.jpg",
      moons_list: []
    },
    {
      id: "planet-020",
      name: "16 Psyche",
      type: "Asteroid Belt",
      moons: 0,
      major_moons: "None (M-type Metallic Core)",
      orbital_period: "5.00 years (1,825 days)",
      distance_sun: "2.92 AU (437 million km)",
      description: "Enigmatic metallic M-type asteroid spanning 226 km across, composed primarily of metallic iron and nickel. Believed to be the exposed core of an ancient planetesimal that was stripped of its rocky silicate crust in catastrophic collisions. Target of NASA's Psyche spacecraft (arriving 2029) to explore planetary core building blocks.",
      image_url: "/images/planets/psyche.jpg",
      moons_list: []
    },
    {
      id: "planet-021",
      name: "2 Pallas",
      type: "Asteroid Belt",
      moons: 0,
      major_moons: "None (B-type Asteroid)",
      orbital_period: "4.62 years (1,686 days)",
      distance_sun: "2.77 AU (414 million km)",
      description: "Third-largest asteroid in the Solar System (diameter 512 km, ~7% of total belt mass). Discovered in 1802 by Heinrich Olbers. Its highly inclined orbit of 34.8° takes it far above and below the planetary plane, resulting in violent high-velocity collisions that have scarred its surface into a heavily cratered 'golf ball' appearance.",
      image_url: "/images/planets/pallas.jpg",
      moons_list: []
    }
  ],

  galaxies: [
    {
      id: "gal-001",
      name: "Andromeda Galaxy (M31)",
      type: "Barred Spiral (SA(s)b)",
      distance_mly: "2.537",
      description: "Dominant spiral galaxy of the Local Group containing 1 trillion stars; set to merge with the Milky Way in 4.5 billion years.",
      image_url: "/images/galaxies/andromeda.jpg"
    },
    {
      id: "gal-002",
      name: "Milky Way",
      type: "Barred Spiral (SBbc)",
      distance_mly: "0.0",
      description: "Our cosmic home spanning 100,000 light-years across, housing 100-400 billion stars and central black hole Sagittarius A*.",
      image_url: "/images/galaxies/milky_way.jpg"
    },
    {
      id: "gal-003",
      name: "Whirlpool Galaxy (M51a)",
      type: "Grand Design Spiral",
      distance_mly: "23.16",
      description: "Pristine spiral arms interacting gravitationally with dwarf companion NGC 5195, triggering explosive starburst regions.",
      image_url: "/images/galaxies/whirlpool.jpg"
    },
    {
      id: "gal-004",
      name: "Sombrero Galaxy (M104)",
      type: "Lenticular / Unbarred Spiral",
      distance_mly: "31.1",
      description: "Extraordinary bright central core flanked by an uncommonly dense, symmetrical equatorial dust lane.",
      image_url: "/images/galaxies/sombrero.jpg"
    },
    {
      id: "gal-005",
      name: "Messier 87 (Virgo A)",
      type: "Giant Elliptical (E0-p)",
      distance_mly: "53.5",
      description: "Colossal Virgo Cluster elliptical galaxy powering a 5,000-light-year relativistic jet and the first imaged black hole shadow.",
      image_url: "/images/galaxies/m87_galaxy.jpg"
    }
  ],

  novae_variables: [
    {
      id: "nova-001",
      name: "T Coronae Borealis (Blaze Star)",
      kind: "Recurrent Nova",
      period: "80 years",
      last_outburst: "1946 (Imminent Outburst Expected)",
      description: "A binary system consisting of a white dwarf and red giant; undergoes thermonuclear runaway eruptions visible to the naked eye.",
      image_url: "/images/novae/t_coronae_borealis.jpg"
    },
    {
      id: "nova-002",
      name: "Delta Cephei",
      kind: "Classical Cepheid Variable",
      period: "5.366 days",
      last_outburst: "Continuous Pulsation",
      description: "Prototype Cepheid whose luminosity-period relationship discovered by Henrietta Leavitt standardizes cosmic distance measuring.",
      image_url: "/images/novae/delta_cephei.jpg"
    },
    {
      id: "nova-003",
      name: "Mira (Omicron Ceti)",
      kind: "Pulsating Red Giant (Mira Variable)",
      period: "332 days",
      last_outburst: "Annual Cycle",
      description: "Giant pulsating red star that swings from naked-eye 2nd magnitude to invisible 10th magnitude in a rhythmic cosmic heartbeat.",
      image_url: "/images/novae/mira.jpg"
    },
    {
      id: "nova-004",
      name: "SS Cygni",
      kind: "Dwarf Nova (Cataclysmic Variable)",
      period: "49.5 days",
      last_outburst: "Bi-monthly",
      description: "Accreting white dwarf exhibiting rapid brightness leaps driven by accretion disk thermal instability.",
      image_url: "/images/novae/ss_cygni.jpg"
    },
    {
      id: "nova-005",
      name: "Eta Carinae",
      kind: "Luminous Blue Variable (Hypergiant)",
      period: "5.54 years",
      last_outburst: "1843 (The Great Eruption)",
      description: "Unstable hypergiant with mass over 100 Suns surrounded by the hourglass-shaped Homunculus Nebula.",
      image_url: "/images/novae/eta_carinae.jpg"
    }
  ],

  black_holes: [
    {
      id: "bh-001",
      name: "Sagittarius A*",
      mass_solar: "4.3 Million M☉",
      location: "Milky Way Galactic Center",
      description: "The supermassive gravitational anchor of our galaxy, surrounded by the fast-orbiting S-stars and imaged by EHT in 2022.",
      image_url: "/images/black_holes/sagittarius_a.jpg"
    },
    {
      id: "bh-002",
      name: "M87* Black Hole",
      mass_solar: "6.5 Billion M☉",
      location: "Messier 87 Galaxy Core",
      description: "Gargantuan supermassive black hole powering a 5,000-light-year relativistic plasma jet; first black hole ever directly photographed.",
      image_url: "/images/black_holes/m87.jpg"
    },
    {
      id: "bh-003",
      name: "Cygnus X-1",
      mass_solar: "21.2 M☉",
      location: "HDE 226868 Binary (Cygnus)",
      description: "The first widely accepted stellar-mass black hole, stripping solar wind matter from its blue supergiant partner.",
      image_url: "/images/black_holes/cygnus_x1.jpg"
    },
    {
      id: "bh-004",
      name: "TON 618",
      mass_solar: "66 Billion M☉",
      location: "Hyperluminous Quasar in Canes Venatici",
      description: "One of the most massive cosmic bodies known, illuminating an accretion disk that outshines 140 trillion suns.",
      image_url: "/images/black_holes/ton_618.jpg"
    }
  ],

  theories: [
    {
      id: "th-001",
      title: "The Big Bang Model (ΛCDM)",
      category: "universe",
      summary: "The consensus cosmological framework describing the expansion of spacetime from an initial singularity 13.8 billion years ago.",
      details: "Supported by cosmological redshift (Hubble-Lemaître law), abundance of primordial light isotopes from nucleosynthesis, and the uniform 2.7255 K cosmic microwave background radiation.",
      image_url: "/images/theories/big_bang.jpg"
    },
    {
      id: "th-002",
      title: "Cosmic Inflation Theory",
      category: "universe",
      summary: "Exponential expansion of the universe during the first 10^-36 seconds driven by negative-pressure vacuum energy.",
      details: "Conceived by Alan Guth and Andrei Linde, resolving the Flatness and Horizon problems and generating microscopic quantum perturbations that seeded large-scale galaxies.",
      image_url: "/images/theories/cosmic_inflation.jpg"
    },
    {
      id: "th-003",
      title: "The Multiverse Hypothesis",
      category: "multiverse",
      summary: "Concept that our observable bubble universe is merely one pocket among an infinite ensemble of disconnected universes.",
      details: "Emerges naturally from eternal chaotic inflation and string theory landscape calculations with 10^500 possible vacuum compactification geometries.",
      image_url: "/images/theories/multiverse.jpg"
    },
    {
      id: "th-004",
      title: "String Theory & M-Theory",
      category: "quantum gravity",
      summary: "Fundamental physics framework replacing 0D point particles with 1D vibrating quantum strings in 11 dimensions.",
      details: "Unifies General Relativity with quantum field theory, deriving the spin-2 graviton naturally and calculating black hole microscopic Bekenstein-Hawking entropy.",
      image_url: "/images/theories/string_theory.jpg"
    },
    {
      id: "th-005",
      title: "Dark Matter & Dark Energy",
      category: "dark matter",
      summary: "95% of cosmic energy density resides in non-luminous Cold Dark Matter (27%) and accelerating Dark Energy (68%).",
      details: "Evidenced by galactic rotation velocity curves (Vera Rubin), gravitational lensing in colliding galaxy clusters (Bullet Cluster), and Type Ia supernovae standard candles.",
      image_url: "/images/theories/dark_matter.jpg"
    }
  ],

  articles: [
    {
      id: "art-001",
      title: "James Webb Telescope Unveils Massive Primordial Galaxies",
      summary: "JWST deep near-infrared surveys detect mature galaxies existing merely 350-500 million years after the Big Bang, challenging standard hierarchical assembly timelines.",
      url: "https://webbtelescope.org/news",
      published_at: "2026-09-15",
      category: "Deep Space Observation",
      author_id: "a1b2c3d4-0001-4000-8000-000000000001",
      image_url: "/images/articles/jwst_deep_field.jpg"
    },
    {
      id: "art-002",
      title: "Event Horizon Telescope Captures Polarized Light Around Sgr A*",
      summary: "New submillimeter polarimetric imaging reveals strong, twisted, spiraling magnetic fields lining the shadow boundary of our galactic center supermassive black hole.",
      url: "https://eventhorizontelescope.org",
      published_at: "2026-08-28",
      category: "Relativistic Astrophysics",
      author_id: "a1b2c3d4-0001-4000-8000-000000000001",
      image_url: "/images/black_holes/sagittarius_a.jpg"
    },
    {
      id: "art-003",
      title: "Hubble Tension Intensifies with New Cepheid & Supernova Measurements",
      summary: "A 5-sigma discrepancy persists between local late-universe expansion measurements (73 km/s/Mpc) and Planck early-universe predictions (67.4 km/s/Mpc).",
      url: "https://hubblesite.org/news",
      published_at: "2026-07-10",
      category: "Cosmology",
      author_id: "a1b2c3d4-0001-4000-8000-000000000001",
      image_url: "/images/articles/hubble_tension.jpg"
    },
    {
      id: "art-004",
      title: "Phosphorus and Organics Confirmed in Enceladus Cryovolcanic Plumes",
      summary: "Cassini Cosmic Dust Analyzer re-analysis identifies sodium phosphate salts erupting from Saturn's ocean moon, completing the essential bio-essential elements recipe.",
      url: "https://science.nasa.gov",
      published_at: "2026-06-20",
      category: "Astrobiology",
      author_id: "a1b2c3d4-0001-4000-8000-000000000001",
      image_url: "/images/articles/enceladus.jpg"
    }
  ],

  favorites: [
    {
      id: "fav-001",
      user_id: "a1b2c3d4-0002-4000-8000-000000000002",
      item_type: "celestial_events",
      item_id: "evt-001",
      created_at: "2026-02-01T10:00:00.000Z"
    },
    {
      id: "fav-002",
      user_id: "a1b2c3d4-0002-4000-8000-000000000002",
      item_type: "stars_constellations",
      item_id: "star-002",
      created_at: "2026-02-05T14:30:00.000Z"
    },
    {
      id: "fav-003",
      user_id: "a1b2c3d4-0002-4000-8000-000000000002",
      item_type: "black_holes",
      item_id: "bh-001",
      created_at: "2026-02-10T18:45:00.000Z"
    }
  ],

  event_reminders: [
    {
      id: "rem-001",
      user_id: "a1b2c3d4-0002-4000-8000-000000000002",
      event_id: "evt-001",
      created_at: "2026-02-01T10:05:00.000Z"
    }
  ]
};
