export default function BrotherJimiLogo({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizeMap = {
    sm: '24',
    md: '32',
    lg: '48',
  };

  const dimensions = sizeMap[size];

  return (
    <svg
      viewBox="0 0 64 64"
      width={dimensions}
      height={dimensions}
      className={className}
      aria-label="Brother Jimi - Deliverance Through Jesus Christ"
    >
      {/* Premium cross mark — Jesus Christ as the foundation */}
      {/* Vertical bar: eternal truth, ascending redemption */}
      <path
        d="M32 8 L32 56 M24 32 L40 32"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Subtle restoration frame — 4-fold wholeness */}
      <circle
        cx="32"
        cy="32"
        r="28"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.2"
      />

      {/* Ascension points at cardinal directions — restoration reaching out */}
      <circle cx="32" cy="10" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="54" cy="32" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="32" cy="54" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="10" cy="32" r="1.5" fill="currentColor" opacity="0.5" />

      {/* Center point — wholeness in Christ */}
      <circle cx="32" cy="32" r="2" fill="currentColor" opacity="0.7" />
    </svg>
  );
}
