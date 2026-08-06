interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <img
      src="/logo.svg"
      alt="Brother Jimi Restoration Community"
      className={`${sizeMap[size]} ${className}`}
    />
  );
}
