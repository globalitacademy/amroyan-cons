
import { Users, Target, Award, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Նպատակայնություն',
      description: 'Մենք կենտրոնացած ենք ձեր բիզնեսի հաջողության վրա և աշխատում ենք հասնել լավագույն արդյունքների:'
    },
    {
      icon: Users,
      title: 'Թիմային աշխատանք',
      description: 'Մեր փորձառու մասնագետների թիմը միավորված է ընդհանուր նպատակով՝ օգնել ձեր բիզնեսին:'
    },
    {
      icon: Award,
      title: 'Որակ',
      description: 'Մենք հավատում ենք բարձրակարգ ծառայությունների և անսարսափ որակի:'
    },
    {
      icon: Clock,
      title: 'Արդյունավետություն',
      description: 'Ժամանակը գումար է, և մենք գնահատում ենք ձեր ժամանակը ու աշխատում ենք արդյունավետ:'
    }
  ];

  const timeline = [
    { year: '2008', event: 'Ընկերության հիմնադրում' },
    { year: '2012', event: 'Առաջին 100 հաճախորդները' },
    { year: '2016', event: 'Ծառայությունների ընդլայնում' },
    { year: '2020', event: 'Թվային տրանսֆորմացիա' },
    { year: '2024', event: '500+ բավարարված հաճախորդ' }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black network-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="gradient-text">Մեր մասին</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Amroyan Consulting-ը առաջատար ընկերություն է հաշվապահական և 
              ֆինանսական ծառայությունների ոլորտում՝ 15+ տարվա փորձով:
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-8">
                  <span className="gradient-text">Մեր առաքելությունը</span>
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  Մեր նպատակն է օգնել բիզնեսներին հասնել ֆինանսական կայունության և 
                  աճի՝ տրամադրելով պրոֆեսիոնալ հաշվապահական և ֆինանսական ծառայություններ:
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Մենք հավատում ենք, որ յուրաքանչյուր բիզնես արժանի է որակյալ 
                  ֆինանսական աջակցության՝ անկախ իր չափից կամ ոլորտից:
                </p>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 to-gold-600/20 rounded-3xl blur-3xl" />
                <Card className="relative bg-gradient-to-br from-gray-900 to-black border-gold-500/20">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-6">Մեր տեսլականը</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Լինել Հայաստանի ամենավստահելի և նորարարական 
                      հաշվապահական ընկերությունը, որը հայտնի է իր 
                      պրոֆեսիոնալիզմով և հաճախորդակենտրոն մոտեցմամբ:
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              <span className="gradient-text">Մեր արժեքները</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Այն սկզբունքները, որոնք ղեկավարում են մեր ամենօրյա գործունեությունը
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-gradient-to-b from-gray-900 to-black border-gold-500/20 hover:border-gold-400/40 transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse">
                    <value.icon size={32} className="text-black" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              <span className="gradient-text">Մեր ուղին</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Տարիների ընթացքում մեր ընկերության զարգացման հիմնական փուլերը
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-gold-500 to-gold-600"></div>
              
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <Card className="bg-gradient-to-br from-gray-900 to-black border-gold-500/20">
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold gradient-text mb-2">
                          {item.year}
                        </div>
                        <div className="text-gray-300">
                          {item.event}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gold-500 rounded-full border-4 border-black"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
