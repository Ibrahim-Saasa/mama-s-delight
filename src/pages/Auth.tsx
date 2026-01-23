import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import backgroundPattern from '@/assets/background-pattern.png';
import logo from '@/assets/logo.png';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';
import { z } from 'zod';
import { toast } from 'sonner';

const emailSchema = z.string().email('Please enter a valid email address');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});
  
  const { signIn, signUp, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      newErrors.email = emailResult.error.errors[0].message;
    }
    
    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      newErrors.password = passwordResult.error.errors[0].message;
    }
    
    if (isSignUp && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      if (isSignUp) {
        const { error } = await signUp(email, password);
        if (error) {
          if (error.message.includes('already registered')) {
            toast.error('This email is already registered. Try signing in instead!');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success('Welcome aboard! 🎉 You\'re now signed up!');
          navigate('/');
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast.error('Oops! Wrong email or password. Try again!');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success('Welcome back! 🍴 Ready to explore?');
          navigate('/');
        }
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again!');
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen relative flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${backgroundPattern})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-background/70 pointer-events-none" />
      
      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-card/95 backdrop-blur-sm rounded-3xl shadow-glow-pink p-8 border border-border/50">
          {/* Logo */}
          <Link to="/" className="flex justify-center mb-6">
            <img src={logo} alt="BiteSide Story" className="h-16" />
          </Link>
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-fredoka text-3xl text-shimmer mb-2">
              {isSignUp ? 'Join the Feast! 🎉' : 'Welcome Back! 🍴'}
            </h1>
            <p className="font-quicksand text-muted-foreground">
              {isSignUp 
                ? 'Create an account to start your flavor journey' 
                : 'Sign in to continue your delicious adventure'}
            </p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-background/50 border border-border/50 font-quicksand focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>
              {errors.email && (
                <p className="text-destructive text-sm mt-1 font-quicksand">{errors.email}</p>
              )}
            </div>
            
            {/* Password */}
            <div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-background/50 border border-border/50 font-quicksand focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>
              {errors.password && (
                <p className="text-destructive text-sm mt-1 font-quicksand">{errors.password}</p>
              )}
            </div>
            
            {/* Confirm Password (Sign Up only) */}
            {isSignUp && (
              <div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-background/50 border border-border/50 font-quicksand focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-destructive text-sm mt-1 font-quicksand">{errors.confirmPassword}</p>
                )}
              </div>
            )}
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-fredoka text-lg flex items-center justify-center gap-2 hover:shadow-glow-pink transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground border-t-transparent" />
              ) : (
                <>
                  {isSignUp ? 'Create Account' : 'Sign In'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
          
          {/* Toggle */}
          <div className="mt-6 text-center">
            <p className="font-quicksand text-muted-foreground">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setErrors({});
                }}
                className="ml-2 text-primary font-semibold hover:underline"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
          
          {/* Fun decoration */}
          <div className="absolute -top-4 -right-4">
            <Sparkles className="w-8 h-8 text-accent animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
