import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

const SparkleParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 4,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 2,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-sparkle-drift"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        >
          <div
            className="rounded-full bg-gradient-to-br from-accent via-primary to-secondary"
            style={{
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
              boxShadow: `0 0 ${particle.size * 2}px hsl(45 90% 70% / 0.6)`,
            }}
          />
        </div>
      ))}
      
      {/* Larger glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/10 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-accent/10 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/3 w-24 h-24 rounded-full bg-secondary/10 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
    </div>
  );
};

export default SparkleParticles;
