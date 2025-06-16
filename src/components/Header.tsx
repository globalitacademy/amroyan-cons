
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('hy');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages = [
    { code: 'hy', name: 'Հայերեն', flag: '🇦🇲' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ];

  const navigation = [
    { name: 'Գլխավոր', href: '/' },
    { name: 'Մեր մասին', href: '/about' },
    { name: 'Ծառայություններ', href: '/services' },
    { name: 'Նորություններ', href: '/blog' },
    { name: 'Կապ', href: '/contact' },
  ];

  const handleLanguageChange = (languageCode: string) => {
    setCurrentLanguage(languageCode);
    // TODO: Implement actual language switching logic
    console.log('Language changed to:', languageCode);
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === currentLanguage) || languages[0];
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/95 backdrop-blur-md border-b border-gold-500/20' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
            <img 
              src="/lovable-uploads/5180109d-84d2-4fc9-aad0-bd08a847311d.png" 
              alt="Amroyan Consulting" 
              className="h-8 sm:h-10 lg:h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-gold-400 ${
                  location.pathname === item.href 
                    ? 'text-gold-400' 
                    : 'text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Language Switcher & CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-white hover:text-gold-400 hover:bg-gold-500/10 border border-gold-500/30 min-w-[44px] min-h-[44px]"
                >
                  <span className="text-lg">{getCurrentLanguage().flag}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-14 bg-black/95 backdrop-blur-md border-gold-500/20 z-50"
              >
                {languages.map((language) => (
                  <DropdownMenuItem
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`justify-center cursor-pointer text-white hover:bg-gold-500/20 hover:text-gold-400 min-h-[44px] ${
                      currentLanguage === language.code ? 'bg-gold-500/10 text-gold-400' : ''
                    }`}
                  >
                    <span className="text-lg">{language.flag}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              asChild 
              className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black font-semibold min-h-[44px] px-4 lg:px-6"
            >
              <Link to="/contact">Դիմել</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-gold-400 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gold-500/20 bg-black/95 backdrop-blur-md">
            <nav className="flex flex-col space-y-1 px-4 py-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-base font-medium transition-colors hover:text-gold-400 py-3 px-2 rounded-lg min-h-[44px] flex items-center ${
                    location.pathname === item.href 
                      ? 'text-gold-400 bg-gold-500/10' 
                      : 'text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Language Switcher */}
              <div className="border-t border-gold-500/20 pt-4 mt-4">
                <p className="text-sm text-gray-400 mb-3 flex items-center px-2">
                  <Globe size={16} className="mr-2" />
                  Լեզու
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        handleLanguageChange(language.code);
                        setIsMenuOpen(false);
                      }}
                      className={`flex items-center justify-center px-3 py-3 rounded-lg text-center transition-colors min-h-[44px] ${
                        currentLanguage === language.code 
                          ? 'bg-gold-500/20 text-gold-400' 
                          : 'text-white hover:bg-gold-500/10 hover:text-gold-400'
                      }`}
                    >
                      <span className="text-xl">{language.flag}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Button 
                asChild 
                className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black font-semibold mt-4 min-h-[44px] w-full"
              >
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  Դիմել
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );

  function handleLanguageChange(languageCode: string) {
    setCurrentLanguage(languageCode);
    console.log('Language changed to:', languageCode);
  }

  function getCurrentLanguage() {
    return languages.find(lang => lang.code === currentLanguage) || languages[0];
  }
};

export default Header;
