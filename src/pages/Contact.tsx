
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: Phone,
      title: 'Հեռախոս',
      content: '+374 XX XXX XXX',
      description: 'Երկուշաբթի - Ուրբաթ, 09:00 - 18:00'
    },
    {
      icon: Mail,
      title: 'Էլ. հասցե',
      content: 'info@amroyan.am',
      description: 'Կպատասխանենք 24 ժամվա ընթացքում'
    },
    {
      icon: MapPin,
      title: 'Հասցե',
      content: 'Երևան, Հայաստան',
      description: 'Կենտրոնական գրասենյակ'
    },
    {
      icon: Clock,
      title: 'Աշխատանքային ժամեր',
      content: '09:00 - 18:00',
      description: 'Երկուշաբթի - Ուրբաթ'
    }
  ];

  const services = [
    'Հաշվապահություն',
    'Ֆինանսական վերլուծություն',
    'Հարկային խորհրդատվություն',
    'Աուդիտ ծառայություններ',
    'Բիզնես խորհրդատվություն',
    'Այլ'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black network-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="gradient-text">Կապ մեզ հետ</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Պատրա՞ստ եք սկսելու: Կապվեք մեզ հետ և ստացեք անվճար խորհրդատվություն
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="bg-gradient-to-b from-gray-900 to-black border-gold-500/20 hover:border-gold-400/40 transition-all duration-300 text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <info.icon size={32} className="text-black" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {info.title}
                  </h3>
                  <p className="text-gold-400 font-medium mb-2">
                    {info.content}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {info.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">
                <span className="gradient-text">Ուղարկեք մեզ հաղորդագրություն</span>
              </h2>
              <p className="text-xl text-gray-300">
                Լրացրեք ձևը և մեր մասնագետները կկապվեն ձեզ հետ
              </p>
            </div>

            <Card className="bg-gradient-to-br from-gray-900 to-black border-gold-500/20">
              <CardContent className="p-8 lg:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2">
                        Անուն Ազգանուն *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold-400 transition-colors"
                        placeholder="Ձեր անունը"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">
                        Էլ. հասցե *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold-400 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">
                        Ընկերություն
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold-400 transition-colors"
                        placeholder="Ձեր ընկերությունը"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">
                        Հեռախոս
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold-400 transition-colors"
                        placeholder="+374 XX XXX XXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Ծառայություն
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gold-400 transition-colors"
                    >
                      <option value="">Ընտրեք ծառայությունը</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Հաղորդագրություն *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold-400 transition-colors resize-none"
                      placeholder="Նկարագրեք ձեր կարիքները..."
                    />
                  </div>

                  <div className="text-center">
                    <Button 
                      type="submit" 
                      size="lg"
                      className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black font-semibold px-12 py-4 text-lg"
                    >
                      Ուղարկել հաղորդագրությունը <Send size={20} className="ml-2" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">
                <span className="gradient-text">Մեր գտնվելու վայրը</span>
              </h2>
              <p className="text-xl text-gray-300">
                Այցելեք մեր գրասենյակ կամ նշանակեք հանդիպում
              </p>
            </div>

            <Card className="bg-gradient-to-br from-gray-900 to-black border-gold-500/20 overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-gold-500/20 to-gold-600/20 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={64} className="text-gold-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Amroyan Consulting</h3>
                  <p className="text-gray-300">Երևան, Հայաստան</p>
                  <p className="text-gray-400 mt-2">Ճշգրիտ հասցեն կտրամադրվի հանդիպման ժամանակ</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            <span className="gradient-text">Պատրա՞ստ եք սկսելու</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Մի՛ սպասեք: Կապվեք մեզ հետ այսօր և ստացեք պրոֆեսիոնալ խորհրդատվություն
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black font-semibold px-8 py-4 text-lg"
            >
              <Phone size={20} className="mr-2" />
              Զանգահարել
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-black px-8 py-4 text-lg"
            >
              <Mail size={20} className="mr-2" />
              Գրել նամակ
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
