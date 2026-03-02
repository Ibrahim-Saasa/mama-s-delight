import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const CartSheet = () => {
  const { user } = useAuth();
  const { cartItems, cartCount, cartTotal, updateQuantity, removeFromCart, clearCart, loading } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold animate-in zoom-in">
              {cartCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-fredoka text-2xl flex items-center gap-2">
            Your Cart 🛒
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex flex-col h-[calc(100vh-10rem)]">
          {!user ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground text-center">
                Please sign in to view your cart
              </p>
            </div>
          ) : loading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
          ) : cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <span className="text-6xl">🛒</span>
              <p className="text-muted-foreground text-center">
                Your cart is empty!<br />
                Add some delicious items from our menu.
              </p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-card rounded-2xl p-4 shadow-sm border border-border/50"
                  >
                    <div className="flex gap-3">
                      <span className="text-3xl">{item.menu_item.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-fredoka text-foreground truncate">
                          {item.menu_item.name}
                        </h4>
                        <p className="text-sm text-primary font-semibold">
                          ₹{Number(item.menu_item.price).toFixed(2)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeFromCart(item.menu_item_id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-end gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateQuantity(item.menu_item_id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateQuantity(item.menu_item_id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Footer */}
              <div className="border-t border-border pt-4 mt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-quicksand text-muted-foreground">Total</span>
                  <span className="font-fredoka text-2xl text-primary">
                    ₹{cartTotal.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                  <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-fredoka rounded-full shadow-md">
                    Checkout <span>🎉</span>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
