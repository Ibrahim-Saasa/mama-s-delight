import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MessageCircle, Banknote, ArrowLeft, MapPin, Phone, User } from 'lucide-react';
import { toast } from 'sonner';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'whatsapp' | 'cod'>('whatsapp');

  if (!user) {
    navigate('/auth');
    return null;
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 pt-28 pb-16 text-center">
          <span className="text-7xl block mb-6">🛒</span>
          <h1 className="font-fredoka text-3xl text-foreground mb-4">Your cart is empty!</h1>
          <p className="text-muted-foreground mb-8">Add some yummy items before checking out.</p>
          <Button onClick={() => navigate('/menu')} className="rounded-full font-fredoka">
            Browse Menu 🍽️
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const buildOrderMessage = () => {
    let message = `🧁 *New Order from BiteSide Story!*\n\n`;
    message += `👤 *Name:* ${name}\n`;
    message += `📞 *Phone:* ${phone}\n`;
    message += `📍 *Address:* ${address}\n`;
    if (notes) message += `📝 *Notes:* ${notes}\n`;
    message += `\n🛒 *Order Details:*\n`;
    message += `─────────────────\n`;

    cartItems.forEach((item) => {
      message += `${item.menu_item.emoji} ${item.menu_item.name} × ${item.quantity} — ₹${(Number(item.menu_item.price) * item.quantity).toFixed(2)}\n`;
    });

    message += `─────────────────\n`;
    message += `💰 *Total: ₹${cartTotal.toFixed(2)}*\n`;
    message += `\n💳 *Payment:* ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'To be discussed'}`;

    return encodeURIComponent(message);
  };

  const handlePlaceOrder = async () => {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const whatsappNumber = '919999999999'; // Replace with actual business number
    const message = buildOrderMessage();
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    window.open(whatsappUrl, '_blank');

    await clearCart();
    toast.success('Order sent! Check WhatsApp to confirm 🎉');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-28 pb-16 max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 font-quicksand"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to cart
        </button>

        <h1 className="font-fredoka text-4xl text-foreground mb-2">Checkout 🧾</h1>
        <p className="text-muted-foreground mb-10">Almost there! Fill in your details to place your order.</p>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Form Section */}
          <div className="md:col-span-3 space-y-6">
            {/* Delivery Details Card */}
            <div className="bg-card rounded-3xl p-6 border border-border/50 shadow-soft space-y-5">
              <h2 className="font-fredoka text-xl text-foreground flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" /> Delivery Details
              </h2>

              <div className="space-y-2">
                <Label htmlFor="name" className="font-quicksand font-semibold flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" /> Full Name *
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="font-quicksand font-semibold flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" /> Phone Number *
                </Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="font-quicksand font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" /> Delivery Address *
                </Label>
                <Textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Full delivery address with landmarks"
                  className="rounded-2xl min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="font-quicksand font-semibold">
                  Special Instructions (optional)
                </Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any allergies, extra spicy, no onion, etc."
                  className="rounded-2xl min-h-[60px]"
                />
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="bg-card rounded-3xl p-6 border border-border/50 shadow-soft space-y-5">
              <h2 className="font-fredoka text-xl text-foreground flex items-center gap-2">
                <Banknote className="h-5 w-5 text-primary" /> Payment Method
              </h2>

              <RadioGroup
                value={paymentMethod}
                onValueChange={(v) => setPaymentMethod(v as 'whatsapp' | 'cod')}
                className="space-y-3"
              >
                <label
                  htmlFor="pm-whatsapp"
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'whatsapp'
                      ? 'border-primary bg-primary/5'
                      : 'border-border/50 hover:border-primary/30'
                  }`}
                >
                  <RadioGroupItem value="whatsapp" id="pm-whatsapp" />
                  <MessageCircle className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-fredoka text-foreground">Order via WhatsApp</p>
                    <p className="text-sm text-muted-foreground">
                      Send your order directly — discuss payment with the restaurant
                    </p>
                  </div>
                </label>

                <label
                  htmlFor="pm-cod"
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-primary bg-primary/5'
                      : 'border-border/50 hover:border-primary/30'
                  }`}
                >
                  <RadioGroupItem value="cod" id="pm-cod" />
                  <Banknote className="h-6 w-6 text-accent-foreground" />
                  <div>
                    <p className="font-fredoka text-foreground">Cash on Delivery</p>
                    <p className="text-sm text-muted-foreground">
                      Pay with cash when your food arrives at your doorstep
                    </p>
                  </div>
                </label>
              </RadioGroup>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="md:col-span-2">
            <div className="bg-card rounded-3xl p-6 border border-border/50 shadow-soft sticky top-28 space-y-5">
              <h2 className="font-fredoka text-xl text-foreground">Order Summary 🧾</h2>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <span className="text-2xl">{item.menu_item.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-quicksand font-semibold text-sm text-foreground truncate">
                        {item.menu_item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">× {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-foreground">
                      ₹{(Number(item.menu_item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Delivery</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="flex justify-between font-fredoka text-xl text-foreground pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="text-primary">₹{cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={handlePlaceOrder}
                className="w-full rounded-full font-fredoka text-lg py-6 bg-green-600 hover:bg-green-700 text-white shadow-md"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Place Order via WhatsApp
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Your order will be sent to our WhatsApp for confirmation 💚
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
