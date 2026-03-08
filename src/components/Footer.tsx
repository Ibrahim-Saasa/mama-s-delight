import logo from '@/assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Yummy Links',
      links: ['Menu', 'Cuisines', 'Specials', 'Gift Cards'],
    },
    {
      title: 'Get in Touch',
      links: ['Contact Us', 'FAQs', 'Locations', 'Catering'],
    },
    {
      title: 'Legal Stuff',
      links: ['Privacy Policy', 'Terms of Service', 'Refund Policy'],
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-background to-secondary/30 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="text-center md:text-left">
            <img 
              src={logo} 
              alt="BiteSide Story" 
              className="h-24 mx-auto md:mx-0 mb-4"
            />
            <p className="font-quicksand text-sm text-muted-foreground mb-4">
              Homemade Happiness straight from Mama's Kitchen! 💕
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 text-2xl">
              <a href="#" className="hover:scale-125 transition-transform duration-300">📸</a>
              <a href="#" className="hover:scale-125 transition-transform duration-300">🐦</a>
              <a href="#" className="hover:scale-125 transition-transform duration-300">📘</a>
              <a href="#" className="hover:scale-125 transition-transform duration-300">📌</a>
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((column) => (
            <div key={column.title} className="text-center md:text-left">
              <h4 className="font-fredoka text-lg text-foreground mb-4">
                {column.title}
              </h4>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="font-quicksand text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 text-center md:text-left">
              <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs font-quicksand font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                ☪ 100% Halal Certified
              </span>
              <p className="font-quicksand text-sm text-muted-foreground">
                © {currentYear} BiteSide Story. Made with 💕 and lots of butter.
              </p>
            </div>
            <p className="font-fredoka text-sm text-primary">
              "Life is short, eat dessert first!" 🍰
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
