import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import backgroundPattern from '@/assets/background-pattern.png';
import logo from '@/assets/logo.png';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Sparkles, PartyPopper, UtensilsCrossed, Phone, MessageCircle, Loader2 } from 'lucide-react';
import { z } from 'zod';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

const emailSchema = z.string().email('Please enter a valid email address');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

type AuthMethod = 'email' | 'phone';
type PhoneStep = 'enter' | 'otp';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [authMethod, setAuthMethod] = useState<AuthMethod>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string; phone?: string }>({});

  // Phone auth state
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneStep, setPhoneStep] = useState<PhoneStep>('enter');
  const [otpValue, setOtpValue] = useState('');
  const [sendingOtp, setSendingOtp] = useState(false);
  const generatedOtp = useRef('');

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

  const handleEmailSubmit = async (e: React.FormEvent) => {
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
          toast.success("Check your email! 📧 We've sent you a verification link to confirm your account.");
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
    } catch {
      toast.error('Something went wrong. Please try again!');
    } finally {
      setIsLoading(false);
    }
  };

  // Phone auth helpers
  const phoneToEmail = (phone: string) => {
    const clean = phone.replace(/\D/g, '');
    return `phone_${clean}@biteside.phone.local`;
  };

  const handleSendOtp = () => {
    const clean = phoneNumber.replace(/\s+/g, '').replace(/^\+/, '');
    if (clean.length < 10) {
      setErrors({ phone: 'Please enter a valid phone number' });
      return;
    }
    setErrors({});
    setSendingOtp(true);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    generatedOtp.current = otp;

    const message = encodeURIComponent(
      `🔐 Your BiteSide Story verification code is: *${otp}*\n\nPlease enter this code to sign in. Do not share this code with anyone.`
    );
    const whatsappUrl = `https://wa.me/${clean}?text=${message}`;
    const link = document.createElement('a');
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();

    setTimeout(() => {
      setSendingOtp(false);
      setPhoneStep('otp');
      toast.success('Verification code sent via WhatsApp!');
    }, 1000);
  };

  const handlePhoneVerifyAndSignIn = async () => {
    if (otpValue !== generatedOtp.current) {
      toast.error('Invalid code. Please try again.');
      setOtpValue('');
      return;
    }

    setIsLoading(true);
    const derivedEmail = phoneToEmail(phoneNumber);
    const derivedPassword = `phone_auth_${phoneNumber.replace(/\D/g, '')}_secure`;

    try {
      // Try sign in first
      const { error: signInError } = await signIn(derivedEmail, derivedPassword);
      if (signInError) {
        // If doesn't exist, sign up then auto-confirm via edge function
        const { error: signUpError } = await signUp(derivedEmail, derivedPassword);
        if (signUpError) {
          toast.error(signUpError.message);
          setIsLoading(false);
          return;
        }

        // Get the newly created user and confirm via edge function
        const { data: signUpData } = await supabase.auth.getSession();
        // We need the user id from the signup - fetch it by signing in with admin confirm
        const confirmRes = await supabase.functions.invoke('confirm-phone-user', {
          body: { userId: signUpData?.session?.user?.id },
        });

        // If no session yet (unconfirmed), try to get user id another way
        if (!signUpData?.session?.user?.id) {
          // Sign up returns user even when unconfirmed - re-attempt signup to get user
          // The user was already created, so we need to find them
          // Try signing in - it should work now after confirmation
          const { error: retryError } = await signIn(derivedEmail, derivedPassword);
          if (retryError) {
            // User exists but not confirmed - call edge function with a lookup approach
            const lookupRes = await fetch(
              `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/confirm-phone-user`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
                  'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
                },
                body: JSON.stringify({ email: derivedEmail }),
              }
            );
            
            if (lookupRes.ok) {
              // Now try sign in again
              const { error: finalError } = await signIn(derivedEmail, derivedPassword);
              if (finalError) {
                toast.error('Something went wrong. Please try again.');
                setIsLoading(false);
                return;
              }
            } else {
              toast.error('Could not verify your account. Please try again.');
              setIsLoading(false);
              return;
            }
          }
        }
      }

      // Save phone to profile
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (currentUser) {
        await supabase
          .from('profiles')
          .update({ phone: phoneNumber } as any)
          .eq('user_id', currentUser.id);
      }

      toast.success('Welcome! 📱 Signed in with your phone!');
      navigate('/');
    } catch {
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
          <div className="text-center mb-6">
            <h1 className="font-fredoka text-3xl text-shimmer mb-2 flex items-center justify-center gap-2">
              {isSignUp ? (
                <>Join the Feast! <PartyPopper className="w-7 h-7 inline-block text-accent" /></>
              ) : (
                <>Welcome Back! <UtensilsCrossed className="w-7 h-7 inline-block text-accent" /></>
              )}
            </h1>
            <p className="font-quicksand text-muted-foreground">
              {isSignUp
                ? 'Create an account to start your flavor journey'
                : 'Sign in to continue your delicious adventure'}
            </p>
          </div>

          {/* Method Toggle */}
          <div className="flex bg-muted/50 rounded-2xl p-1 mb-6">
            <button
              type="button"
              onClick={() => { setAuthMethod('email'); setErrors({}); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-quicksand font-semibold text-sm transition-all ${
                authMethod === 'email'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Mail className="h-4 w-4" /> Email
            </button>
            <button
              type="button"
              onClick={() => { setAuthMethod('phone'); setErrors({}); setPhoneStep('enter'); setOtpValue(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-quicksand font-semibold text-sm transition-all ${
                authMethod === 'phone'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Phone className="h-4 w-4" /> Phone
            </button>
          </div>

          {/* Email Form */}
          {authMethod === 'email' && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
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
          )}

          {/* Phone Form */}
          {authMethod === 'phone' && (
            <div className="space-y-4">
              {phoneStep === 'enter' && (
                <>
                  <div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-2xl bg-background/50 border border-border/50 font-quicksand focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-destructive text-sm mt-1 font-quicksand">{errors.phone}</p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={sendingOtp || !phoneNumber.trim()}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-fredoka text-lg flex items-center justify-center gap-2 hover:shadow-glow-pink transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sendingOtp ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        <MessageCircle className="w-5 h-5" />
                        Send Code via WhatsApp
                      </>
                    )}
                  </button>
                </>
              )}

              {phoneStep === 'otp' && (
                <div className="space-y-4">
                  <p className="font-quicksand text-sm text-muted-foreground text-center">
                    Enter the 6-digit code sent to your WhatsApp
                  </p>
                  <div className="flex justify-center">
                    <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  <button
                    type="button"
                    onClick={handlePhoneVerifyAndSignIn}
                    disabled={isLoading || otpValue.length !== 6}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-fredoka text-lg flex items-center justify-center gap-2 hover:shadow-glow-pink transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground border-t-transparent" />
                    ) : (
                      <>
                        Verify & Sign In
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <div className="flex justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => { setPhoneStep('enter'); setOtpValue(''); }}
                      className="text-sm text-muted-foreground hover:text-foreground font-quicksand"
                    >
                      Change number
                    </button>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="text-sm text-primary hover:underline font-quicksand font-semibold"
                    >
                      Resend code
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Toggle (email only) */}
          {authMethod === 'email' && (
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
          )}

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
