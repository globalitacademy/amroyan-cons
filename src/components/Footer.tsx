
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter } from 'lucide-react';
import NewsletterSubscription from './NewsletterSubscription';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Գլխավոր', href: '/' },
    { name: 'Մեր մասին', href: '/about' },
    { name: 'Ծառայություններ', href: '/services' },
    { name: 'Բլոգ', href: '/blog' },
  ];

  const services = [
    'Հաշվապահություն',
    'Ֆինանսական խորհրդատվություն',
    'Հարկային պլանավորում',
    'Աուդիտ ծառայություններ',
  ];

  return (
    <footer className="bg-gradient-to-b from-black to-gray-900 border-t border-gold-500/20">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter Section */}
        <div className="mb-12 text-center">
          <h3 className="text-2xl font-bold mb-4">
            <span className="gradient-text">Բաժանորդագրվեք մեր նորություններին</span>
          </h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Ստացեք վերջին նորությունները և օգտակար խորհուրդները ֆինանսական ոլորտից
          </p>
          <NewsletterSubscription className="max-w-md mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/5180109d-84d2-4fc9-aad0-bd08a847311d.png" 
              alt="Amroyan Consulting" 
              className="h-12 w-auto"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              Պրոֆեսիոնալ հաշվապահական և ֆինանսական ծառայություններ 
              ձեր բիզնեսի աճի և հաջողության համար:
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Արագ հղումներ</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-gray-400 hover:text-gold-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Ծառայություններ</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-gray-400 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Կապ</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-gold-400" />
                <span className="text-gray-400 text-sm">+374 XX XXX XXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-gold-400" />
                <span className="text-gray-400 text-sm">info@amroyan.am</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-gold-400" />
                <span className="text-gray-400 text-sm">Երևան, Հայաստան</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Amroyan Consulting. Բոլոր իրավունքները պաշտպանված են:
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
