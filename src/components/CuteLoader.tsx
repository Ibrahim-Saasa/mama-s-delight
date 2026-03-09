import { useEffect, useState } from 'react';

const foodEmojis = ['🧁', '🍰', '🍩', '🍪', '🎂', '🍮', '🧇', '🍫'];
const messages = [
  'Baking something sweet…',
  'Sprinkling some magic…',
  'Frosting the page…',
  'Almost ready to serve…',
  'Mixing the ingredients…',
];

const CuteLoader = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      {/* Floating food emojis */}
      <div className="relative w-40 h-40 mb-6">
        {foodEmojis.map((emoji, i) => (
          <span
            key={i}
            className="absolute animate-float-enhanced text-2xl"
            style={{
              left: `${50 + 45 * Math.cos((2 * Math.PI * i) / foodEmojis.length)}%`,
              top: `${50 + 45 * Math.sin((2 * Math.PI * i) / foodEmojis.length)}%`,
              transform: 'translate(-50%, -50%)',
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2.5 + (i % 3) * 0.5}s`,
            }}
          >
            {emoji}
          </span>
        ))}

        {/* Center cake with bounce */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl animate-bounce-in" style={{ animationIterationCount: 'infinite', animationDuration: '1.5s' }}>
            🎂
          </span>
        </div>
      </div>

      {/* Pulsing dots loader */}
      <div className="flex gap-2 mb-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full bg-primary"
            style={{
              animation: 'squish 0.6s ease-in-out infinite',
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>

      {/* Rotating messages */}
      <p className="font-fredoka text-lg text-muted-foreground animate-fade-in" key={messageIndex}>
        {messages[messageIndex]}
      </p>

      {/* Subtle glow */}
      <div className="absolute w-64 h-64 rounded-full bg-primary/10 blur-3xl animate-pulse-slow" />
    </div>
  );
};

export default CuteLoader;
