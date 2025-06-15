import { Users, Target, Award, Clock, Mail, Linkedin, GraduationCap } from 'lucide-react';
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

  const teamMembers = [
    {
      name: 'Արամ Ամրոյան',
      position: 'Գլխավոր գործադիր տնօրեն',
      experience: '15+ տարի',
      education: 'Տնտեսագիտության մագիստրոս',
      specialization: 'Ֆինանսական կառավարում, ռազմավարական պլանավորում',
      achievements: ['CPA վավերականություն', 'ACCA անդամություն', '500+ հաջող նախագիծ'],
      email: 'aram@amroyan.am',
      linkedin: '#'
    },
    {
      name: 'Մարիամ Գարեգինյան',
      position: 'Ավագ հաշվապահ',
      experience: '12+ տարի',
      education: 'Հաշվապահության մագիստրոս',
      specialization: 'Հարկային պլանավորում, ֆինանսական հաշվետվություն',
      achievements: ['Վավերացված հաշվապահ', 'Հարկային խորհրդատու', '300+ հաճախորդ'],
      email: 'mariam@amroyan.am',
      linkedin: '#'
    },
    {
      name: 'Դավիթ Մելքումյան',
      position: 'Ֆինանսական վերլուծաբան',
      experience: '8+ տարի',
      education: 'Ֆինանսների մագիստրոս',
      specialization: 'Ֆինանսական մոդելավորում, ինվեստիցիոն վերլուծություն',
      achievements: ['CFA վավերականություն', 'Ֆինանսական մոդելավորման մասնագետ', '200+ նախագիծ'],
      email: 'davit@amroyan.am',
      linkedin: '#'
    },
    {
      name: 'Լուսինե Ավետիսյան',
      position: 'Աուդիտի ղեկավար',
      experience: '10+ տարի',
      education: 'Աուդիտի մագիստրոս',
      specialization: 'Ներքին աուդիտ, ռիսկերի կառավարում',
      achievements: ['CIA վավերականություն', 'Ռիսկերի կառավարման մասնագետ', '150+ աուդիտ'],
      email: 'lusine@amroyan.am',
      linkedin: '#'
    },
    {
      name: 'Գագիկ Պողոսյան',
      position: 'Բիզնես խորհրդատու',
      experience: '14+ տարի',
      education: 'MBA գիտական աստիճան',
      specialization: 'Բիզնես ռազմավարություն, կազմակերպական զարգացում',
      achievements: ['MBA Harvard', 'Մանաջմենտի խորհրդատու', '100+ ընկերություն'],
      email: 'gagik@amroyan.am',
      linkedin: '#'
    },
    {
      name: 'Աննա Սարգսյան',
      position: 'Հարկային խորհրդատու',
      experience: '9+ տարի',
      education: 'Իրավագիտության մագիստրոս',
      specialization: 'Հարկային իրավունք, միջազգային հարկումաշառություն',
      achievements: ['Հարկային իրավունքի մասնագետ', 'Միջազգային հարկումամ խորհրդատու', '250+ գործ'],
      email: 'anna@amroyan.am',
      linkedin: '#'
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-black via-gray-900 to-black network-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">
              <span className="gradient-text">Մեր մասին</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed px-4">
              Amroyan Consulting-ը առաջատար ընկերություն է հաշվապահական և 
              ֆինանսական ծառայությունների ոլորտում՝ 15+ տարվա փորձով:
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">
                  <span className="gradient-text">Մեր առաքելությունը</span>
                </h2>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-4 sm:mb-6">
                  Մեր նպատակն է օգնել բիզնեսներին հասնել ֆինանսական կայունության և 
                  աճի՝ տրամադրելով պրոֆեսիոնալ հաշվապահական և ֆինանսական ծառայություններ:
                </p>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  Մենք հավատում ենք, որ յուրաքանչյուր բիզնես արժանի է որակյալ 
                  ֆինանսական աջակցության՝ անկախ իր չափից կամ ոլորտից:
                </p>
              </div>
              
              <div className="relative mt-8 lg:mt-0">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 to-gold-600/20 rounded-3xl blur-3xl" />
                <Card className="relative bg-gradient-to-br from-gray-900 to-black border-gold-500/20">
                  <CardContent className="p-6 sm:p-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Մեր տեսլականը</h3>
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
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
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
              <span className="gradient-text">Մեր արժեքները</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-4">
              Այն սկզբունքները, որոնք ղեկավարում են մեր ամենօրյա գործունեությունը
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-gradient-to-b from-gray-900 to-black border-gold-500/20 hover:border-gold-400/40 transition-all duration-300 group">
                <CardContent className="p-6 sm:p-8 text-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:animate-pulse">
                    <value.icon size={28} className="text-black sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
                    {value.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
              <span className="gradient-text">Մեր ուղին</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-4">
              Տարիների ընթացքում մեր ընկերության զարգացման հիմնական փուլերը
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Mobile Timeline */}
            <div className="block lg:hidden space-y-6">
              {timeline.map((item, index) => (
                <Card key={index} className="bg-gradient-to-br from-gray-900 to-black border-gold-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-4 h-4 bg-gold-500 rounded-full flex-shrink-0"></div>
                      <div>
                        <div className="text-xl sm:text-2xl font-bold gradient-text mb-1">
                          {item.year}
                        </div>
                        <div className="text-sm sm:text-base text-gray-300">
                          {item.event}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Desktop Timeline */}
            <div className="hidden lg:block relative">
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

      {/* Team Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
              <span className="gradient-text">Մեր թիմը</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Հանդիպեք մեր փորձառու մասնագետներին, ովքեր կօգնեն ձեր բիզնեսին հասնել նոր բարձունքների։
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-gradient-to-b from-gray-900 to-black border-gold-500/20 hover:border-gold-400/40 transition-all duration-300 group flex flex-col">
                <CardContent className="p-6 sm:p-8 flex flex-col flex-grow">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center text-lg sm:text-2xl font-bold text-black flex-shrink-0">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>

                  <div className="text-center mb-4 sm:mb-6">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">
                      {member.name}
                    </h3>
                    <p className="text-sm sm:text-base text-gold-400 font-medium mb-1 sm:mb-2">
                      {member.position}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400">
                      {member.experience}
                    </p>
                  </div>

                  <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm flex-grow">
                    <div className="flex items-start space-x-2 sm:space-x-3">
                      <GraduationCap size={14} className="text-gold-400 mt-1 flex-shrink-0 sm:w-4 sm:h-4" />
                      <span className="text-gray-300">{member.education}</span>
                    </div>

                    <div className="flex items-start space-x-2 sm:space-x-3">
                      <Award size={14} className="text-gold-400 mt-1 flex-shrink-0 sm:w-4 sm:h-4" />
                      <span className="text-gray-300">{member.specialization}</span>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2">Նվաճումներ:</h4>
                      <ul className="space-y-1">
                        {member.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gold-400 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-400 text-xs">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex justify-center space-x-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-800">
                    <a 
                      href={`mailto:${member.email}`}
                      className="text-gray-400 hover:text-gold-400 transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                    >
                      <Mail size={18} className="sm:w-5 sm:h-5" />
                    </a>
                    <a 
                      href={member.linkedin}
                      className="text-gray-400 hover:text-gold-400 transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                    >
                      <Linkedin size={18} className="sm:w-5 sm:h-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
