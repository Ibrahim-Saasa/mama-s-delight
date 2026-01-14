import backgroundPattern from '@/assets/background-pattern.png';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CuisinesSection from '@/components/CuisinesSection';
import FeaturedSection from '@/components/FeaturedSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';

const Index = () => {
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
      {/* Subtle overlay for readability */}
      <div className="fixed inset-0 bg-background/60 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <CuisinesSection />
          <FeaturedSection />
          <NewsletterSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
