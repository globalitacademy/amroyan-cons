import { Calculator, TrendingUp, Shield, FileText, Users, BarChart3, Clock, Award, BookOpen, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
const Services = () => {
  const {
    t
  } = useLanguage();
  const serviceIcons = [Calculator, Users, Briefcase, BarChart3, Shield, BookOpen];
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
  const services = [{
    title: "Հաշվապահական հաշվառում",
    description: "Ամբողջական հաշվապահական սպասարկում՝ ՀԾ ծրագրով և հաշվետվությունների ներկայացմամբ",
    features: ["Հաշվապահության վարում ՀԾ ծրագրով", "Հարկային հաշվետվությունների ներկայացում", "Վիճակագրական հաշվետվությունների ներկայացում", "Կադրային հաշվապահության վարում"]
  }, {
    title: "Հարկային, ֆինանսական և կադրային խորհրդատվություն",
    description: "Մասնագիտական աջակցություն հարկային, ֆինանսական և կադրային հարցերում",
    features: ["Պլանավորում", "Հարկերի օպտիմալացում", "Հարկային ռիսկերի գնահատում", "Հարկային, ֆինանսական և կադրային վեճերի լուծում"]
  }, {
    title: "Բիզնես-խորհրդատվություն",
    description: "Բիզնեսի ռազմավարական ուղղությունների մշակում և գնահատում",
    features: ["Բիզնես-ռազմավարության մշակում", "Բիզնես-պլանների կազմում", "Շուկայի հետազոտություն և գնահատական"]
  }, {
    title: "Ֆինանսական վերլուծություն",
    description: "Ձեր ֆինանսների խորքային վերլուծություն և կառավարման գործիքներ",
    features: ["Ֆինանսական հաշվետվությունների կազմում և ներկայացում հիմնադիրներին", "Եկամուտ-ծախսերի հաշվարկ", "Դրամական հոսքերի հաշվետվություն, հոսքերի կառավարում", "Կատարողականի վերահսկում", "Բյուջետավորում և կանխատեսում", "Եկամտաբերության գնահատում", "Եկամտաբերության բարձրացման ուղղված միջոցների կիրառում", "Կազմակերպության ծախսերի օպտիմալացում"]
  }, {
    title: "Հարկային և տեսչական ստուգումների ընթացքում Պատվիրատուի շահերի պաշտպանում",
    description: "Ձեր շահերի ներկայացում և պաշտպանություն ստուգման գործընթացում",
    features: ["Ստուգմանը նախորդող աուդիտ-դիտարկման անցկացում", "Ռիսկերի գնահատում և նվազեցում", "Ստուգման անցկացում"]
  }, {
    title: "Խմբային և անհատական հաշվապահական դասընթացներ",
    description: "Գործնական դասընթացներ սկսնակների և մասնագետների համար",
    features: ["Հաշվապահական հաշվառման դասընթացներ", "Ֆինանսական և կառավարչական հաշվառման դասընթացներ", "Կադրային հաշվապահության դասընթացներ", "Հարկային և կադրային ոլորտներին վերաբերող սեմինար-քննարկումներ"]
  }];
  return <div className="pt-20 overflow-x-hidden max-w-full">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-black via-gray-900 to-black network-bg overflow-x-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">
              <span className="gradient-text">{t('services.title')}</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed px-4">
              {t('services.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-black to-gray-900 overflow-x-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {services.map((service: any, index: number) => {
            const IconComponent = serviceIcons[index];
            return <Card key={index} className="bg-gradient-to-br from-gray-900 to-black border-gold-500/20 hover:border-gold-400/40 transition-all duration-300 group overflow-hidden">
                  <CardHeader className="pb-3 sm:pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-gold-500 to-gold-600 rounded-lg flex items-center justify-center group-hover:animate-pulse mx-auto sm:mx-0 flex-shrink-0">
                        <IconComponent size={24} className="text-black sm:w-7 sm:h-7" />
                      </div>
                      <CardTitle className="text-xl sm:text-2xl text-white text-center sm:text-left break-words">
                        {service.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6">
                    
                    <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                      {service.features && service.features.map((feature: string, idx: number) => <li key={idx} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-gray-400 leading-relaxed break-words">{feature}</span>
                        </li>)}
                    </ul>
                  </CardContent>
                </Card>;
          })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-black overflow-x-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
              <span className="gradient-text">Ինչու՞ ընտրել մեզ</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-4">
              Մեր ծառայությունների հիմնական առավելությունները
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => <Card key={index} className="bg-gradient-to-b from-gray-900 to-black border-gold-500/20 text-center overflow-hidden">
                <CardContent className="p-6 sm:p-8">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <benefit.icon size={28} className="text-black sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4 break-words">
                    {benefit.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-900 to-black overflow-x-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-full">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
            <span className="gradient-text">Պատրա՞ստ եք սկսել</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Կապվեք մեզ հետ և ստացեք անվճար խորհրդատվություն ձեր բիզնեսի համար
          </p>
          
          <Button asChild size="lg" className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black font-semibold px-4 sm:px-8 lg:px-12 py-3 sm:py-4 text-base sm:text-lg min-h-[48px] max-w-full break-words">
            <Link to="/contact">
              Ստանալ անվճար խորհրդատվություն
            </Link>
          </Button>
        </div>
      </section>
    </div>;
};
export default Services;