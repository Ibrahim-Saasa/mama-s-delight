import { Link, useLocation } from 'react-router-dom';
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
import { LogOut, User } from 'lucide-react';
import CartSheet from './CartSheet';

const Header = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navItems = [
    { label: 'Home', pun: 'Sweet home!', path: '/' },
    { label: 'Menu', pun: "What's cooking?", path: '/menu' },
    { label: 'Cuisines', pun: 'World tour!', path: '/#cuisines' },
    { label: 'About', pun: 'Our story!', path: '/#about' },
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
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-6">
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

        {/* Cart & Auth Links */}
        <div className="flex items-center gap-3">
          <CartSheet />
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-primary/20">
                    <AvatarImage src={undefined} alt={user.email || 'User'} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {user.email?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {user.email?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.email}</p>
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
            <>
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
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
