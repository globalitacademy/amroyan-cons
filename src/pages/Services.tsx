import { Calculator, TrendingUp, Shield, FileText, Users, BarChart3, Clock, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const Services = () => {
  const mainServices = [{
    icon: Calculator,
    title: 'Հաշվապահություն',
    description: 'Լիարժեք հաշվապահական ծառայություններ ձեր բիզնեսի համար',
    features: ['Ամենօրյա հաշվապահական գրանցումներ', 'Ֆինանսական հաշվետվությունների կազմում', 'Հարկային հաշվետվությունների նախապատրաստում', 'Գանձապահական գործառնություններ']
  }, {
    icon: TrendingUp,
    title: 'Ֆինանսական վերլուծություն',
    description: 'Մանրամասն ֆինանսական հաշվետվություններ և վերլուծություններ',
    features: ['Շահույթի և վնասի վերլուծություն', 'Կանխատեսային բյուջետավորում', 'Ֆինանսական ցուցանիշների գնահատում', 'Ինվեստիցիոն նախագծերի գնահատում']
  }, {
    icon: Shield,
    title: 'Հարկային խորհրդատվություն',
    description: 'Պրոֆեսիոնալ հարկային պլանավորում և օպտիմալացում',
    features: ['Հարկային պլանավորում', 'Հարկային օպտիմալացում', 'Հարկային ռիսկերի գնահատում', 'Հարկային վեճերի լուծում']
  }, {
    icon: FileText,
    title: 'Աուդիտ ծառայություններ',
    description: 'Անկախ աուդիտ և ֆինանսական վերլուծություն',
    features: ['Ֆինանսական աուդիտ', 'Գործառնական աուդիտ', 'Համապատասխանության աուդիտ', 'Ռիսկերի գնահատում']
  }, {
    icon: Users,
    title: 'Բիզնես խորհրդատվություն',
    description: 'Ռազմավարական խորհրդատվություն և բիզնես պլանավորում',
    features: ['Բիզնես ռազմավարության մշակում', 'Շուկայական հետազոտություն', 'Կազմակերպական կառուցվածքի օպտիմալացում', 'Գործընթացների բարելավում']
  }, {
    icon: BarChart3,
    title: 'Կառավարչական հաշվապահություն',
    description: 'Ներքին հաշվետվություններ և վերլուծություններ',
    features: ['Ծախսերի հաշվարկ', 'Բյուջետավորում և կանխատեսում', 'Կատարողականի գնահատում', 'Ռենտաբելության վերլուծություն']
  }];
  const benefits = [{
    icon: Clock,
    title: 'Ժամանակի խնայողություն',
    description: 'Մենք վերցնում ենք ֆինանսական գործերի պատասխանատվությունը'
  }, {
    icon: Award,
    title: 'Պրոֆեսիոնալիզմ',
    description: 'Մեր թիմը բաղկացած է վավերացված մասնագետներից'
  }, {
    icon: Shield,
    title: 'Անվտանգություն',
    description: 'Ձեր տվյալները լիովին պաշտպանված են'
  }];
  return <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black network-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="gradient-text">Մեր ծառայությունները</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Ամբողջական ֆինանսական լուծումներ ձեր բիզնեսի աճի և զարգացման համար
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {mainServices.map((service, index) => <Card key={index} className="bg-gradient-to-br from-gray-900 to-black border-gold-500/20 hover:border-gold-400/40 transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-600 rounded-lg flex items-center justify-center group-hover:animate-pulse">
                      <service.icon size={24} className="text-black" />
                    </div>
                    <CardTitle className="text-2xl text-white">
                      {service.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => <li key={idx} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-400">{feature}</span>
                      </li>)}
                  </ul>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              <span className="gradient-text">Ինչու՞ ընտրել մեզ</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Մեր ծառայությունների հիմնական առավելությունները
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => <Card key={index} className="bg-gradient-to-b from-gray-900 to-black border-gold-500/20 text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <benefit.icon size={32} className="text-black" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-black to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            <span className="gradient-text">Պատրա՞ստ եք սկսել</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Կապվեք մեզ հետ և ստացեք անվճար խորհրդատվություն ձեր բիզնեսի համար
          </p>
          
          <Button asChild size="lg" className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black font-semibold px-12 py-4 text-lg">
            <Link to="/contact">
              Ստանալ անվճար խորհրդատվություն
            </Link>
          </Button>
        </div>
      </section>
    </div>;
};
export default Services;