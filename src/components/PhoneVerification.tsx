import { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle, MessageCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

interface PhoneVerificationProps {
  phone: string;
  onVerified: () => void;
  isVerified: boolean;
}

const PhoneVerification = ({ phone, onVerified, isVerified }: PhoneVerificationProps) => {
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [sending, setSending] = useState(false);
  const generatedOtp = useRef('');

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSendOtp = () => {
    if (!phone.trim() || phone.trim().length < 10) {
      toast.error('Please enter a valid phone number first');
      return;
    }

    setSending(true);
    const otp = generateOtp();
    generatedOtp.current = otp;

    const cleanPhone = phone.replace(/\s+/g, '').replace(/^\+/, '');
    const message = encodeURIComponent(
      `🔐 Your BiteSide Story verification code is: *${otp}*\n\nPlease enter this code on the checkout page to verify your phone number. Do not share this code with anyone.`
    );
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${message}`;
    const link = document.createElement('a');
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();

    setTimeout(() => {
      setSending(false);
      setOtpSent(true);
      toast.success('Verification code sent via WhatsApp!');
    }, 1000);
  };

  const handleVerify = () => {
    if (otpValue === generatedOtp.current) {
      onVerified();
      toast.success('Phone number verified! ✅');
    } else {
      toast.error('Invalid code. Please try again.');
      setOtpValue('');
    }
  };

  if (isVerified) {
    return (
      <div className="flex items-center gap-2 p-3 rounded-2xl bg-primary/5 border border-primary/20">
        <CheckCircle className="h-5 w-5 text-primary" />
        <span className="font-quicksand font-semibold text-sm text-primary">Phone verified</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {!otpSent ? (
        <Button
          type="button"
          variant="outline"
          onClick={handleSendOtp}
          disabled={sending || !phone.trim()}
          className="w-full rounded-2xl font-quicksand font-semibold border-primary/30 hover:bg-primary/5"
        >
          {sending ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <MessageCircle className="h-4 w-4 mr-2" />
          )}
          {sending ? 'Sending...' : 'Verify via WhatsApp'}
        </Button>
      ) : (
        <div className="space-y-3 p-4 rounded-2xl bg-muted/50 border border-border/50">
          <p className="font-quicksand text-sm text-muted-foreground">
            Enter the 6-digit code sent to your WhatsApp:
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
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={handleVerify}
              disabled={otpValue.length !== 6}
              className="flex-1 rounded-2xl font-quicksand font-semibold"
            >
              Verify
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={handleSendOtp}
              className="rounded-2xl font-quicksand text-sm"
            >
              Resend
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneVerification;
