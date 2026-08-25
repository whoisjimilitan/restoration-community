export default function SiteFooter({ precededByDarkSection = false }: { precededByDarkSection?: boolean }) {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/my-story', label: 'The Series' },
    { href: '/book', label: 'The Book' },
    { href: '/scriptures', label: 'Scriptures' },
    { href: '/get-help', label: 'Get Help' },
    { href: '/about', label: 'About' },
    { href: '/deliverances', label: 'Deliverances' },
  ];

  return (
    <footer
      className={`w-full px-6 sm:px-8 md:px-12 py-8 bg-rc-text text-center border-t ${
        precededByDarkSection ? 'border-white/10' : 'border-rc-border'
      }`}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 flex-wrap">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/80 hover:text-white transition-colors group text-sm"
            >
              {link.label}
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
          ))}
        </div>
        <p className="text-white/40 text-xs">© 2026. All rights reserved.</p>
      </div>
    </footer>
  );
}
