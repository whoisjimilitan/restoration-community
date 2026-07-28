/**
 * Spiritual Journey Illustrations
 * Premium monochrome SVGs for deliverance page sections
 * Color: #0D5E57 (teal accent), monochrome strokes
 */

export function ChainsToLightIcon() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-20 h-20 mx-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left side: broken chains */}
      <g opacity="0.6">
        <circle cx="50" cy="80" r="8" stroke="#1A1A18" strokeWidth="1.5" />
        <path d="M50 88 L50 110" stroke="#1A1A18" strokeWidth="2" />
        <circle cx="50" cy="118" r="8" stroke="#1A1A18" strokeWidth="1.5" />
      </g>

      {/* Center: break/gap */}
      <line x1="70" y1="100" x2="130" y2="100" stroke="#0D5E57" strokeWidth="2" />

      {/* Right side: rays of light */}
      <circle cx="160" cy="100" r="12" stroke="#0D5E57" strokeWidth="2" />
      <line x1="160" y1="75" x2="160" y2="55" stroke="#0D5E57" strokeWidth="1.5" />
      <line x1="160" y1="125" x2="160" y2="145" stroke="#0D5E57" strokeWidth="1.5" />
      <line x1="135" y1="100" x2="115" y2="100" stroke="#0D5E57" strokeWidth="1.5" />
      <line x1="185" y1="100" x2="165" y2="100" stroke="#0D5E57" strokeWidth="1.5" />
      <line x1="145" y1="75" x2="130" y2="60" stroke="#0D5E57" strokeWidth="1.5" />
      <line x1="175" y1="125" x2="190" y2="140" stroke="#0D5E57" strokeWidth="1.5" />
    </svg>
  );
}

export function DoorOpeningIcon() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-20 h-20 mx-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Door frame */}
      <rect x="30" y="40" width="70" height="120" stroke="#1A1A18" strokeWidth="2" />

      {/* Door (open, swinging to right) */}
      <path
        d="M30 40 L100 50 L100 160 L30 160"
        stroke="#0D5E57"
        strokeWidth="2"
        fill="none"
      />

      {/* Door hinge point */}
      <circle cx="30" cy="100" r="4" fill="#0D5E57" />

      {/* Light coming through */}
      <line x1="105" y1="60" x2="140" y2="40" stroke="#0D5E57" strokeWidth="1.5" />
      <line x1="105" y1="100" x2="150" y2="100" stroke="#0D5E57" strokeWidth="1.5" />
      <line x1="105" y1="140" x2="140" y2="160" stroke="#0D5E57" strokeWidth="1.5" />
    </svg>
  );
}

export function DescentToAscentIcon() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-20 h-20 mx-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left path: descent (downward curve) */}
      <path
        d="M 40 40 Q 60 70 60 120"
        stroke="#1A1A18"
        strokeWidth="2"
        fill="none"
        opacity="0.4"
      />
      {/* Bottom point */}
      <circle cx="60" cy="130" r="5" fill="#1A1A18" opacity="0.4" />

      {/* Center: transformation point */}
      <circle cx="100" cy="130" r="8" stroke="#0D5E57" strokeWidth="2" fill="#0D5E57" />

      {/* Right path: ascent (upward curve) */}
      <path
        d="M 140 130 Q 140 70 160 40"
        stroke="#0D5E57"
        strokeWidth="2"
        fill="none"
      />
      {/* Top point */}
      <circle cx="160" cy="35" r="5" fill="#0D5E57" />

      {/* Light at top */}
      <circle cx="160" cy="20" r="3" fill="#0D5E57" />
      <line x1="160" y1="25" x2="160" y2="15" stroke="#0D5E57" strokeWidth="1" />
    </svg>
  );
}

export function EmptyToFilledIcon() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-20 h-20 mx-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left vessel: empty */}
      <path
        d="M 40 50 L 50 160 L 70 160 L 80 50 Z"
        stroke="#1A1A18"
        strokeWidth="2"
        fill="none"
        opacity="0.4"
      />

      {/* Center: arrow of transformation */}
      <line x1="100" y1="105" x2="125" y2="105" stroke="#0D5E57" strokeWidth="2" />
      <polygon points="125,105 115,100 115,110" fill="#0D5E57" />

      {/* Right vessel: filled */}
      <path
        d="M 140 50 L 150 160 L 170 160 L 180 50 Z"
        stroke="#0D5E57"
        strokeWidth="2"
        fill="#0D5E57"
        opacity="0.2"
      />

      {/* Liquid inside filled vessel */}
      <path
        d="M 150 120 L 170 120 Q 170 100 160 100 Q 150 100 150 120"
        fill="#0D5E57"
        opacity="0.6"
      />
    </svg>
  );
}

export function ProdigalReturnIcon() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-20 h-20 mx-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Distant land: small circle far left */}
      <circle cx="25" cy="100" r="8" stroke="#1A1A18" strokeWidth="1.5" opacity="0.3" />

      {/* Path of return (curved) */}
      <path
        d="M 35 100 Q 70 60 150 90"
        stroke="#0D5E57"
        strokeWidth="2.5"
        fill="none"
        strokeDasharray="5,3"
      />

      {/* Home: house shape on right */}
      <rect x="130" y="110" width="50" height="40" stroke="#0D5E57" strokeWidth="2" />
      <polygon points="130,110 155,85 180,110" stroke="#0D5E57" strokeWidth="2" fill="none" />

      {/* Door */}
      <rect x="145" y="120" width="20" height="30" stroke="#0D5E57" strokeWidth="1.5" />

      {/* Figure approaching */}
      <circle cx="145" cy="145" r="4" fill="#0D5E57" />

      {/* Light/welcome rays from house */}
      <line x1="155" y1="110" x2="155" y2="90" stroke="#0D5E57" strokeWidth="1" opacity="0.6" />
      <line x1="165" y1="112" x2="175" y2="95" stroke="#0D5E57" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

export function JourneyJustBeginningIcon() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-20 h-20 mx-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Seven-step path (7 circles = 7 stages) */}
      <g>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const x = 30 + i * 24;
          const y = 100;
          const isCurrent = i === 0;

          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={isCurrent ? 6 : 4}
              fill={isCurrent ? '#0D5E57' : 'none'}
              stroke={isCurrent ? '#0D5E57' : '#1A1A18'}
              strokeWidth={isCurrent ? 0 : 1.5}
              opacity={isCurrent ? 1 : 0.4}
            />
          );
        })}
      </g>

      {/* Connecting line */}
      <line x1="30" y1="100" x2="180" y2="100" stroke="#0D5E57" strokeWidth="1.5" opacity="0.3" />

      {/* Arrow showing direction forward */}
      <line x1="185" y1="100" x2="195" y2="100" stroke="#0D5E57" strokeWidth="2" />
      <polygon points="195,100 190,95 190,105" fill="#0D5E57" />

      {/* Subtle "first step" label under current position */}
      <text x="30" y="125" fontSize="10" fill="#0D5E57" opacity="0.6" textAnchor="middle">
        Start
      </text>
    </svg>
  );
}
