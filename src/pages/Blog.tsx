
import { Calendar, User, ArrowRight, TrendingUp, Calculator, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Blog = () => {
  const featuredPost = {
    title: 'Հարկային բարեփոխումները 2024 թվականին',
    excerpt: 'Մանրամասն ուսումնասիրություն նոր հարկային օրենսդրության և դրա ազդեցության մասին բիզնեսի վրա',
    date: '2024-03-15',
    author: 'Արամ Ամրոյան',
    category: 'Հարկային իրավունք',
    readTime: '8 րոպե',
    image: '/api/placeholder/600/400'
  };

  const blogPosts = [
    {
      title: 'Ֆինանսական պլանավորման 10 ոսկե կանոն',
      excerpt: 'Պարզ և գործնական խորհուրդներ ձեր ֆինանսների արդյունավետ կառավարման համար',
      date: '2024-03-10',
      author: 'Մարիամ Գարեգինյան',
      category: 'Ֆինանսական պլանավորում',
      readTime: '5 րոպե',
      icon: TrendingUp
    },
    {
      title: 'Թվային հաշվապահություն. ապագան այսօր',
      excerpt: 'Ինչպես ժամանակակից տեխնոլոգիաները փոխում են հաշվապահական ծառայությունները',
      date: '2024-03-08',
      author: 'Դավիթ Մելքումյան',
      category: 'Տեխնոլոգիաներ',
      readTime: '6 րոպե',
      icon: Calculator
    },
    {
      title: 'Փոքր բիզնեսների հարկային օպտիմալացում',
      excerpt: 'Օրինական եղանակներ հարկային բեռը նվազեցնելու և շահույթը մեծացնելու համար',
      date: '2024-03-05',
      author: 'Աննա Սարգսյան',
      category: 'Հարկային օպտիմալացում',
      readTime: '7 րոպե',
      icon: Shield
    },
    {
      title: 'Ֆինանսական ցուցանիշների վերլուծություն',
      excerpt: 'Ինչպես ճիշտ վերլուծել ձեր բիզնեսի ֆինանսական կատարողականը',
      date: '2024-03-01',
      author: 'Լուսինե Ավետիսյան',
      category: 'Ֆինանսական վերլուծություն',
      readTime: '9 րոպե',
      icon: TrendingUp
    },
    {
      title: 'Բիզնես պլանավորում 2024-ի համար',
      excerpt: 'Ռազմավարական մոտեցումներ հաջող բիզնես պլանի կազմման համար',
      date: '2024-02-28',
      author: 'Գագիկ Պողոսյան',
      category: 'Բիզնես ռազմավարություն',
      readTime: '10 րոպե',
      icon: Calculator
    },
    {
      title: 'Ռիսկերի կառավարում ֆինանսական ոլորտում',
      excerpt: 'Ինչպես նույնականացնել և կառավարել ֆինանսական ռիսկերը ձեր բիզնեսում',
      date: '2024-02-25',
      author: 'Լուսինե Ավետիսյան',
      category: 'Ռիսկերի կառավարում',
      readTime: '8 րոպե',
      icon: Shield
    }
  ];

  const categories = [
    'Բոլորը',
    'Հարկային իրավունք',
    'Ֆինանսական պլանավորում',
    'Տեխնոլոգիաներ',
    'Բիզնես ռազմավարություն',
    'Ռիսկերի կառավարում'
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black network-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="gradient-text">Մեր բլոգը</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Օգտակար հոդվածներ, խորհուրդներ և վերլուծություններ 
              ֆինանսական և հաշվապահական ոլորտներից
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              <span className="gradient-text">Առաջնային հոդված</span>
            </h2>
            
            <Card className="bg-gradient-to-br from-gray-900 to-black border-gold-500/20 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-video lg:aspect-auto bg-gradient-to-br from-gold-500/20 to-gold-600/20 flex items-center justify-center">
                  <div className="text-6xl text-gold-400">📊</div>
                </div>
                
                <CardContent className="p-8 lg:p-12">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-gold-500/20 text-gold-400 px-3 py-1 rounded-full text-sm">
                      {featuredPost.category}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {featuredPost.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-2">
                        <User size={16} />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} />
                        <span>{featuredPost.date}</span>
                      </div>
                    </div>
                    
                    <Button variant="ghost" className="text-gold-400 hover:text-gold-300">
                      Կարդալ ավելին <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <Button 
                key={index}
                variant={index === 0 ? "default" : "outline"}
                className={index === 0 
                  ? "bg-gradient-to-r from-gold-500 to-gold-600 text-black"
                  : "border-gold-500/30 text-gray-300 hover:bg-gold-500/10 hover:text-gold-400"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="bg-gradient-to-b from-gray-900 to-black border-gold-500/20 hover:border-gold-400/40 transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-600 rounded-lg flex items-center justify-center mb-4 group-hover:animate-pulse">
                    <post.icon size={24} className="text-black" />
                  </div>
                  
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="bg-gold-500/20 text-gold-400 px-2 py-1 rounded text-xs">
                      {post.category}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {post.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white group-hover:text-gold-400 transition-colors">
                    {post.title}
                  </h3>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-300 mb-6 leading-relaxed text-sm">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-xs text-gray-400">
                        <User size={12} />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-400">
                        <Calendar size={12} />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="text-gold-400 hover:text-gold-300 p-2">
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              <span className="gradient-text">Բաժանորդագրվեք մեր նորություններին</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Ստացեք նոր հոդվածների մասին ծանուցումներ և օգտակար խորհուրդներ
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Ձեր էլ. հասցեն"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold-400"
              />
              <Button className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black font-semibold">
                Բաժանորդագրվել
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
