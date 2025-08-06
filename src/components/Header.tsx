
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const { currentLanguage, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check auth status and admin role
    const checkAuthStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      
      if (session?.user) {
        // Check if user is admin
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('user_id', session.user.id)
          .single();
        
        setIsAdmin(profile?.role === 'admin');
      } else {
        setIsAdmin(false);
      }
    };

    checkAuthStatus();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
        
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('user_id', session.user.id)
            .single();
          
          setIsAdmin(profile?.role === 'admin');
        } else {
          setIsAdmin(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const languages = [
    { code: 'hy' as const, name: 'Հայերեն', flag: '🇦🇲' },
    { code: 'ru' as const, name: 'Русский', flag: '🇷🇺' },
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
  ];

  const navigation = [
    { name: t('header.nav.home'), href: '/' },
    { name: t('header.nav.about'), href: '/about' },
    { name: t('header.nav.services'), href: '/services' },
    { name: 'Հաշվիչներ', href: '/calculators' },
    // Archive handled as dropdown
    { name: t('header.nav.blog'), href: '/blog' },
    { name: t('header.nav.contact'), href: '/contact' },
  ];

  const handleLanguageChange = (languageCode: 'hy' | 'ru' | 'en') => {
    setLanguage(languageCode);
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
            {navigation
              .filter((item) => !['/blog', '/contact'].includes(item.href))
              .map((item) => (
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
            {/* Archive dropdown */}
            <div className="relative group">
              <Link
                to="/archive"
                className={`text-sm font-medium transition-colors hover:text-gold-400 ${
                  location.pathname.startsWith('/archive') ? 'text-gold-400' : 'text-white'
                }`}
              >
                Շտեմարան
              </Link>
              <div className="absolute left-0 mt-2 hidden group-hover:block bg-black/95 border border-gold-500/20 rounded-md shadow-lg min-w-[260px] p-2">
                <div className="flex flex-col">
                  <Link to="/archive/standards" className="px-3 py-2 text-sm text-white hover:text-gold-400 hover:bg-gold-500/10 rounded">ՀՀՄՍ / ՖՀՄՍ</Link>
                  <Link to="/archive/notifications" className="px-3 py-2 text-sm text-white hover:text-gold-400 hover:bg-gold-500/10 rounded">ՊԵԿ իրազեկումներ</Link>
                  <div className="px-3 py-2 text-xs uppercase tracking-wide text-gray-400">Պաշտոնական պարզաբանումներ</div>
                  <Link to="/archive/clarifications/tax-law" className="px-5 py-2 text-sm text-white hover:text-gold-400 hover:bg-gold-500/10 rounded">Հարկային օրենսդրություն</Link>
                  <Link to="/archive/clarifications/labor-law" className="px-5 py-2 text-sm text-white hover:text-gold-400 hover:bg-gold-500/10 rounded">Աշխատանքային օրենսդրություն</Link>
                  <Link to="/archive/discussions" className="px-3 py-2 text-sm text-white hover:text-gold-400 hover:bg-gold-500/10 rounded">Քննարկումներ</Link>
                  <div className="px-3 py-2 text-xs uppercase tracking-wide text-gray-400">Թեստեր</div>
                  <Link to="/archive/tests/accounting" className="px-5 py-2 text-sm text-white hover:text-gold-400 hover:bg-gold-500/10 rounded">Հաշվապահական և ֆինանսական ոլորտ</Link>
                  <Link to="/archive/tests/hr" className="px-5 py-2 text-sm text-white hover:text-gold-400 hover:bg-gold-500/10 rounded">HR, կադրային ոլորտ</Link>
                </div>
              </div>
            </div>
            {navigation
              .filter((item) => ['/blog', '/contact'].includes(item.href))
              .map((item) => (
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
            {isAdmin && (
              <Link
                to="/admin"
                className={`text-sm font-medium transition-colors hover:text-gold-400 flex items-center gap-1 ${
                  location.pathname === '/admin' 
                    ? 'text-gold-400' 
                    : 'text-white'
                }`}
              >
                <Shield size={16} />
                Ադմին
              </Link>
            )}
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
              <Link to="/contact">{t('header.cta')}</Link>
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
            {navigation
              .filter((item) => !['/blog', '/contact'].includes(item.href))
              .map((item) => (
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

            {/* Archive submenu (mobile) */}
            <div className="mt-2">
              <Link
                to="/archive"
                onClick={() => setIsMenuOpen(false)}
                className={`text-base font-medium transition-colors hover:text-gold-400 py-3 px-2 rounded-lg min-h-[44px] flex items-center ${
                  location.pathname.startsWith('/archive') 
                    ? 'text-gold-400 bg-gold-500/10' 
                    : 'text-white'
                }`}
              >
                Շտեմարան
              </Link>
              <div className="ml-3 mt-1 flex flex-col">
                <Link to="/archive/standards" onClick={() => setIsMenuOpen(false)} className="py-2 px-2 text-sm text-white hover:text-gold-400 rounded">• ՀՀՄՍ / ՖՀՄՍ</Link>
                <Link to="/archive/notifications" onClick={() => setIsMenuOpen(false)} className="py-2 px-2 text-sm text-white hover:text-gold-400 rounded">• ՊԵԿ իրազեկումներ</Link>
                <div className="py-2 px-2 text-xs uppercase tracking-wide text-gray-400">Պաշտոնական պարզաբանումներ</div>
                <Link to="/archive/clarifications/tax-law" onClick={() => setIsMenuOpen(false)} className="py-2 px-4 text-sm text-white hover:text-gold-400 rounded">- Հարկային օրենսդրություն</Link>
                <Link to="/archive/clarifications/labor-law" onClick={() => setIsMenuOpen(false)} className="py-2 px-4 text-sm text-white hover:text-gold-400 rounded">- Աշխատանքային օրենսդրություն</Link>
                <Link to="/archive/discussions" onClick={() => setIsMenuOpen(false)} className="py-2 px-2 text-sm text-white hover:text-gold-400 rounded">• Քննարկումներ</Link>
                <div className="py-2 px-2 text-xs uppercase tracking-wide text-gray-400">Թեստեր</div>
                <Link to="/archive/tests/accounting" onClick={() => setIsMenuOpen(false)} className="py-2 px-4 text-sm text-white hover:text-gold-400 rounded">- Հաշվապահական և ֆինանսական ոլորտ</Link>
                <Link to="/archive/tests/hr" onClick={() => setIsMenuOpen(false)} className="py-2 px-4 text-sm text-white hover:text-gold-400 rounded">- HR, կադրային ոլորտ</Link>
              </div>
            </div>
              
              {/* Blog and Contact after Archive (mobile) */}
              {navigation
                .filter((item) => ['/blog', '/contact'].includes(item.href))
                .map((item) => (
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

              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-base font-medium transition-colors hover:text-gold-400 py-3 px-2 rounded-lg min-h-[44px] flex items-center gap-2 ${
                    location.pathname === '/admin' 
                      ? 'text-gold-400 bg-gold-500/10' 
                      : 'text-white'
                  }`}
                >
                  <Shield size={16} />
                  Ադմին
                </Link>
              )}
              
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
                  {t('header.cta')}
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
