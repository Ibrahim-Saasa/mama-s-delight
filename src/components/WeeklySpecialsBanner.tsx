import { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';

const weeklySpecials = [
  {
    day: 'Monday',
    dish: 'Butter Chicken Bliss',
    emoji: '🍗',
    price: '₹249',
    note: 'Creamy, dreamy & oh-so-steamy!',
  },
  {
    day: 'Tuesday',
    dish: 'Taco Tuesday Fiesta',
    emoji: '🌮',
    price: '₹199',
    note: 'Three tacos, one happy tummy!',
  },
  {
    day: 'Wednesday',
    dish: 'Wonton Wednesday',
    emoji: '🥟',
    price: '₹179',
    note: 'Won-ton of flavor in every bite!',
  },
  {
    day: 'Thursday',
    dish: 'Falafel Thurs-delight',
    emoji: '🧆',
    price: '₹159',
    note: 'Crispy on the outside, fluffy inside!',
  },
  {
    day: 'Friday',
    dish: 'Fried Rice Fry-day',
    emoji: '🍚',
    price: '₹189',
    note: 'Wok this way for happiness!',
  },
  {
    day: 'Saturday',
    dish: 'Samosa Saturday',
    emoji: '🔺',
    price: '₹129',
    note: 'The OG triangle of joy!',
  },
  {
    day: 'Sunday',
    dish: 'Sundae Fun-day',
    emoji: '🍨',
    price: '₹149',
    note: 'Life is short, eat dessert first!',
  },
];

const WeeklySpecialsBanner = () => {
  const [todayIndex, setTodayIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const day = new Date().getDay();
    setTodayIndex(day === 0 ? 6 : day - 1);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const today = weeklySpecials[todayIndex];

  return (
    <section ref={sectionRef} className="py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Chalkboard */}
        <div className="relative">
          {/* Wooden frame */}
          <div className="absolute -inset-3 rounded-xl bg-gradient-to-br from-amber-800 via-amber-900 to-amber-950 shadow-2xl" />
          
          {/* Inner wooden frame detail */}
          <div className="absolute -inset-1.5 rounded-lg bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900" />

          {/* Chalkboard surface */}
          <div
            className="relative rounded-md px-6 py-8 md:px-10 md:py-10 text-center overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 30%, #1f1f1f 60%, #262626 100%)',
              boxShadow: 'inset 0 0 60px rgba(0,0,0,0.5)',
            }}
          >
            {/* Chalk dust texture overlay */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 30%, white 0.5px, transparent 0.5px),
                  radial-gradient(circle at 60% 70%, white 0.3px, transparent 0.3px),
                  radial-gradient(circle at 80% 20%, white 0.4px, transparent 0.4px),
                  radial-gradient(circle at 40% 80%, white 0.3px, transparent 0.3px)`,
                backgroundSize: '80px 80px, 60px 60px, 100px 100px, 70px 70px',
              }}
            />

            {/* Chalk smudge effects */}
            <div
              className="absolute top-4 right-8 w-20 h-8 opacity-[0.03] rounded-full pointer-events-none"
              style={{ background: 'white', filter: 'blur(8px)' }}
            />
            <div
              className="absolute bottom-6 left-12 w-16 h-6 opacity-[0.02] rounded-full pointer-events-none"
              style={{ background: 'white', filter: 'blur(6px)' }}
            />

            {/* Header with chalk-style text */}
            <div className={`relative mb-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex items-center justify-center gap-2 mb-1">
                <Sparkles className="w-5 h-5" style={{ color: '#f5e6b8' }} />
                <span
                  className="font-fredoka text-sm md:text-base tracking-[0.3em] uppercase"
                  style={{ color: '#f5e6b8', textShadow: '0 0 8px rgba(245, 230, 184, 0.3)' }}
                >
                  Today's Special
                </span>
                <Sparkles className="w-5 h-5" style={{ color: '#f5e6b8' }} />
              </div>

              {/* Decorative chalk line */}
              <div className={`mx-auto h-px mb-5 transition-all duration-1000 delay-300 ${isVisible ? 'w-48 opacity-100' : 'w-0 opacity-0'}`} style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }} />
            </div>

            {/* Day */}
            <p
              className={`font-quicksand text-xs md:text-sm tracking-[0.2em] uppercase mb-3 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              ~ {today.day} ~
            </p>

            {/* Dish name */}
            <div className={`mb-3 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <span className="text-4xl md:text-5xl block mb-2">{today.emoji}</span>
              <h3
                className="font-fredoka text-2xl md:text-3xl"
                style={{
                  color: 'white',
                  textShadow: '0 0 10px rgba(255,255,255,0.15)',
                  letterSpacing: '0.05em',
                }}
              >
                {today.dish}
              </h3>
            </div>

            {/* Note / pun */}
            <p
              className="font-quicksand italic text-sm md:text-base mb-4"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              "{today.note}"
            </p>

            {/* Price in chalk circle */}
            <div className="inline-block relative">
              <div
                className="px-6 py-2 rounded-full"
                style={{
                  border: '2px dashed rgba(255,255,255,0.35)',
                }}
              >
                <span
                  className="font-fredoka text-xl md:text-2xl"
                  style={{
                    color: '#a8e6a1',
                    textShadow: '0 0 8px rgba(168, 230, 161, 0.3)',
                  }}
                >
                  {today.price}
                </span>
              </div>
            </div>

            {/* Bottom decorative chalk line */}
            <div className="mx-auto w-32 h-px mt-6" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeeklySpecialsBanner;
