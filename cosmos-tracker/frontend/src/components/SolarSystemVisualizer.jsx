import React, { useState } from 'react';
import { Sparkles, Info, Eye } from 'lucide-react';

export const SolarSystemVisualizer = ({ onSelectPlanet }) => {
  const [hoveredPlanet, setHoveredPlanet] = useState(null);

  const planets = [
    { name: 'Mercury', distance: '0.39 AU', period: '88 days', color: '#cbd5e1', size: 6, radius: 45, speed: 4.1 },
    { name: 'Venus', distance: '0.72 AU', period: '225 days', color: '#fde047', size: 9, radius: 70, speed: 1.6 },
    { name: 'Earth', distance: '1.00 AU', period: '365 days', color: '#38bdf8', size: 10, radius: 98, speed: 1.0 },
    { name: 'Mars', distance: '1.52 AU', period: '687 days', color: '#fb7185', size: 7, radius: 125, speed: 0.53 },
    { name: 'Ceres', distance: '2.77 AU', period: '4.6 yrs', color: '#a3a3a3', size: 5, radius: 145, speed: 0.22, isDwarf: true },
    { name: 'Jupiter', distance: '5.20 AU', period: '11.8 yrs', color: '#fdba74', size: 18, radius: 172, speed: 0.08 },
    { name: 'Saturn', distance: '9.58 AU', period: '29.5 yrs', color: '#fef08a', size: 15, radius: 215, speed: 0.034, hasRings: true },
    { name: 'Uranus', distance: '19.2 AU', period: '84.0 yrs', color: '#67e8f9', size: 12, radius: 252, speed: 0.012 },
    { name: 'Neptune', distance: '30.1 AU', period: '164.8 yrs', color: '#818cf8', size: 12, radius: 282, speed: 0.006 },
    { name: 'Pluto', distance: '39.5 AU', period: '248 yrs', color: '#fca5a5', size: 5, radius: 305, speed: 0.004, isDwarf: true }
  ];

  return (
    <div className="glass-panel" style={{
      padding: '1.75rem',
      borderRadius: 'var(--radius-xl)',
      marginBottom: '2.5rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <span className="badge badge-gold" style={{ marginBottom: '0.35rem' }}>
            Interactive Orrery
          </span>
          <h3 style={{ fontSize: '1.35rem', color: '#fff' }}>
            Solar System Orbital Model
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Real-time visualizer of heliocentric orbits. Click or hover any planet to inspect details.
          </p>
        </div>

        {hoveredPlanet && (
          <div style={{
            background: 'rgba(56, 189, 248, 0.12)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '0.5rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            animation: 'fadeIn 0.2s ease'
          }}>
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', textTransform: 'uppercase' }}>Selected Body</span>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{hoveredPlanet.name}</div>
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', textTransform: 'uppercase' }}>Semi-Major Axis</span>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--cyan-primary)' }}>{hoveredPlanet.distance}</div>
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', textTransform: 'uppercase' }}>Period</span>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--gold-accent)' }}>{hoveredPlanet.period}</div>
            </div>
          </div>
        )}
      </div>

      {/* SVG Solar System Canvas */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '380px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle, rgba(15, 23, 42, 0.9) 0%, rgba(5, 7, 14, 0.95) 75%)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)',
        overflow: 'hidden'
      }}>
        <svg
          viewBox="-320 -320 640 640"
          style={{ width: '100%', height: '100%', maxWidth: '720px' }}
        >
          {/* Central Sun with Radiant Flare */}
          <circle cx="0" cy="0" r="28" fill="url(#sunGlow)" />
          <circle cx="0" cy="0" r="16" fill="#fbbf24" filter="url(#sunBlur)" />
          <circle cx="0" cy="0" r="12" fill="#fffbeb" />

          {/* Gradients and Filters */}
          <defs>
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#d97706" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
            <filter id="sunBlur">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {/* Main Asteroid Belt Particle Torus (Between Mars and Jupiter) */}
          <g
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setHoveredPlanet({
              name: 'Main Asteroid Belt',
              distance: '2.1 - 3.3 AU',
              period: '3.0 - 6.0 yrs'
            })}
            onClick={() => onSelectPlanet && onSelectPlanet('The Main Asteroid Belt')}
          >
            <circle cx="0" cy="0" r="148" fill="none" stroke="rgba(251, 191, 36, 0.15)" strokeWidth="22" strokeDasharray="3, 8" />
            <circle cx="0" cy="0" r="148" fill="none" stroke="rgba(203, 213, 225, 0.25)" strokeWidth="8" strokeDasharray="1, 5" />
            {Array.from({ length: 54 }).map((_, i) => {
              const theta = (i * (360 / 54) + (i % 3) * 2) * (Math.PI / 180);
              const r = 138 + ((i * 7) % 20);
              return (
                <circle
                  key={`ast-${i}`}
                  cx={Math.cos(theta) * r}
                  cy={Math.sin(theta) * r}
                  r={i % 6 === 0 ? 1.6 : 1.0}
                  fill={i % 3 === 0 ? '#fef08a' : '#cbd5e1'}
                  opacity={0.7}
                />
              );
            })}
          </g>

          {/* Planetary Orbit Rings & Animated Planets */}
          {planets.map((planet, index) => {
            const angleOffset = (index * 45) * (Math.PI / 180);
            const cx = Math.cos(angleOffset) * planet.radius;
            const cy = Math.sin(angleOffset) * planet.radius;
            const isHovered = hoveredPlanet?.name === planet.name;

            return (
              <g key={planet.name}>
                {/* Orbit Trajectory Track */}
                <circle
                  cx="0"
                  cy="0"
                  r={planet.radius}
                  fill="none"
                  stroke={isHovered ? 'rgba(56, 189, 248, 0.6)' : 'rgba(255, 255, 255, 0.08)'}
                  strokeWidth={isHovered ? 1.5 : 1}
                  strokeDasharray={index > 3 ? '4,4' : 'none'}
                />

                {/* Interactive Planet Entity */}
                <g
                  transform={`translate(${cx}, ${cy})`}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredPlanet(planet)}
                  onClick={() => onSelectPlanet && onSelectPlanet(planet.name)}
                >
                  {/* Planet Glow on Hover */}
                  {isHovered && (
                    <circle
                      cx="0"
                      cy="0"
                      r={planet.size + 8}
                      fill="none"
                      stroke={planet.color}
                      strokeWidth="2"
                      opacity="0.8"
                    />
                  )}

                  {/* Saturn Rings */}
                  {planet.hasRings && (
                    <ellipse
                      cx="0"
                      cy="0"
                      rx={planet.size * 2.2}
                      ry={planet.size * 0.7}
                      fill="none"
                      stroke="#fde68a"
                      strokeWidth="3.5"
                      opacity="0.75"
                      transform="rotate(-22)"
                    />
                  )}

                  {/* Planet Body */}
                  <circle
                    cx="0"
                    cy="0"
                    r={planet.size}
                    fill={planet.color}
                    style={{
                      transition: 'transform 0.2s ease',
                      filter: isHovered ? `drop-shadow(0 0 8px ${planet.color})` : 'none'
                    }}
                  />

                  {/* Planet Label */}
                  <text
                    x="0"
                    y={planet.size + 14}
                    textAnchor="middle"
                    fill={isHovered ? '#ffffff' : 'var(--text-muted)'}
                    fontSize={isHovered ? '11px' : '9px'}
                    fontFamily="var(--font-heading)"
                    fontWeight={isHovered ? '700' : '500'}
                  >
                    {planet.name}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
