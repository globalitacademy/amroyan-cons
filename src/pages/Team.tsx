
import { Mail, Linkedin, Award, GraduationCap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Team = () => {
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

  const stats = [
    { number: '6', label: 'Մասնագետներ' },
    { number: '60+', label: 'Միացյալ փորձ' },
    { number: '15+', label: 'Վավերականություններ' },
    { number: '500+', label: 'Գործընկերներ' }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black network-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="gradient-text">Մեր շտեմարանը</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-12">
              Փորձառու մասնագետների թիմ, որը նվիրված է ձեր բիզնեսի հաջողությանը
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-gradient-to-b from-gray-900 to-black border-gold-500/20 hover:border-gold-400/40 transition-all duration-300 group">
                <CardContent className="p-8">
                  {/* Avatar placeholder */}
                  <div className="w-24 h-24 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold text-black">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>

                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {member.name}
                    </h3>
                    <p className="text-gold-400 font-medium mb-2">
                      {member.position}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {member.experience}
                    </p>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div className="flex items-start space-x-3">
                      <GraduationCap size={16} className="text-gold-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{member.education}</span>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Award size={16} className="text-gold-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{member.specialization}</span>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2">Նվաճումներ:</h4>
                      <ul className="space-y-1">
                        {member.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-gold-400 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-400 text-xs">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex justify-center space-x-4 mt-6 pt-6 border-t border-gray-800">
                    <a 
                      href={`mailto:${member.email}`}
                      className="text-gray-400 hover:text-gold-400 transition-colors"
                    >
                      <Mail size={20} />
                    </a>
                    <a 
                      href={member.linkedin}
                      className="text-gray-400 hover:text-gold-400 transition-colors"
                    >
                      <Linkedin size={20} />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Team */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">
              <span className="gradient-text">Ինչու՞ մեր թիմը</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award size={32} className="text-black" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Փորձառություն</h3>
                <p className="text-gray-400">
                  Մեր թիմի յուրաքանչյուր անդամ ունի 8+ տարվա փորձ իր ոլորտում
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap size={32} className="text-black" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Կրթություն</h3>
                <p className="text-gray-400">
                  Բարձրակարգ կրթություն և միջազգային վավերականություններ
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail size={32} className="text-black" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Հասանելիություն</h3>
                <p className="text-gray-400">
                  24/7 սպասարկում և անմիջական կապ մեր մասնագետների հետ
                </p>
              </div>
            </div>

            <p className="text-xl text-gray-300 leading-relaxed">
              Մեր թիմը միավորված է ընդհանուր տեսլականով՝ օգնել ձեր բիզնեսին 
              հասնել ֆինանսական հաջողության և կայուն աճի:
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
