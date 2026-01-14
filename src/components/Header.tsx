import logo from '@/assets/logo.png';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img 
            src={logo} 
            alt="BiteSide Story" 
            className="h-14 w-auto animate-float"
          />
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-2">
          {[
            { label: 'Home', pun: 'Sweet home!' },
            { label: 'Menu', pun: 'What\'s cooking?' },
            { label: 'Cuisines', pun: 'World tour!' },
            { label: 'About', pun: 'Our story!' },
          ].map((item) => (
            <li key={item.label} className="pun-trigger relative">
              <button className="btn-teacup text-sm">
                {item.label}
              </button>
              <span className="pun-tooltip -bottom-10 left-1/2 -translate-x-1/2">
                {item.pun}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button className="btn-lemon text-sm px-5 py-2">
          Order Now 🍋
        </button>
      </nav>
    </header>
  );
};

export default Header;
