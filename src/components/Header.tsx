import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, User, Menu, X, Search } from 'lucide-react';
import CartSheet from './CartSheet';
import { Input } from '@/components/ui/input';
import { useSearch } from '@/hooks/useSearch';
import SearchResults from './SearchResults';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { profile } = useProfile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { results, loading } = useSearch(searchQuery);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };
    if (searchOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [searchOpen]);

  // Close search on route change
  useEffect(() => {
    setSearchOpen(false);
    setSearchQuery('');
  }, [location.pathname]);

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery('');
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'Home', pun: 'Sweet home!', path: '/' },
    { label: 'Menu', pun: "What's cooking?", path: '/menu' },
    { label: 'Cuisines', pun: 'World tour!', path: '/cuisines' },
    { label: 'Blog', pun: 'Tasty reads!', path: '/blog' },
    { label: 'Café', pun: 'Brew-tiful!', path: '/cafe' },
    { label: 'Desserts', pun: 'Sweet tooth!', path: '/desserts' },
    { label: 'About', pun: 'Our story!', path: '/about' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img 
            src={logo} 
            alt="BiteSide Story" 
            className="h-14 w-auto"
          />
          <span className="hidden sm:inline-flex items-center gap-1 bg-halal-bg text-halal text-[10px] font-quicksand font-bold px-2 py-0.5 rounded-full border border-halal-border">
            ☪ 100% Halal
          </span>
        </Link>

        {/* Desktop Navigation Links + Search Overlay */}
        <div className="hidden md:flex items-center gap-3 lg:gap-6 relative">
          {/* Nav links - fade out when search is open */}
          <ul className={cn(
            'flex items-center gap-3 lg:gap-6 text-sm lg:text-base transition-all duration-300',
            searchOpen ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'
          )}>
            {navItems.map((item) => (
              <li key={item.label} className="pun-trigger relative group">
                <Link 
                  to={item.path}
                  className={cn(
                    'font-quicksand font-semibold transition-all duration-300 py-2 px-1 relative',
                    'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5',
                    'after:bg-gradient-to-r after:from-primary after:to-accent',
                    'after:scale-x-0 after:origin-left after:transition-transform after:duration-300',
                    'group-hover:after:scale-x-100',
                    location.pathname === item.path 
                      ? 'text-primary after:scale-x-100' 
                      : 'text-foreground/80 hover:text-primary'
                  )}
                >
                  {item.label}
                </Link>
                <span className="pun-tooltip -bottom-10 left-1/2 -translate-x-1/2">
                  {item.pun}
                </span>
              </li>
            ))}
          </ul>

          {/* Search overlay */}
          <div className={cn(
            'absolute inset-0 flex items-center transition-all duration-300',
            searchOpen ? 'opacity-100 scale-100' : 'opacity-0 pointer-events-none scale-95'
          )}>
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search dishes, cuisines, blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 h-10 rounded-full border-primary/30 focus-visible:ring-primary/30 bg-muted/50 font-quicksand"
                autoFocus={searchOpen}
              />
              <button
                onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Cart, Auth & Mobile Burger */}
        <div className="flex items-center gap-3">
          {/* Search Icon */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className={cn(
              'hidden md:flex items-center justify-center w-10 h-10 rounded-full transition-colors',
              searchOpen ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:text-primary hover:bg-muted/50'
            )}
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          <CartSheet />
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-primary/20">
                    <AvatarImage src={profile?.avatar_url ?? undefined} alt={user.email || 'User'} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {profile?.username?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {profile?.username?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none max-w-[150px] truncate">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => signOut()}
                  className="text-destructive focus:text-destructive cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link 
                to="/auth" 
                className="font-quicksand font-semibold text-foreground/80 hover:text-primary transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/auth" 
                className="font-quicksand font-semibold px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Burger Button */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-muted/50 text-foreground hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-background/95 backdrop-blur-lg border-b border-border/50',
          mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        {/* Mobile Search */}
        <div className="container mx-auto px-4 pt-4 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search dishes, cuisines, blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 rounded-full border-primary/30 focus-visible:ring-primary/30 bg-muted/50 font-quicksand"
            />
          </div>
        </div>
        <ul className="container mx-auto px-4 pb-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'block font-quicksand font-semibold py-3 px-4 rounded-xl transition-all duration-200',
                  location.pathname === item.path
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground/80 hover:text-primary hover:bg-muted/50'
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
          {!user && (
            <li className="flex gap-3 pt-3 mt-2 border-t border-border/30">
              <Link
                to="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center font-quicksand font-semibold py-3 rounded-xl text-foreground/80 hover:text-primary hover:bg-muted/50 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center font-quicksand font-semibold py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Sign Up
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
