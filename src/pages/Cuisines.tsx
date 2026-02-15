import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Sparkles, Flame, Leaf, ChefHat, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cuisineDetails } from '@/data/cuisineDetails';
import backgroundPattern from '@/assets/background-pattern.png';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ─── Fun Facts Carousel ────────────────────────────────────────
const allFunFacts = cuisineDetails.flatMap((c) =>
  c.funFacts.map((f) => ({ ...f, cuisineName: c.name, cuisineSlug: c.slug }))
);

const FunFactsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allFunFacts.length);
    }, 4000);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const go = (dir: 1 | -1) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentIndex((prev) => (prev + dir + allFunFacts.length) % allFunFacts.length);
    startTimer();
  };

  const fact = allFunFacts[currentIndex];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 text-center mb-10">
        <h2 className="font-fredoka text-3xl md:text-4xl mb-2">
          <span className="text-gradient-pink">Did You Know?</span> <span>🤯</span>
        </h2>
        <p className="font-quicksand text-muted-foreground">Fun food facts that'll blow your mind!</p>
      </div>

      <div className="container mx-auto px-4 max-w-2xl">
        <div className="relative bg-card/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-border/50 shadow-card min-h-[200px] flex flex-col items-center justify-center">
          <button
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-primary" />
          </button>
          <button
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-primary" />
          </button>

          <span className="text-xs font-fredoka text-primary/60 uppercase tracking-widest mb-3">{fact.cuisineName} Cuisine</span>
          <h3 className="font-fredoka text-xl md:text-2xl text-foreground mb-3">{fact.title}</h3>
          <p className="font-quicksand text-muted-foreground leading-relaxed max-w-lg">{fact.fact}</p>

          {/* Dots */}
          <div className="flex gap-1.5 mt-6 flex-wrap justify-center">
            {allFunFacts.map((_, i) => (
              <button
                key={i}
                onClick={() => { if (timerRef.current) clearInterval(timerRef.current); setCurrentIndex(i); startTimer(); }}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-300',
                  i === currentIndex ? 'bg-primary w-6' : 'bg-primary/25 hover:bg-primary/40'
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Cuisine Comparison ─────────────────────────────────────────
const comparisonData = [
  { label: 'Spice Level', key: 'spice' as const },
  { label: 'Signature Flavor', key: 'flavor' as const },
  { label: 'Best For', key: 'bestFor' as const },
  { label: 'Veggie Friendly', key: 'veggie' as const },
];

const cuisineCompare: Record<string, { spice: string; flavor: string; bestFor: string; veggie: string }> = {
  chinese: { spice: '🌶️🌶️', flavor: 'Umami & Savory', bestFor: 'Stir-fry lovers', veggie: '⭐⭐⭐' },
  mexican: { spice: '🌶️🌶️🌶️', flavor: 'Smoky & Bold', bestFor: 'Street food fans', veggie: '⭐⭐' },
  indian: { spice: '🌶️🌶️🌶️🌶️', flavor: 'Aromatic & Complex', bestFor: 'Spice adventurers', veggie: '⭐⭐⭐⭐⭐' },
  'middle-eastern': { spice: '🌶️', flavor: 'Herbaceous & Fresh', bestFor: 'Mezze sharing', veggie: '⭐⭐⭐⭐' },
};

const ComparisonSection = () => (
  <section className="py-16">
    <div className="container mx-auto px-4 text-center mb-10">
        <h2 className="font-fredoka text-3xl md:text-4xl mb-2">
          <span className="text-gradient-pink">Flavor Face-Off!</span> <span>⚔️</span>
        </h2>
      <p className="font-quicksand text-muted-foreground">How do our cuisines stack up against each other?</p>
    </div>

    <div className="container mx-auto px-4 max-w-4xl overflow-x-auto">
      <div className="min-w-[600px]">
        {/* Header row */}
        <div className="grid grid-cols-5 gap-2 mb-3">
          <div />
          {cuisineDetails.map((c) => (
            <div key={c.slug} className="text-center">
              <img src={c.image} alt={c.name} className="w-14 h-14 mx-auto object-contain mb-1" />
              <span className="font-fredoka text-sm text-primary">{c.name}</span>
            </div>
          ))}
        </div>

        {/* Data rows */}
        {comparisonData.map((row, idx) => (
          <div
            key={row.key}
            className={cn(
              'grid grid-cols-5 gap-2 items-center py-3 px-3 rounded-2xl',
              idx % 2 === 0 ? 'bg-card/60' : ''
            )}
          >
            <span className="font-fredoka text-sm text-foreground/80">{row.label}</span>
            {cuisineDetails.map((c) => (
              <span key={c.slug} className="font-quicksand text-sm text-center text-muted-foreground">
                {cuisineCompare[c.slug]?.[row.key] ?? '—'}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── What Should You Eat? Quiz ──────────────────────────────────
interface QuizQuestion {
  question: string;
  emoji: string;
  options: { label: string; scores: Record<string, number> }[];
}

const quizQuestions: QuizQuestion[] = [
  {
    question: 'How do you feel about spice?',
    emoji: '🌶️',
    options: [
      { label: 'Keep it mild, please!', scores: { chinese: 2, 'middle-eastern': 3 } },
      { label: "A little kick won't hurt", scores: { mexican: 2, chinese: 2 } },
      { label: 'Bring on the fire!', scores: { indian: 3, mexican: 2 } },
      { label: "I want to feel alive", scores: { indian: 4 } },
    ],
  },
  {
    question: "What's your ideal meal vibe?",
    emoji: '✨',
    options: [
      { label: 'Quick street food on the go', scores: { mexican: 3, indian: 1 } },
      { label: 'A cozy family-style feast', scores: { indian: 2, chinese: 2 } },
      { label: 'A beautiful mezze spread', scores: { 'middle-eastern': 4 } },
      { label: 'Wok-tossed and sizzling', scores: { chinese: 4 } },
    ],
  },
  {
    question: 'Pick a flavor profile:',
    emoji: '🎨',
    options: [
      { label: 'Smoky & bold', scores: { mexican: 3 } },
      { label: 'Aromatic & layered', scores: { indian: 3 } },
      { label: 'Fresh & herbaceous', scores: { 'middle-eastern': 3 } },
      { label: 'Savory & umami-rich', scores: { chinese: 3 } },
    ],
  },
  {
    question: 'Choose your carb of choice:',
    emoji: '🍞',
    options: [
      { label: 'Warm naan bread', scores: { indian: 3, 'middle-eastern': 1 } },
      { label: 'Fluffy rice', scores: { chinese: 2, indian: 1 } },
      { label: 'Corn tortillas', scores: { mexican: 4 } },
      { label: 'Crispy pita', scores: { 'middle-eastern': 3 } },
    ],
  },
];

const QuizSection = () => {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (optionScores: Record<string, number>) => {
    const newScores = { ...scores };
    Object.entries(optionScores).forEach(([k, v]) => {
      newScores[k] = (newScores[k] || 0) + v;
    });
    setScores(newScores);

    if (step + 1 >= quizQuestions.length) {
      const winner = Object.entries(newScores).sort((a, b) => b[1] - a[1])[0][0];
      setResult(winner);
    } else {
      setStep(step + 1);
    }
  };

  const reset = () => {
    setStep(0);
    setScores({});
    setResult(null);
  };

  const resultCuisine = result ? cuisineDetails.find((c) => c.slug === result) : null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 text-center mb-10">
        <h2 className="font-fredoka text-3xl md:text-4xl mb-2">
          <span className="text-gradient-pink">What Should You Eat?</span> <span>🧠</span>
        </h2>
        <p className="font-quicksand text-muted-foreground">Answer 4 quick questions to find your perfect cuisine match!</p>
      </div>

      <div className="container mx-auto px-4 max-w-xl">
        <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 border border-border/50 shadow-card">
          {result && resultCuisine ? (
            <div className="text-center animate-scale-in" style={{ opacity: 1 }}>
              <span className="text-5xl block mb-4">🎉</span>
              <h3 className="font-fredoka text-2xl text-foreground mb-2">You should try…</h3>
              <img src={resultCuisine.image} alt={resultCuisine.name} className="w-28 h-28 mx-auto object-contain my-4" />
              <p className="font-fredoka text-3xl text-gradient-pink mb-2">{resultCuisine.name} Cuisine!</p>
              <p className="font-quicksand text-muted-foreground italic mb-6">{resultCuisine.tagline}</p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Link
                  to={`/cuisine/${resultCuisine.slug}`}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-fredoka px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
                >
                  Explore {resultCuisine.name} <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={reset}
                  className="font-fredoka px-6 py-3 rounded-full border border-border text-muted-foreground hover:bg-muted transition-colors"
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Progress */}
              <div className="flex gap-2 mb-6">
                {quizQuestions.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      'h-1.5 flex-1 rounded-full transition-all duration-500',
                      i <= step ? 'bg-primary' : 'bg-primary/15'
                    )}
                  />
                ))}
              </div>

              <div className="text-center mb-6">
                <span className="text-4xl block mb-3">{quizQuestions[step].emoji}</span>
                <h3 className="font-fredoka text-xl md:text-2xl text-foreground">
                  {quizQuestions[step].question}
                </h3>
              </div>

              <div className="grid gap-3">
                {quizQuestions[step].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt.scores)}
                    className="w-full text-left font-quicksand font-medium px-5 py-4 rounded-2xl border border-border/50 bg-background/50 hover:border-primary hover:bg-primary/5 hover:shadow-md transition-all duration-300 active:scale-[0.98]"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

// ─── Main Page ──────────────────────────────────────────────────
const Cuisines = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${backgroundPattern})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
      }}
    >
      <div className="fixed inset-0 bg-background/60 pointer-events-none" />

      <div className="relative z-10">
        <Header />

        <main className="pt-24 pb-16">
          {/* Hero */}
          <section className="container mx-auto px-4 text-center mb-12 animate-fade-in" style={{ opacity: 1 }}>
            <span className="text-4xl block mb-3">🌍</span>
            <h1 className="font-fredoka text-4xl md:text-5xl lg:text-6xl mb-3">
              <span className="text-gradient-pink">World Flavors</span>
            </h1>
            <p className="font-quicksand text-muted-foreground text-lg max-w-xl mx-auto">
              Four incredible cuisines, each with a story to tell. Pick your adventure!
            </p>
          </section>

          {/* Showcase Cards */}
          <section className="container mx-auto px-4 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {cuisineDetails.map((cuisine, index) => (
                <Link
                  key={cuisine.slug}
                  to={`/cuisine/${cuisine.slug}`}
                  className="group relative block"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-5 border border-border/50 transition-all duration-500 group-hover:shadow-card group-hover:-translate-y-2 group-hover:border-primary/30 overflow-hidden">
                    {/* Tagline tooltip */}
                    <div
                      className={cn(
                        'absolute -top-10 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full font-fredoka text-sm whitespace-nowrap z-20',
                        'bg-accent text-accent-foreground shadow-glow-yellow transition-all duration-300',
                        hoveredIndex === index ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-90'
                      )}
                    >
                      {cuisine.tagline}
                    </div>

                    <img
                      src={cuisine.image}
                      alt={`${cuisine.name} cuisine`}
                      className="w-32 h-32 mx-auto object-contain transition-transform duration-500 group-hover:scale-110"
                    />

                    <h3 className="font-fredoka text-xl text-center text-foreground mt-3">{cuisine.name}</h3>
                    <p className="font-quicksand text-xs text-muted-foreground text-center mt-1 leading-snug line-clamp-2">
                      {cuisine.quickFact}
                    </p>

                    <div className="mt-4 flex items-center justify-center gap-1 text-primary font-fredoka text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Fun Facts Carousel */}
          <FunFactsCarousel />

          {/* Comparison */}
          <ComparisonSection />

          {/* Quiz */}
          <QuizSection />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Cuisines;
